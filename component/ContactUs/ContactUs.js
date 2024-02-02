import { useEffect } from "react";

import './ContactUs.css'
import WOW from 'wowjs';
import '../css/animate.css';
import { useSelector } from "react-redux";
import { useBetween } from "use-between";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LogIn from '../logInPage/login';
import '../css/bootstrap.css'

const ContactUs = () => {

    useEffect(() => {
        new WOW.WOW({
            live: false
        }).init();
    }, [])
    const state1 = useSelector((state) => state.data1);

    const { lang, setLang, arraylang  } = useBetween(state1.useShareState);
    const state = useSelector((state) => state.data);

    const {  alertLogIn, setAlertLogIn, goToLogIn, setGoToLogIn, setContinueWithLogIn ,setdropDownShowAll} = useBetween(state.useShareState);

    return (
        <div className="block" onClick={()=> setdropDownShowAll(true)}>
           
            <div className="ContactUs" >
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous" />
                <section className="contact-page-sec">
                    <div className="section-head col-sm-12">
                        <h4><span>{arraylang[5].Contact}</span>{arraylang[5].us} </h4>
                        <p className="contactCont">{arraylang[5].Contact_US_Cont}</p>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="contact-info wow bounceInRight">
                                    <div className="contact-info-item">
                                        <div className="contact-info-icon">
                                            <i className="fas fa-map-marked"></i>
                                        </div>
                                        <div className="contact-info-text">
                                            <h2>{arraylang[5].Address}</h2>
                                            <span ><a href="https://maps.app.goo.gl/6uSuhTE2V5SRcT278" target="_blank" style={{textDecoration:'underline', color:'#fff'}} >{arraylang[5].AddressCont} </a></span>
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="contact-info wow bounceInRight">
                                    <div className="contact-info-item">
                                        <div className="contact-info-icon">
                                            <i className="fas fa-clock"></i>
                                        </div>
                                        <div className="contact-info-text">
                                            <h2>{arraylang[5].Worktime}</h2>
                                            <span>24 {arraylang[5].hours}</span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="contact-info wow bounceInRight">
                                    <div className="contact-info-item">
                                        <div className="contact-info-icon">
                                            <i className="fa fa-share-square" aria-hidden="true"></i>
                                        </div>
                                        <div className="contact-info-text">
                                            <h2>{arraylang[5].Social_Media}</h2>
                                            <div className="social-icon" style={{display:'flex'}}>
                                             
                                                    <span title="facebook">
                                                        <a href="#">
                                                            <i className='fab fa-facebook' ></i>
                                                        </a>
                                                    </span>
                                                    <span title="tiktok">
                                                        <a href="https://www.tiktok.com/@chocorosa3?_t=8iujICnNk6E&_r=1" >
                                                        <i class="fab fa-tiktok"></i>

                                                        </a>

                                                    </span>
                                                
                                               
                                                    <span title="instagram">
                                                        <a href="#">
                                                            <i className='fab fa-instagram' ></i>
                                                        </a>
                                                    </span>
                                                    <span title="snapchat">
                                                        <a href="https://www.snapchat.com/add/choco_rosa01?share_id=vbbjmrUP1sc&locale=en-US">
                                                        <i class="fab fa-snapchat"></i>
                                                        </a>
                                                    </span>
                                             

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="contact-info wow bounceInLeft">
                                    <div className="contact-info-item">
                                        <div className="contact-info-icon">
                                            <i className="fa fa-fax" aria-hidden="true"></i>
                                        </div>
                                        <div className="contact-info-text">
                                            <h2>{arraylang[5].Fax}</h2>
                                            <span>0097144523635</span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="contact-info wow bounceInLeft">
                                    <div className="contact-info-item">
                                        <div className="contact-info-icon">
                                            <i className="fa fa-phone" aria-hidden="true"></i>
                                        </div>
                                        <div className="contact-info-text">
                                            <h2>{arraylang[5].Mobile}</h2>
                                            <a href="tel:+971568594461" style={{ color: "#999999" }}> <span> 00971568594461 </span></a>
                                            <br></br>
                                            <a href="tel:+971528467405" style={{ color: "#999999" }}><span> 00971528467405</span></a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="contact-info wow bounceInLeft">
                                    <div className="contact-info-item">
                                        <div className="contact-info-icon">
                                            <i className="fas fa-envelope"></i>
                                        </div>
                                        <div className="contact-info-text">
                                            <h2>{arraylang[5].E_Mail}</h2>
                                            <a href="https://realluxs0@gmail.com/" style={{ color: "#999999" }}> <span>realluxs0@gmail.com </span></a>
                                            {/* <span>yourmail@gmail.com</span> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                      
                               

                    </div>
                  
                </section>
                <Modal show={alertLogIn} onHide={() => setAlertLogIn(false)} size='lg' className='Model'>

                <Modal.Body>
                    <LogIn props={'-1'} />
                </Modal.Body>
                <Modal.Footer dir="auto">
                    {!goToLogIn && <Button variant="primary" className="btn btn-calendar-modal-save"
                        onClick={() => setGoToLogIn(true)}
                    >
                        LogIn
                    </Button>
                    }
                    <Button variant="secondary" className="btn btn-calendar-modal-cancel"
                        onClick={() => { setAlertLogIn(false); setGoToLogIn(false); setContinueWithLogIn(true) }}  >
                        Continue Without LogIn
                    </Button>

                </Modal.Footer>
            </Modal>


            </div>
        

        </div>



    );
}

export default ContactUs;