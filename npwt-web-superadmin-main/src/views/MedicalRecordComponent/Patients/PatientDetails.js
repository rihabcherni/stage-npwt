import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { TbArchiveOff, TbArchive } from 'react-icons/tb';
import { Button } from 'reactstrap';
import '../Css/Patient.css'
import UserChip from 'components/Tables/UserChip';

const UserData = ({ dataUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/patient/getUserById/${dataUser}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dataUser]);

  console.log(user);

  if (user !== null) {
    return <UserChip dataUser={user} />;
  } else {
    return "";
  }
};

const NumberConsultation = ({ dataUser }) => {
  const [numberConsultation, setNumberConsultation] = useState(null);

  useEffect(() => {
    async function fetchMedicalRecord() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/medical/getNumberConsultationByIdPatient/${dataUser}`
        );
        setNumberConsultation(response.data.number_consultation);
      } catch (error) {
        console.error('Error fetching MedicalRecord data:', error);
      }
    }

    fetchMedicalRecord();
  }, [dataUser]);

  if (numberConsultation !== null) {
    return numberConsultation;
  } else {
    return 0;
  }
};
const PatientDetails = () => {
  const { id } = useParams();
  const [medicalRecord, setMedicalRecord] = useState(null);

  useEffect(() => {
    async function fetchMedicalRecord() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/medical-patient/getMedicalRecordPatientDetails/${id}`);
        setMedicalRecord(response.data);
      } catch (error) {
        console.error('Error fetching MedicalRecord data:', error);
      }
    }

    fetchMedicalRecord();
  }, [id]);
  if (!medicalRecord) {
    return <div className="centered-container">
        <div className="circle-loader"></div>
      </div>;
  }
  const array = {
    email: 'Email',
    gender: 'Genre',
    firstName: 'Nom',
    lastName: 'Prénom',
    governorate: 'gouvernorat',
    phoneNumber: 'Numéro de téléphone',
    firstExaminationDate: 'Date de première consultation',
    dateOfBirth: 'Date de naissance',
    medicalConditions: 'Les conditions médicales',
    createdBy: 'Créer par',
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <div className="card mt-5 cardDetails">
            <div className="card-body text-center"> 
              <div className="cardIcons">
                {medicalRecord.archived===true ? 
                  <TbArchive className="iconCard" style={{ fontSize:"50px" }} />: 
                  <TbArchiveOff className="iconCard" style={{ fontSize:"50px" }}/>
                }
              </div>
              <i className="fa-solid fa-hospital-user" style={{ fontSize:"70px" }} ></i>
              <h1 className="card-title" >              
                {`${medicalRecord.firstName} ${medicalRecord.lastName}`}
              </h1>
              <p className="card-text " style={{ color: 'white' }}>{medicalRecord.gender}</p>  
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
                {Object.keys(medicalRecord).map((key, index) => {
                    if (key in medicalRecord && key !== '_id' && key !== 'firstName'&& key !== 'lastName'&& key !== 'gender'&& key !== '__v' && key !== 'archived'&& key !== 'accesUser') {
                        const translatedKey = array[key] || key;
                        return (
                        <div className="row mb-3" key={index}>
                            <div className="col-sm-4 text-muted">{translatedKey}</div>
                            {key === 'dateOfBirth' || key === 'firstExaminationDate' ? 
                              <div className="col-sm-8">{medicalRecord[key].slice(0, 10)}</div>
                              : 
                              key === 'createdBy' ? 
                                <div className="col-sm-8"> <UserData dataUser={medicalRecord[key]}/></div>
                              :
                              <div className="col-sm-8">{medicalRecord[key]}</div>
                            }
                        </div>
                        );
                    }
                    return null;
                })}
            

              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Nombre de consultation totale:</div>
                <div className="col-sm-8"> <NumberConsultation dataUser={`${medicalRecord.id}`}/>
                </div>
              </div>
                <Link to="/admin/medical-record/patients-table">
                  <Button color="outline-primary" className="btn-lg float-right"> Retour </Button>
                </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default PatientDetails;
