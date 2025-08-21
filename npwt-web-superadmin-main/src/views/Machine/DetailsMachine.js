import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'reactstrap';
import '../MedicalRecordComponent/Css/Patient.css'

const DetailsMachine = () => {
  const { id } = useParams();
  const [Machine, setMachine] = useState(null);

  useEffect(() => {
    async function fetchMachine() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/machine/getMachineDetails/${id}`);
        setMachine(response.data);
      } catch (error) {
        console.error('Error fetching Machine data:', error);
      }
    }
    fetchMachine();
  }, [id]);
  if (!Machine) {
    return <div className="centered-container">
        <div className="circle-loader"></div>
      </div>;
  }
  const arrayMachine = {
    reference: 'Reference',
    etat: 'Etat',
    patientAffecte: 'Patient affecté',
    dateDebut: 'Date début',
    dateFin: 'Date fin',
    dateFinEtendu: 'date fin étendu',
  };
  const arrayPatient = {
    firstName: 'Nom',
    lastName: 'Prénom',
    email: 'E-mail',
  };
  const excludedKeys = ['_id', '__v', 'archived', 'accesUser','gender', 'governorate', 'phoneNumber', 'firstExaminationDate','dateOfBirth','medicalConditions',"createdBy"];

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <div className="card mt-5 cardDetails">
            <div className="card-body text-center"> 
              <i className="fa-solid fa-kit-medical" style={{ fontSize:"50px" }} ></i>
              <h1 className="card-title" >              
                {`${Machine.reference}`}
              </h1>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              {Object.keys(Machine).map((key, index) => {
                  if (!excludedKeys.includes(key)) {
                    const translatedKey = arrayMachine[key] || key;
                    if(key==="patientAffecte"){
                      return (
                        <div className="row mb-3" key={index}>
                            <div className="col-sm-4 text-muted">{translatedKey}</div>
                            {key !== 'dateDebut' && key !== 'dateFin' && key !== 'dateFinEtendu' ?
                              <div className="col-sm-8">{Machine[key]}</div>
                              :
                              <div className="col-sm-8">{Machine[key].slice(0, 10)}</div>
                            }
                        </div>
                      );
                    }else{
                      return (
                        <div className="row mb-3" key={index}>
                            <div className="col-sm-4 text-muted">{translatedKey}</div>
                            {key !== 'dateDebut' && key !== 'dateFin' && key !== 'dateFinEtendu' ?
                              <div className="col-sm-8">{Machine[key]}</div>
                              :
                              <div className="col-sm-8">{Machine[key].slice(0, 10)}</div>
                            }
                        </div>
                      );
                    }
                  }
                  return null;
              })}
                <Link to="/admin/machines/table">
                  <Button color="outline-primary" className="btn-lg float-right"> Retour </Button>
                </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default DetailsMachine;
