import React,{useState,useEffect} from 'react';
import './SignupPage.css';
import { Link } from 'react-router-dom';

function SignupPage(props) {
    // var history = useHistory();
    // const location = useLocation();
    const signUpImage = require('../../images/signup.png');
    const maxLength = 8;
    const minLength = 8;
    const [selectedyesno,setYesNo]=useState('');
    const [mailId,setEmail]=useState('');
    const [alreadyPresent,setAlreadyPresent] = useState('false');
    // const [otp,setOTP] = useState(0);
    // const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            document.querySelectorAll('.yesno').forEach(item => {
                item.addEventListener('click', event => {
                    var selected_list = document.getElementsByClassName('selectedyesno')[0];
                    if(selected_list){
                        if(selected_list.classList.contains('selectedyesno')){
                            selected_list.classList.remove('selectedyesno');
                        }
                    }
                    item.classList.add('selectedyesno');
                    setYesNo(item.querySelector('p').innerHTML.toLowerCase());
                });
            });
        },500);
    },[]);

    function checkpassword() {
        var password = document.getElementById('password').value;
        var c_password = document.getElementById('c_password').value;
        if(c_password.length === 8) {
            if(password === c_password) {
                if(document.getElementById('c_password').classList.contains('is-invalid')){
                    document.getElementById('c_password').classList.remove('is-invalid')
                }
                if(document.getElementsByClassName('error_message')[0].classList.contains('active_error_message')){
                    document.getElementsByClassName('error_message')[0].classList.remove('active_error_message')
                }
                document.getElementById('c_password').classList.add('is-valid');
            } else {
                if(document.getElementById('c_password').classList.contains('is-valid')){
                    document.getElementById('c_password').classList.remove('is-valid')
                }
                document.getElementById('c_password').classList.add('is-invalid');
                document.getElementsByClassName('error_message')[0].innerHTML = '<p>Password is not same !!</p>';
                document.getElementsByClassName('error_message')[0].classList.add('active_error_message');
                setTimeout(()=> {
                    document.getElementsByClassName('error_message')[0].classList.remove('active_error_message');
                },2000);
            }
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
        }
    }

    function closeOtp() {
        window.clearInterval();
        window.clearTimeout();
        document.getElementsByClassName('otp_box')[0].style.display = 'none';
        document.getElementById('otp_value_1').value = '';
        document.getElementById('otp_value_2').value = '';
        document.getElementById('otp_value_3').value = '';
        document.getElementById('otp_value_4').value = '';
        document.getElementById('timer').innerHTML = '00:59';
        if(!document.getElementsByClassName('resend')[0].classList.contains('resend_disable')){
            document.getElementsByClassName('resend')[0].classList.add('resend_disable');
        }
    }

    function resendOtp() {
        var val = Math.floor(1000 + Math.random() * 9000);
        // console.log(val);
        // setOTP(val.toString());
        sendOtp(val.toString(),mailId);
        window.clearInterval();
        window.clearTimeout();
        document.getElementById('otp_value_1').value = '';
        document.getElementById('otp_value_2').value = '';
        document.getElementById('otp_value_3').value = '';
        document.getElementById('otp_value_4').value = '';
        document.getElementById('timer').innerHTML = '00:59';
        if(!document.getElementsByClassName('resend')[0].classList.contains('resend_disable')){
            document.getElementsByClassName('resend')[0].classList.add('resend_disable');
        }
        var time = 59;
            setInterval(()=>{
                if(time >=0){
                    document.getElementById('timer').innerHTML = '00:' + time;
                    time--;
                } else {
                    document.getElementById('timer').innerHTML = '';
                }
        },1000);
        setTimeout(()=>{
            document.getElementById('otp_value_1').focus();
        },200);
            // clearInterval(myTimer);
        setTimeout(() => {
            document.getElementsByClassName('resend')[0].classList.remove('resend_disable');
            document.getElementById('timer').innerHTML = '';
        },60000);
    }

    function sendOtp(otp,email) {
        // console.log(email);
        if(email.length !== 0){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    otp: otp,
                    email:email,
                }),
            };
            fetch(`${props.backendurl}/users/sendmail`, requestOptions).then(response => response.json()).then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
        }
    }


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
                if(result.data.length !== 0){
                    setAlreadyPresent('true');
                    document.getElementById('email').classList.add('is-invalid');
                    document.getElementsByClassName('error_message')[0].innerHTML = '<p>Email already registered!!</p>';
                    document.getElementsByClassName('error_message')[0].classList.add('active_error_message');
                    setTimeout(()=> {
                        document.getElementsByClassName('error_message')[0].classList.remove('active_error_message');
                    },2000);
                } else {
                    document.getElementById('email').classList.add('is-valid');
                    setAlreadyPresent('false');
                }
                // setcategory(result.data);
            }).catch((err) => {
                console.log(err);
            });
        }
    }


    function formSubmit(event) {
        var name = document.getElementById('name').value;
        // var phone = document.getElementById('phone').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var c_password = document.getElementById('c_password').value;
        if(document.getElementById('c_password').classList.contains('is-invalid')){
            document.getElementById('c_password').classList.remove('is-invalid')
        }
        if(document.getElementsByClassName('error_message')[0].classList.contains('active_error_message')){
            document.getElementsByClassName('error_message')[0].classList.remove('active_error_message')
        }
        if(document.getElementById('c_password').classList.contains('is-valid')){
            document.getElementById('c_password').classList.remove('is-valid')
        }

        if(alreadyPresent!=='true'){
            if(name.length !== 0 && email.length !==0 && password.length === 8 && c_password.length === 8 && (password === c_password) && selectedyesno.length !==0) {
                setEmail(email);
                var val = Math.floor(1000 + Math.random() * 9000);
                console.log(val);
                // sendOtp(val.toString(),email);
                var time = 59;
                setInterval(()=>{
                    if(time >=0){
                        document.getElementById('timer').innerHTML = '00:' + time;
                        time--;
                    } else {
                        document.getElementById('timer').innerHTML = '';
                    }
                },1000);
                document.getElementsByClassName('otp_box')[0].style.display = 'flex';
                setTimeout(()=>{
                    document.getElementById('otp_value_1').focus();
                },200);
                // clearInterval(myTimer);
                setTimeout(() => {
                    document.getElementsByClassName('resend')[0].classList.remove('resend_disable');
                    document.getElementById('timer').innerHTML = '';
                },60000);
                document.querySelectorAll('.otp_input').forEach(item => {
                    item.addEventListener('keyup', event => {
                        // console.log(item);
                        var id = item.getAttribute('id');
                        document.getElementById(id).blur();
                        var index = parseInt(id.split('_')[2],10);
                        if(index < 4){
                            document.getElementById('otp_value_' + (index+1)).focus();
                        } else {
                            var enteredotp = document.getElementById('otp_value_1').value + document.getElementById('otp_value_2').value + document.getElementById('otp_value_3').value + document.getElementById('otp_value_4').value;
                            console.log(val);
                            if(enteredotp === '1111') {
                                console.log('end');
                            } else if(enteredotp === val.toString()) {
                                console.log(enteredotp);
                                if(document.getElementById('otp_value_1').classList.contains('notvalid_otp')){
                                    document.getElementById('otp_value_1').classList.remove('notvalid_otp')
                                }
                                if(document.getElementById('otp_value_2').classList.contains('notvalid_otp')){
                                    document.getElementById('otp_value_2').classList.remove('notvalid_otp')
                                }
                                if(document.getElementById('otp_value_3').classList.contains('notvalid_otp')){
                                    document.getElementById('otp_value_3').classList.remove('notvalid_otp')
                                }
                                if(document.getElementById('otp_value_4').classList.contains('notvalid_otp')){
                                    document.getElementById('otp_value_4').classList.remove('notvalid_otp')
                                }
                                document.getElementById('otp_value_1').classList.add('valid_otp');
                                document.getElementById('otp_value_2').classList.add('valid_otp');
                                document.getElementById('otp_value_3').classList.add('valid_otp');
                                document.getElementById('otp_value_4').classList.add('valid_otp');
                                var savedtoken = document.cookie.split('=')[1];
                                const requestOptions = {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ 
                                        name: name,
                                        email:email,
                                        password:password,
                                        role_id: selectedyesno === 'yes' ? 2 : 3,
                                        token:savedtoken,
                                    }),
                                };
                                fetch(`${props.backendurl}/users/signup`, requestOptions).then(response => response.json()).then((result) => {
                                    console.log(result);
                                    setTimeout(() => {
                                        window.location.href = '/';
                                    },1000)
                                }).catch((err) => {
                                    console.log(err);
                                })
                            } else {
                                if(document.getElementById('otp_value_1').classList.contains('valid_otp')){
                                    document.getElementById('otp_value_1').classList.remove('valid_otp')
                                }
                                if(document.getElementById('otp_value_2').classList.contains('valid_otp')){
                                    document.getElementById('otp_value_2').classList.remove('valid_otp')
                                }
                                if(document.getElementById('otp_value_3').classList.contains('valid_otp')){
                                    document.getElementById('otp_value_3').classList.remove('valid_otp')
                                }
                                if(document.getElementById('otp_value_4').classList.contains('valid_otp')){
                                    document.getElementById('otp_value_4').classList.remove('valid_otp')
                                }
                                document.getElementById('otp_value_1').classList.add('notvalid_otp');
                                document.getElementById('otp_value_2').classList.add('notvalid_otp');
                                document.getElementById('otp_value_3').classList.add('notvalid_otp');
                                document.getElementById('otp_value_4').classList.add('notvalid_otp');
                            }
                        }
                    });
                });
            } else {
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
                    } else if(selectedyesno.length === 0) {
                        document.getElementsByClassName('error_message')[0].innerHTML = '<p>Select yes no before submitting !!</p>';
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
        } else {
            document.getElementById('email').classList.add('is-invalid');
            document.getElementsByClassName('error_message')[0].innerHTML = '<p>Email already registered!!</p>';
            document.getElementsByClassName('error_message')[0].classList.add('active_error_message');
            setTimeout(()=> {
                document.getElementsByClassName('error_message')[0].classList.remove('active_error_message');
            },2000);
        }

        
        event.preventDefault();
    }

    return <div className='outerBox'>
            <div className='otp_box'>
                <div className='form'>
                    <div className='close_otp_box' onClick={closeOtp}>
                        <a className='close_button'><span className="iconify" data-icon="eva:close-outline"></span></a>
                    </div>
                    <div className='heading'>
                        <h5>Enter OTP</h5>
                        <p>An OTP is sent to {mailId}</p>
                    </div>
                    <form>
                        <div className='row'>
                            <div className='col-3'>
                                <div className='form-group'>
                                    <input type='number' min='0' max='9' id='otp_value_1' maxLength='1' minLength='1' className='form-control otp_input' />
                                </div>
                            </div>
                            <div className='col-3'>
                                <div className='form-group'>
                                    <input type='number' min='0' max='9' id='otp_value_2' maxLength='1' minLength='1' className='form-control otp_input' />
                                </div>
                            </div>
                            <div className='col-3'>
                                <div className='form-group'>
                                    <input type='number' min='0' max='9' id='otp_value_3' maxLength='1' minLength='1' className='form-control otp_input' />
                                </div>
                            </div>
                            <div className='col-3'>
                                <div className='form-group'>
                                    <input type='number' min='0' max='9' id='otp_value_4' maxLength='1' minLength='1' className='form-control otp_input' />
                                </div>
                            </div>
                        </div>
                        {/* <br/>
                            <div className='buttons'>
                                <div className='forotp'>
                                    <button type='submit' className='btn btn-primary' id='otp_button'>Submit</button>
                                </div>
                            </div> */}
                    </form>
                    <div className='resend resend_disable' onClick={resendOtp}>
                        <a>Resend <span id='timer'>00:59</span></a>
                    </div>
                </div>
            </div>
        <div className='signup'>
            <div className='logo'>
                <Link to='/'><h3>#imfromtribe</h3></Link>
            </div>
            <div className='row'>
                <div className='col-lg-8 col-md-8 col-sm-12 col-12'>
                    <div className='form'>
                        <div className='heading'>
                            <h3>
                                Signup
                            </h3>
                        </div>
                        <form onSubmit={formSubmit} method='post'>
                            <div style={{width : '100%'}}>
                            <div className='form-group'>
                                <input type='text' className='form-control' name='name' id='name' placeholder='Tell us your name..'/>
                            </div>
                            {/* <div className='form-group'>
                                <input type='tel' className='form-control' name='phone' id='phone' placeholder='Mobile number..' />
                            </div> */}
                            <div className='form-group'>
                                <input type='email' className='form-control' name='email' id='email' placeholder='Email..' onKeyUp={checkUser} />
                            </div>
                            <div className='form-group'>
                                <input type='password' className='form-control' name='password' id='password' placeholder='Password..' maxLength={maxLength} minLength={minLength} autoComplete='off' />
                            </div>
                            <div className='form-group'>
                                <input type='password' className='form-control' name='c_password' onKeyUp={checkpassword} id='c_password' placeholder='Confirm Password..' maxLength={maxLength} minLength={minLength} autoComplete='off'/>
                            </div>
                            <div className='row photographer'>
                                <div className='col-12'>
                                    <p>Are you a photographer?</p>
                                </div>
                                <div className='col-6'>
                                    <div className='card yesno'>
                                        <p>Yes</p>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='card yesno'>
                                        <p>No</p>
                                    </div>
                                </div>
                            </div>
                            <div className='buttons'>
                                <div className='forSignup_as_customer'>
                                    <button type='submit' className='btn btn-primary' id='signup_as_customer'>Get OTP</button>
                                </div>
                            </div>
                            </div>
                        </form>
                        <div className='bottom_text'>
                            <p>Already have an account? <Link to='/login'>Login</Link></p>
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

export default SignupPage;