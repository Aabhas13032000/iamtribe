import React,{useState,useEffect} from 'react';
import './ProfileForm.css';

function ProfileForm(props) {

    // console.log(props.user);
    const female = require('../../images/female.png');
    const male = require('../../images/male.png');
    const user = require('../../images/user.png');
    const [gender,setGender] = useState('male');

    useEffect(() => {
        document.querySelectorAll('.gender_inside').forEach(item => {
            item.addEventListener('click', event => {
                var selected_list = document.getElementsByClassName('selected_gender')[0];
                selected_list.classList.remove('selected_gender');
                item.classList.add('selected_gender');
                setGender(item.getAttribute('data-value'));
            });
        });
    },[]);

    function formSubmit(event) {
        var name = document.getElementById('name').value;
        var phone = document.getElementById('phone').value;
        var gender_value = gender;
        var bio = document.getElementById('bio').value;
        var skills = document.getElementsByClassName('skills');
        var profile_pic = document.getElementById('profile_picture').getAttribute('src');
        var skills_array = [];

        for(var i=0;i<skills.length;i++){
            if(skills[i].checked) {
                skills_array.push(skills[i].value);
            }
        }

        // console.log(skills_array);
        // console.log(gender_value);

        if(skills_array.length !==0 && name.length !==0 && bio.length !== 0 && profile_pic !== '/static/media/user.6f6bbb16.png'){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: name,
                    phone:phone,
                    gender:gender_value,
                    skills:JSON.stringify(skills_array),
                    profile_pic:profile_pic,
                    bio:bio,
                    token:props.user.token,
                }),
            };
            fetch(`${props.backendurl}/users/updateDetails`, requestOptions).then(response => response.json()).then((result) => {
                console.log(result);
                window.location.href = '/profile';
            }).catch((err) => {
                console.log(err);
            })
        } else {
            if(skills_array.length === 0){
                alert('Select atleast one skill!!');
            }
            if(profile_pic === '/static/media/user.6f6bbb16.png'){
                alert('Select profile picture!!');
            }
        }

        event.preventDefault();
    }

    function getProfilePic() {
        alert('Uploading image please wait !!');
        var imageFile = document.getElementById('imgupload').files[0];
        console.log(imageFile);
        var form = new FormData();
        // var form = new URLSearchParams();
        if(imageFile !== undefined){
            form.append('category_image',imageFile);
            const requestOptions = {
                method: 'POST',
                body: form,
            };
            fetch(`${props.backendurl}/uploadCategoryImage`, requestOptions).then(response => response.json()).then((result) => {
                console.log(result);
                document.getElementById('profile_picture').setAttribute('src',`${props.backendurl + result.path.slice(6,result.path.length)}`);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    function openLocalStorage() {
        document.getElementById('imgupload').click();
    }
    

    return <div className='profile_view container'>
        <br/>
    <br/><br/>
        <div className='heading'>
            <h3>Profile Details</h3>
            <p>Fill the pending details first.</p>
        </div>
        <hr/>
        <div className='form'>
            <form onSubmit={formSubmit} method='post'>
                <div className='row'>
                    <div className='col-lg-2'>
                        <h6>Profile pic</h6>
                    </div>
                    <div className='col-lg-8'>
                        <div className='profile_picture'>
                            <input type="file" id="imgupload" accept="images/*" onChange={getProfilePic}/>
                            <img id='profile_picture' src={props.user.profile_pic!== null ? props.user.profile_pic : user} alt='profileImage' />
                            <div className='camera_icon' onClick={openLocalStorage}>
                                <a><span className="iconify" data-icon="bi:camera-fill"></span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className='row'>
                    <div className='col-lg-2'>
                        <h6>Name</h6>
                    </div>
                    <div className='col-lg-8'>
                        <div className='form-group'>
                            <input type="text" className='form-control' id='name' placeholder='Enter your name' defaultValue={props.user.name} required/>
                        </div>
                    </div>
                </div>
                {/* <br/>
                <div className='row'>
                    <div className='col-lg-2'>
                        <h6>Email</h6>
                    </div>
                    <div className='col-lg-8'>
                        <div className='form-group'>
                            <input type="text" className='form-control' placeholder='Enter your email' defaultValue={props.user.email} required/>
                        </div>
                    </div>
                </div> */}
                <br/>
                <div className='row'>
                    <div className='col-lg-2'>
                        <h6>Phone Number (optional)</h6>
                    </div>
                    <div className='col-lg-8'>
                        <div className='form-group'>
                            <input type="text" className='form-control' id='phone' maxLength='10' minLength='10' placeholder='Enter your 10-digit phone number' defaultValue={props.user.phone}/>
                        </div>
                    </div>
                </div>
                <br/>
                <div className='row'>
                    <div className='col-lg-2'>
                        <h6>Gender</h6>
                    </div>
                    <div className='col-lg-8'>
                        <div className='gender'>
                            <div className='gender_inside selected_gender' data-value='male'>
                                <img src={male} alt='male'/>
                            </div>
                            <div className='gender_inside' data-value='female'>
                                <img src={female} alt='female'/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <br/>
                <div className='row'>
                    <div className='col-lg-2'>
                        <h6>Camera Gear</h6>
                    </div>
                    <div className='col-lg-8'>
                        <div className='form-group'>
                            <input type="text" className='form-control' placeholder='Enter your name' required/>
                        </div>
                    </div>
                </div> */}
                <br/>
                <div className='row'>
                    <div className='col-lg-2'>
                        <h6>Bio</h6>
                    </div>
                    <div className='col-lg-8'>
                        <div className='form-group'>
                            <textarea type="text" className='form-control' id='bio' placeholder='Write about yourself not more than 50 word...' required maxLength='50' defaultValue={props.user.bio}></textarea>
                        </div>
                    </div>
                </div>
                <br/>
                <div className='row'>
                    <div className='col-lg-2'>
                        <h6>Skills</h6>
                    </div>
                    <div className='col-lg-8'>
                        <div className='row'>
                            <div className='col-lg-3 col-md-6'>
                                <div className="form-check">
                                    <input className="form-check-input skills" type="checkbox" value="Photoshop"/>
                                    <label className="form-check-label">
                                        Photoshop
                                    </label>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className="form-check">
                                    <input className="form-check-input skills" type="checkbox" value="Lightroom"/>
                                    <label className="form-check-label">
                                        Lightroom
                                    </label>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className="form-check">
                                    <input className="form-check-input skills" type="checkbox" value="Photo Retouching"/>
                                    <label className="form-check-label">
                                        Photo Retouching
                                    </label>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className="form-check">
                                    <input className="form-check-input skills" type="checkbox" value="Album designing"/>
                                    <label className="form-check-label">
                                        Album designing
                                    </label>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className="form-check">
                                    <input className="form-check-input skills" type="checkbox" value="Cinematic video editing"/>
                                    <label className="form-check-label">
                                        Cinematic video editing
                                    </label>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className="form-check">
                                    <input className="form-check-input skills" type="checkbox" value="Traditional video editing"/>
                                    <label className="form-check-label">
                                        Traditional video editing
                                    </label>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className="form-check">
                                    <input className="form-check-input skills" type="checkbox" value="Premiere Pro"/>
                                    <label className="form-check-label">
                                        Premiere Pro
                                    </label>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-6'>
                                <div className="form-check">
                                    <input className="form-check-input skills" type="checkbox" value="Final Cut Pro"/>
                                    <label className="form-check-label">
                                        Final Cut Pro
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className='row'>
                    <div className='col-lg-2 col-md-4 col-sm-6 col-12'>
                        <button type='submit' className='btn btn-primary'>
                            Save
                        </button>
                    </div>
                </div>
                {/* <br/>
                <div className='row'>
                    <div className='col-lg-2'>
                        <h6>Experience</h6>
                    </div>
                    <div className='col-lg-8'>
                        <div className='form-group'>
                            <input type="text" className='form-control' placeholder='Enter your name' required/>
                        </div>
                    </div>
                </div> */}
            </form>
        </div>
        <br/>
    </div>;
}

export default ProfileForm;