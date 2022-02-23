import React,{useEffect,useRef} from 'react';
import './HomePage.css';
import CategorySection from '../../components/categorySection/CategorySection';
import { Link } from 'react-router-dom';
import { useStateIfMounted } from 'use-state-if-mounted';
import TestimonialSection from '../../components/TestimonialSection/TestimonialSection';
import GetInTouch from '../../components/GetInTouch/GetInTouch';
// import $ from 'jquery';

function HomePage(props) {
    // const videoImage = require('../../images/video.png');
    const thirdSection = useRef(null);

    const firstImage = require('../../images/1.webp');
    const secondImage = require('../../images/2.webp');
    const abstractImageThree = require('../../images/abstract_image3.png');
    const star = require('../../images/star.png');

    const [categories,setcategory] = useStateIfMounted([]);
    const [catloading,setLoading] = useStateIfMounted(false);

    const [testimonials,settestimonial] = useStateIfMounted([]);
    const [testimonialloading,setTestimonialLoading] = useStateIfMounted(false);
    // const [count, setCount] = useStateIfMounted(0);

    // var categories = [];

    useEffect(() => {
    //     var savedtoken = document.cookie.split('=')[1];
    //   console.log(savedtoken);
        getImpCategoriesTestimonials().then(response => {
            // console.log(response);
            setcategory(response.categories);
            setLoading(true);
            settestimonial(response.testimonials);
            setTestimonialLoading(true);
            if(props.user.name){
                // console.log(props.user.name);
                if(props.user.status === 1){
                    // console.log(document.getElementsByClassName('popup_message')[0]);
                    document.getElementsByClassName('popup_message')[0].innerHTML = `Hello, ${props.user.name} nice to have you back`;
                    document.getElementsByClassName('popup_message')[0].classList.add('activepopup_message');
                } else if(props.user.status === 4){
                    // console.log(document.getElementsByClassName('popup_message')[0]);
                    document.getElementsByClassName('popup_message')[0].innerHTML = `Hello, ${props.user.name} your profile has been blocked by admin`;
                    document.getElementsByClassName('popup_message')[0].classList.add('activepopup_message');
                }
                setTimeout(()=>{
                    if(document.getElementsByClassName('popup_message')[0] !== undefined) {
                        if(document.getElementsByClassName('popup_message')[0].classList.contains('activepopup_message')){
                            document.getElementsByClassName('popup_message')[0].classList.remove('activepopup_message')
                        }
                    }
                },1800)
            }
        });
    },[]);

    function getImpCategoriesTestimonials() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(`${props.backendurl}/getImpCategoriesTestimonials`, requestOptions).then(response => response.json()).then((result) => {
            // // console.log(result);
            // setcategory(result.data);
            return result;
        }).catch((err) => {
            console.log(err);
        });
    }

    function getCategory(value){
        props.changeSelectedTab(value);
    }

 return <div className='home'>
          <div className='popup_message'>
            <p></p>
          </div>
        <div className='firstSection container'>
            <div className='row'>
                <div className='col-lg-8 col-md-6 col-sm-12 col-12 order-2 order-sm-1 firstcolumn'>
                    <div>
                        <div className='first_animation_box'>
                            <h1>Are you from tribe?</h1>
                        </div>
                        <br/>
                        <div className='second_animation_box'>
                            <h1>Join the tribe community and create you portfolio</h1>
                            <div className='box'></div>
                        </div>
                        <br/>
                        <div className='third_animation_box'>
                            <Link to='/photographers' className='link'>Looking for a photographer?</Link>
                            <div className='box'></div>
                        </div>
                    </div>
                </div>
                {/* <div className='col-lg-4 col-md-6 col-sm-12 col-12 order-1 order-sm-2'>
                </div> */}
            </div>
            <div className='abstract_image'>
                <img src={firstImage} alt="abstract_image_1"/>
            </div>
            <div className='abstract_image2'>
                <img src={secondImage} alt="abstract_image_1"/>
            </div>
        </div>
        <br/>
        <div className='secondSection container'>
            <div className='heading'>
                <h1>Our Top Categories</h1>
            </div>
            <br/>
            <br/>
            {
                !catloading ? <p className='loader'>Loading...</p> : categories.length > 0 ?
                <CategorySection onclickchange={getCategory} cat={categories} backendurl={props.backendurl}></CategorySection>  
                : ''
            }
        </div>
        <br/>
        <div className='third_section'>
            <div className='container'>
                <div className='text'>
                    <h1>What we offer ?</h1>
                    <h4>Become part of a growing community Exceptional images deserve an exceptional presentation.</h4>
                </div>
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                        <div className='card'>
                            <a><span className="iconify" data-icon="bi:camera"></span></a>
                            <h4>Effective for any business and sector</h4>
                            <h5>Unlike traditional positioning, this broadcast is recommended for all businesses that want to improve visibility on the Internet, regardless of size or sector.</h5>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                        <div className='card'>
                            <a><span className="iconify" data-icon="bi:camera"></span></a>
                            <h4>Effective for any business and sector</h4>
                            <h5>Unlike traditional positioning, this broadcast is recommended for all businesses that want to improve visibility on the Internet, regardless of size or sector.</h5>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                        <div className='card'>
                            <a><span className="iconify" data-icon="bi:camera"></span></a>
                            <h4>Effective for any business and sector</h4>
                            <h5>Unlike traditional positioning, this broadcast is recommended for all businesses that want to improve visibility on the Internet, regardless of size or sector.</h5>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                        <div className='card'>
                            <a><span className="iconify" data-icon="bi:camera"></span></a>
                            <h4>Effective for any business and sector</h4>
                            <h5>Unlike traditional positioning, this broadcast is recommended for all businesses that want to improve visibility on the Internet, regardless of size or sector.</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className='abstract_image'>
                <img src={abstractImageThree}  alt='abstract 3'/>
            </div>
        </div>
        <div className='fourth_section'>
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                    <div className='card'>
                        {/* <img className="star1" src={star1} alt="star1"/>
                        <img className="star2" src={star2} alt="star1"/>
                        <img className="star4" src={star4} alt="star1"/>
                        <img className="star5" src={star5} alt="star1"/>
                        <img className="star6" src={star6} alt="star1"/>
                        <img className="star7" src={star7} alt="star1"/>
                        <img className="star8" src={star8} alt="star1"/> */}
                        <img className="star" src={star} alt="star1"/>
                    </div>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                    <div className='card'>
                        <div className='text'>
                            <h1>Today's Star</h1>
                            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis in risus eget sit volutpat morbi vitae proin. Eros, ut ipsum orci, posuere. Suspendisse amet enim, imperdiet est massa.</h4>
                        </div>
                        <div className='buttons'>
                            <a className="signup_as_photographer">Know more <span className="iconify" data-icon="eva:arrow-ios-forward-fill"></span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="second_section">
            <div className="container">
                <div className='row first_row'>
                    <div className='col-lg-8 col-md-12 col-sm-12 col-12 d-flex align-item-center'>
                        <div className='text'>
                            <h1>Testimonials</h1>
                            <h4>Our core values are at the heart of what we do. They are integrated into our daily life and help us to remember our customer always come first. The last thank you should always come from us.</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className='testimonials container'>
                {
                    !testimonialloading ? <p className='loader'>Loading...</p> : testimonials.length > 0 ?
                    <TestimonialSection testimonials={testimonials} backendurl={props.backendurl}></TestimonialSection>
                    : ''
                }
                {/* <div className='row'>
                    <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
                        <div className='card'>
                            <div>
                                <h4>Aabhas Choudhary</h4>
                                <h5>Unlike traditional positioning, this broadcast is recommended for all businesses that want to improve visibility on the Internet, regardless of size or sector.</h5>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
                        <div className='card'>
                            <div>
                                <h4>Aabhas Choudhary</h4>
                                <h5>Unlike traditional positioning, this broadcast is recommended for all businesses that want to improve visibility on the Internet, regardless of size or sector.</h5>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
                        <div className='card'>
                            <div>
                                <h4>Aabhas Choudhary</h4>
                                <h5>Unlike traditional positioning, this broadcast is recommended for all businesses that want to improve visibility on the Internet, regardless of size or sector.</h5>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
        <GetInTouch thirdSection={thirdSection}></GetInTouch>
        <br/>
        <br/>
        <div className='footer'>

        </div>
     </div>;
}

export default HomePage;