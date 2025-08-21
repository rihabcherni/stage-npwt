function AboutComponent() {


    return (

        <>
            <section>
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                <div className="d-flex flex-column">
                                    <img className="img-fluid rounded w-75 align-self-end" src="../assetsTemplates/template1/img/about-1.jpg" alt="" />
                                    <img className="img-fluid rounded w-50 bg-white pt-3 pe-3" src="../assetsTemplates/template1/img/about-2.jpg" alt="" style={{ marginTop: '-25%' }} />
                                </div>
                            </div>
                            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                                <h4 className="d-inline-block border rounded-pill py-1 px-4" style={{ color:"blue", padding:"0 100px" }}>À propos </h4>
                                <h1 className="mb-4">Pourquoi nous faire confiance ? Apprenez à nous connaître!</h1>
                                <p>Chez Indepto, nous sommes déterminés à transformer la manière dont les soins de plaies sont gérés, en mettant la technologie au service de la santé. Notre engagement envers l'excellence se reflète dans tout ce que nous faisons.</p>
                                <p><i className="far fa-check-circle text-primary me-3" />Soins de santé de qualité</p>
                                <p><i className="far fa-check-circle text-primary me-3" />Uniquement des médecins qualifiés</p>
                                <p><i className="far fa-check-circle text-primary me-3" />Professionnels de la recherche médicale</p>
                                <a className="btn btn-primary rounded-pill py-3 px-5 mt-3" href="">Plus...</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>

    );
}

export default AboutComponent;