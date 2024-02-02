import { useEffect } from "react";
import Header from "../Header/Header";
import './AboutUs.css'
import WOW from 'wowjs';
import '../css/animate.css'
import Footer from "../Footer/Footer";


const AboutUs = () => {

    useEffect(() => {
        new WOW.WOW({
            live: false
        }).init();
    }, [])


    return (
        <>
            <Header />
            <div className="AboutUs" >
                <div className="wrapper2">
                    <div className="about-section">
                        <div className="inner-container">
                            {/* <div className="line"></div> */}
                            <h1><span className="About wow bounceInRight" data-wow-duration='1s'>About Us</span></h1>
                            <p className="text wow bounceInRight" data-wow-duration='1s'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus velit ducimus, enim inventore earum, eligendi nostrum pariatur necessitatibus eius dicta a voluptates sit deleniti autem error eos totam nisi neque voluptates sit deleniti autem error eos totam nisi neque.
                            </p>

                            <div className="skills">
                                <span>anything</span>
                                <span>altareeqalmomiaz</span>
                                <span>الطريق المميز</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />

        </>



    );
}

export default AboutUs;