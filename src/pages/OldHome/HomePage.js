import React, { useEffect,useRef } from 'react';
import './HomePage.css';
import {Link} from 'react-router-dom'

function HomePage(props) {

    const thirdSection = useRef(null);

    const videoImage = require('../../images/video.png');
    const abstractImageOne = require('../../images/abstract_image1.png');
    const abstractImageTwo = require('../../images/abstract_image2.png');
    const abstractImageThree = require('../../images/abstract_image3.png');
    // const star1 = require('../../images/star1.png');
    // const star2 = require('../../images/star2.png');
    // const star4 = require('../../images/star4.png');
    // const star5 = require('../../images/star5.png');
    // const star6 = require('../../images/star6.png');
    // const star7 = require('../../images/star7.png');
    // const star8 = require('../../images/star8.png');
    const star = require('../../images/star.png');

    useEffect(() => {
        // var scrollvalue = (document.getElementsByClassName('selected_card')[0].getBoundingClientRect().left + document.getElementsByClassName('selected_card')[0].offsetWidth/2) - window.innerWidth/2;

        // console.log(scrollvalue);

        // document.getElementById('scrollable_cards').scrollLeft = scrollvalue;
        props.onclickscrollto(thirdSection);
      }, []);

      function moveBackward() {
        var items =  document.getElementsByClassName('inner_cards');
        var popedElement = items[items.length-1];
        items[items.length-1].parentNode.removeChild(items[items.length-1]);
        items[0].parentNode.insertBefore(popedElement,items[0]);
        for(var i=0;i<items.length;i++) {
            if(items[i].classList.contains('selected_card')){
                items[i].classList.remove('selected_card');
                items[i-1].classList.add('selected_card');
                break;
            }
        }
        // for(var i=0;i<items.length;i++) {
        //     if(items[i].classList.contains('selected_card')){
        //         items[i].classList.remove('selected_card');
        //         if(i===0){
        //             items[items.length-1].classList.add('selected_card');
        //         } else {
        //             items[i-1].classList.add('selected_card');
        //             console.log(items[i-1].getBoundingClientRect().left + items[i-1].offsetWidth/2);
        //         }
        //         break;
        //     }
        // }
      }

      function moveForward() {
        var items =  document.getElementsByClassName('inner_cards');
        var popedElement = items[0];
        items[0].parentNode.removeChild(items[0]);
        items[items.length-1].parentNode.appendChild(popedElement);
        for(var i=0;i<items.length;i++) {
            if(items[i].classList.contains('selected_card')){
                items[i].classList.remove('selected_card');
                items[i+1].classList.add('selected_card');
                break;
            }
        }
    }

    return <div className='home'>
    <img className="abstract_image_1" src={abstractImageOne} alt="abstract_image_1"/>  
    <img className="abstract_image_2" src={abstractImageTwo} alt="abstract_image_1"/>
        <div className="container">
            <div className="row hero_section">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 order-1 order-md-0 right_section">
                    <div>
                    <h5>— Grow Business</h5>
                    <h1>Create your perfect<br/>Photography Profile</h1>
                    <h4>Position in the First Search Results Appearing in More Then 100 Digital Newspapers.</h4>
                    <br/>
                    <div className="buttons">
                        <Link to="/signupasphotographer" className="signup_as_photographer">Sign Up as Photographer <span className="iconify" data-icon="eva:arrow-ios-forward-fill"></span></Link>
                        <Link to="/signupascustomer" className="signup_as_customer">Sign Up as Customer <span className="iconify" data-icon="eva:arrow-ios-forward-fill"></span></Link>
                    </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 order-0 order-md-1 d-flex align-items-lg-center align-items-md-center align-items-sm-center justify-content-lg-end justify-content-md-end justify-content-sm-center left_section">
                    <div className="card">
                        <img src={videoImage} alt="abstract_image_1"/>
                    </div>
                </div>
            </div>
        </div>
        <div className="second_section">
            {/* <div className="container">
                <div className='row first_row'>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-12 d-flex align-item-center'>
                        <div className='text'>
                            <h1>Our Top Categories</h1>
                            <h4>Become part of a growing community Exceptional images deserve an exceptional presentation.</h4>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                        <div className='buttons'>
                            <a className="signup_as_photographer">Book yours now <span className="iconify" data-icon="eva:arrow-ios-forward-fill"></span></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='scrollable_cards' id='scrollable_cards'>
                <div className='inner_cards'>
                    <img src='https://expertphotography.b-cdn.net/wp-content/uploads/2019/07/photography-lenses-oranges.jpg' alt='category_image' />
                </div>
                <div className='inner_cards'>
                    <img src='https://iso.500px.com/wp-content/uploads/2014/06/W4A2827-1-3000x2000.jpg' alt='category_image' />
                </div>
                <div className='inner_cards selected_card'>
                    <img src='https://images.news18.com/ibnlive/uploads/2021/12/katrina-kaif-vicky-kaushal-wedding-pictures-19.jpg' alt='category_image' />
                </div>
                <div className='inner_cards'>
                    <img src='https://phowdimages.azureedge.net/cloud/pics/197506/p/62dcc06497c54dd4ad8416ee9a4773e7/1.jpg?preset=details' alt='category_image' />
                </div>
                <div className='inner_cards'>
                    <img src='https://qph.fs.quoracdn.net/main-qimg-bf321f1003c9c382ecfe297bfaf90dc6' alt='category_image' />
                </div>
            </div>
            <div className='left_right'>
                <div className='buttons'>
                    <a onClick={moveBackward}><span className="iconify" data-icon="eva:arrow-ios-back-fill"></span></a>
                    <a onClick={moveForward}><span className="iconify" data-icon="eva:arrow-ios-forward-outline"></span></a>
                </div>
            </div> */}
        </div>
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
                <div className='row'>
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
                </div>
            </div>
        </div>
        <div className='third_section' ref={thirdSection}>
            <div className='container'>
                <div className='text'>
                    <h1>Hire Us</h1>
                    <h4>Become part of a growing community Exceptional images deserve an exceptional presentation.</h4>
                </div>
                <div className='get_in_touch'>
                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                            <form>
                                <div className='form-group'>
                                    <input type='text' className='form-control' name='name' id='name' placeholder='Tell us your name..'/>
                                </div>
                                <div className='form-group'>
                                    <input type='tel' className='form-control' name='phone' id='phone' placeholder='Mobile number..' />
                                </div>
                                <div className='form-group'>
                                    <input type='email' className='form-control' name='email' id='email' placeholder='Email..' />
                                </div>
                                <div className='form-group'>
                                    <textarea rows="8" className='form-control' name='message' id='message' placeholder='Message..' ></textarea>
                                </div>
                                <div className='buttons'>
                                    <button type='submit' className='btn btn-primart'>Send</button>
                                </div>
                            </form>
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                            <div className='card'>
                                <div className='contact_links'>
                                    <a><span className="iconify" data-icon="iconoir:youtube"></span></a>
                                    <a><span className="iconify" data-icon="akar-icons:instagram-fill"></span></a>
                                    <a><span className="iconify" data-icon="bx:bxl-facebook"></span></a>
                                    <a><span className="iconify" data-icon="akar-icons:twitter-fill"></span></a>
                                </div>
                                <div className='contact_information'>
                                    <a><span className="iconify" data-icon="ci:location-outline"></span></a>
                                    <a>Infomation technologies building,Victoria Island, Lagos, Nigeria.</a>
                                </div>
                                <div className='contact_information'>
                                    <a><span className="iconify" data-icon="carbon:phone"></span></a>
                                    <a>+91 081-1236-4568</a>
                                </div>
                                <div className='contact_information'>
                                    <a><span className="iconify" data-icon="feather:mail"></span></a>
                                    <a>hello@info.com.ng</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default HomePage;