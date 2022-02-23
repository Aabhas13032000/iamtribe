import React from 'react';

function GetInTouch(props) {
    return <div className='third_section' ref={props.thirdSection}>
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
        </div>;
}

export default GetInTouch;