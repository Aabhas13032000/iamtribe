import React from 'react';
import './LoginPage.css';
import { useLocation, Link,useHistory } from 'react-router-dom';

function LoginPage(props) {
    var history = useHistory();
    const location = useLocation();
    const signUpImage = require('../../images/signup.png');
    const maxLength = 8;
    const minLength = 8;

    // function checkpassword() {
    //     var password = document.getElementById('password').value;
    //     var c_password = document.getElementById('c_password').value;
    //     if(c_password.length === 8) {
    //         if(password === c_password) {
    //             if(document.getElementById('c_password').classList.contains('is-invalid')){
    //                 document.getElementById('c_password').classList.remove('is-invalid')
    //             }
    //             if(document.getElementsByClassName('error_message')[0].classList.contains('active_error_message')){
    //                 document.getElementsByClassName('error_message')[0].classList.remove('active_error_message')
    //             }
    //             document.getElementById('c_password').classList.add('is-valid');
    //         } else {
    //             if(document.getElementById('c_password').classList.contains('is-valid')){
    //                 document.getElementById('c_password').classList.remove('is-valid')
    //             }
    //             document.getElementById('c_password').classList.add('is-invalid');
    //             document.getElementsByClassName('error_message')[0].innerHTML = '<p>Password is not same !!</p>';
    //             document.getElementsByClassName('error_message')[0].classList.add('active_error_message');
    //             setTimeout(()=> {
    //                 document.getElementsByClassName('error_message')[0].classList.remove('active_error_message');
    //             },2000);
    //         }
    //     } else {
    //         if(document.getElementById('c_password').classList.contains('is-invalid')){
    //             document.getElementById('c_password').classList.remove('is-invalid')
    //         }
    //         if(document.getElementsByClassName('error_message')[0].classList.contains('active_error_message')){
    //             document.getElementsByClassName('error_message')[0].classList.remove('active_error_message')
    //         }
    //         if(document.getElementById('c_password').classList.contains('is-valid')){
    //             document.getElementById('c_password').classList.remove('is-valid')
    //         }
    //     }
    // }

    function formSubmit(event) {
        var name = document.getElementById('name').value;
        var phone = document.getElementById('phone').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var c_password = document.getElementById('c_password').value;

        if(name.length !== 0 && phone.length !==0 && email.length !==0 && password.length === 8 && c_password.length === 8 && (password === c_password)) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: name,
                    phone:phone,
                    email:email,
                    password:password,
                    role_id: (location.pathname === '/signupascustomer' ? 3 : 2),
                }),
            };
            fetch('http://localhost:3000/signupascustomer', requestOptions).then(response => response.json()).then((result) => {
                console.log(result);
                document.getElementsByClassName('error_message')[0].innerHTML = '<p>Registered Successfully !!</p>';
                document.getElementsByClassName('error_message')[0].classList.add('active_error_message');
                setTimeout(()=> {
                    document.getElementsByClassName('error_message')[0].classList.remove('active_error_message');
                },1000);
                setTimeout(()=> {
                    history.replace('/');
                },1500);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            if(document.getElementById('c_password').classList.contains('is-invalid')){
                document.getElementById('c_password').classList.remove('is-invalid')
            }
            if(document.getElementsByClassName('error_message')[0].classList.contains('active_error_message')){
                document.getElementsByClassName('error_message')[0].classList.remove('active_error_message')
            }
            if(document.getElementById('c_password').classList.contains('is-valid')){
                document.getElementById('c_password').classList.remove('is-valid')
            }
            if(password.length !==8 || c_password.length !==8){
                document.getElementById('c_password').classList.add('is-invalid');
                document.getElementsByClassName('error_message')[0].innerHTML = '<p>Password is must contains 8 alphabates same !!</p>';
                document.getElementsByClassName('error_message')[0].classList.add('active_error_message');
                setTimeout(()=> {
                    document.getElementsByClassName('error_message')[0].classList.remove('active_error_message');
                },2000);
            } else {
                if(password !== c_password) {
                    document.getElementById('c_password').classList.add('is-invalid');
                    document.getElementsByClassName('error_message')[0].innerHTML = '<p>Password is not same !!</p>';
                    document.getElementsByClassName('error_message')[0].classList.add('active_error_message');
                    setTimeout(()=> {
                        document.getElementsByClassName('error_message')[0].classList.remove('active_error_message');
                    },2000);
                } else {
                    document.getElementsByClassName('error_message')[0].classList.add('active_error_message');
                    document.getElementsByClassName('error_message')[0].innerHTML = '<p>Please check the form before submitting !!</p>';
                    setTimeout(()=> {
                        document.getElementsByClassName('error_message')[0].classList.remove('active_error_message');
                    },2000);
                }
            }
        }

        
        event.preventDefault();
    }

    return <div className='outerBox'>
        <div className='signup'>
            <div className='logo'>
                <Link to='/'><h3>#imfromtribe</h3></Link>
            </div>
            <div className='row'>
                <div className='col-lg-8 col-md-8 col-sm-12 col-12'>
                    <div className='form'>
                        <div className='heading'>
                            <h3>
                                Login
                            </h3>
                        </div>
                        <form onSubmit={formSubmit} method='post'>
                            <div style={{width : '100%'}}>
                            <div className='form-group'>
                                <input type='email' className='form-control' name='email' id='email' placeholder='Email..' />
                            </div>
                            <div className='form-group'>
                                <input type='password' className='form-control' name='password' id='password' placeholder='Password..' maxLength={maxLength} minLength={minLength} />
                            </div>
                            <div className='buttons'>
                                <div className='forSignup_as_customer'>
                                    <button type='submit' className='btn btn-primary' id='signup_as_customer'>Submit</button>
                                </div>
                            </div>
                            </div>
                        </form>
                        <div className='bottom_text'>
                            <p>Don't have an account? <Link to='/signup'>Create one</Link></p>
                        </div>
                        <div className='bottom_text'>
                            <p><Link to='/forgot_password'>Forgot Password</Link></p>
                        </div>
                    </div>
                    <div className='error_message'>
                        <p>Please check the form before submitting !!</p>
                    </div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-12 d-lg-flex d-md-flex d-sm-none d-none'>
                    <img src={signUpImage} alt='signup'/>
                </div> 
            </div>
        </div>
    </div>;
}

export default LoginPage;