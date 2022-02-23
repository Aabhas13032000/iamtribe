import React,{useState} from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';

function LoginPage(props) {
    // var history = useHistory();
    // const location = useLocation();
    const signUpImage = require('../../images/signup.png');
    const maxLength = 8;
    const minLength = 8;
    const [newuser,setUser] = useState({});

    function checkUser() {
        var email = document.getElementById('email').value;
        if(document.getElementById('email').classList.contains('is-invalid')){
            document.getElementById('email').classList.remove('is-invalid')
        }
        if(document.getElementById('email').classList.contains('is-valid')){
            document.getElementById('email').classList.remove('is-valid')
        }
        if(email.includes('@')){
            // console.log(email);
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            fetch(`${props.backendurl}/users/checkUser/${email}`, requestOptions).then(response => response.json()).then((result) => {
                // console.log(result);
                if(result.data.length === 0){
                    document.getElementById('email').classList.add('is-invalid');
                    document.getElementsByClassName('error_message')[0].innerHTML = '<p>This email is not registered!!</p>';
                    document.getElementsByClassName('error_message')[0].classList.add('active_error_message');
                    setTimeout(()=> {
                        document.getElementsByClassName('error_message')[0].classList.remove('active_error_message');
                    },2000);
                } else {
                    document.getElementById('email').classList.add('is-valid');
                    setUser(result.data[0]);
                }
                // setcategory(result.data);
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    function formSubmit(event) {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if(document.getElementById('email').classList.contains('is-invalid')){
            document.getElementById('email').classList.remove('is-invalid');
        }
        if(document.getElementById('email').classList.contains('is-valid')){
            document.getElementById('email').classList.remove('is-valid');
        }
        if(document.getElementById('password').classList.contains('is-invalid')){
            document.getElementById('password').classList.remove('is-invalid');
        }
        if(document.getElementById('password').classList.contains('is-valid')){
            document.getElementById('password').classList.remove('is-valid');
        }
        if(document.getElementsByClassName('error_message')[0].classList.contains('active_error_message')){
            document.getElementsByClassName('error_message')[0].classList.remove('active_error_message')
        }

        if(email === newuser.email && password === newuser.password) {
            document.getElementById('email').classList.add('is-valid');
            document.getElementById('password').classList.add('is-valid');
            props.updateLogin(newuser);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    token:newuser.token,
                }),
            };
            fetch(`${props.backendurl}/users/updateLoginStatus`, requestOptions).then(response => response.json()).then((result) => {
                console.log(result);
                setTimeout(() => {
                    window.location.href = '/';
                },1000)
            }).catch((err) => {
                console.log(err);
            });
        } else {
            if(password !== newuser.password) {
                document.getElementById('password').classList.add('is-invalid');
                document.getElementsByClassName('error_message')[0].innerHTML = '<p>Password does not matched!!</p>';
                document.getElementsByClassName('error_message')[0].classList.add('active_error_message');
                setTimeout(()=> {
                    document.getElementsByClassName('error_message')[0].classList.remove('active_error_message');
                },2000);
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
                                <input type='email' className='form-control' name='email' id='email' onKeyUp={checkUser} placeholder='Email..' />
                            </div>
                            <div className='form-group'>
                                <input type='password' className='form-control' name='password' id='password' placeholder='Password..' maxLength={maxLength} minLength={minLength} autoComplete='on'/>
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