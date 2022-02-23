import React,{useEffect,useState} from 'react';
import './Account.css';

function Account(props) {

    // console.log(props.user);
    var [loading,setLoading] = useState(false);
    var [image_array,setImageArray] = useState([]);
    var [image_offset,setImageOffset] = useState(0);
    var [video_array,setVideoArray] = useState([]);
    var [video_offset,setVideoOffset] = useState(0);
    const [selected_tab,setSelectedTab] = useState('image');
    const windowWidth = window.innerWidth;

    useEffect(()=>{
        document.querySelectorAll('.each_tab').forEach(item => {
            item.addEventListener('click', event => {
                var selected_list = document.getElementsByClassName('selected_tab')[0];
                selected_list.classList.remove('selected_tab');
                item.classList.add('selected_tab');
                console.log(item.innerHTML);
                if(item.innerHTML.toLowerCase() === 'images'){
                    setSelectedTab('image');
                    getUserImagesVideos(0,'image');
                } else if(item.innerHTML.toLowerCase() === 'videos') {
                    setSelectedTab('video');
                    getUserImagesVideos(0,'video');
                }
            });
        });
        getUserImagesVideos(0,'image');
    },[])

    function getUserImagesVideos(inneroffset,category) {
        if(inneroffset === 0) {
            image_array = [];
            video_array = [];
        }
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`${props.backendurl}/users/getUserImagesVideos/${category}/${props.user.id}/${inneroffset}`, requestOptions).then(response => response.json()).then((result) => {
            console.log(result);
            if(category === 'image'){
                for(var i=0;i<result.data.length;i++){
                    image_array.push(result.data[i]);
                }
                console.log(image_array);
                setImageArray(image_array);
            } else if(category === 'video'){
                for(var j=0;j<result.data.length;j++){
                    video_array.push(result.data[j]);
                }
                setVideoArray(video_array);
            }
            setLoading(true);
        }).catch((err) => {
            console.log(err);
        });
    }

    function getProfilePic() {
        alert('Uploading image please wait !!');
        var imageFile = document.getElementById('imgupload').files[0];
        console.log(imageFile);
        var form = new FormData();
        // var form = new URLSearchParams();
        if(imageFile !== undefined){
            form.append('cover_image',imageFile);
            const requestOptions = {
                method: 'POST',
                body: form,
            };
            fetch(`${props.backendurl}/uploadUserCoverImage/${props.user.id}`, requestOptions).then(response => response.json()).then((result) => {
                console.log(result);
                window.location.href = '/profile';
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    function openLocalStorage() {
        document.getElementById('imgupload').click();
    }

    function submitImageAndVideo() {
        if(document.getElementsByClassName('submitImagePopupBackground')[0].classList.contains('activeSubmitImagePopupBackground')) {
            document.getElementsByClassName('submitImagePopupBackground')[0].classList.remove('activeSubmitImagePopupBackground');
        } else {
            document.getElementsByClassName('submitImagePopupBackground')[0].classList.add('activeSubmitImagePopupBackground');
        }
        if(document.getElementsByClassName('submitImagePopup')[0].classList.contains('activeSubmitImagePopup')) {
            document.getElementsByClassName('submitImagePopup')[0].classList.remove('activeSubmitImagePopup')
        } else {
            document.getElementsByClassName('submitImagePopup')[0].classList.add('activeSubmitImagePopup')
        }
    }

    function getMoreData() {
        if(selected_tab === 'image'){
            // console.log('image');
            image_offset = image_offset + 20;
            setImageOffset(image_offset);
            getUserImagesVideos(image_offset,'image');
        } else if(selected_tab === 'video') {
            // console.log('video');
            video_offset = video_offset + 20;
            setVideoOffset(video_offset);
            getUserImagesVideos(video_offset,'video');
        }
    }
    
    return <div className='account container' onScroll={getMoreData}>
        <div className='submitImagePopupBackground' onClick={submitImageAndVideo}></div>
        <div className='submitImagePopup'>
            <div className='heading'>
                <h5>Add Image/Video</h5>
                <div>
                    <a onClick={submitImageAndVideo}><span className="iconify" data-icon="akar-icons:cross"></span></a>
                </div>
            </div>
            <hr/>
        </div>
        <br/><br/><br/>
        <div className='cover_image'>
            {
                props.user.cover_photo === null 
                ? <div className='add_image'>
                    <input type="file" id="imgupload" accept="images/*" onChange={getProfilePic}/>
                    <h5 onClick={openLocalStorage}>Add Cover Image <span className="iconify" data-icon="bi:camera-fill"></span></h5>
                </div>
                : <img src={props.user.cover_photo} alt='cover_photo'/>
            }
        </div>
        <div className='profile_pic'>
            <img src={props.user.profile_pic} alt='profile_photo'/>
        </div>
        <div className='row'>
            <div className='col-lg-3 col-md-4 col-sm-12'>
                <div className='info'>
                    <br/>
                    {/* <br/> */}
                    <h4>{props.user.name}</h4>
                    {/* <br/> */}
                    <p>{props.user.bio}</p>
                    <p>{props.user.email}</p>
                    <p>{props.user.phone}</p>
                    <div className='skills'>
                        {
                            JSON.parse(props.user.skills).map((skill,index) => (
                                <a key={index}>{skill}</a>
                            ))
                        }
                    </div>
                    <div className='edit_profile'>
                        <a><span className="iconify" data-icon="akar-icons:edit"></span></a>
                    </div>
                </div>
            </div>
            <div className='col-lg-9 col-md-8 col-sm-12' onScroll={getMoreData}>
                    <div className='uper_tabs'>
                        <div className='tabs'>
                            <a className='each_tab selected_tab'>Images</a>
                            <a className='each_tab'>Videos</a>
                        </div>
                        <hr/>
                    </div>
                    {
                        !loading 
                        ? <p>Loading...</p>
                        : <div className='data_tab'>
                            {
                                selected_tab === 'image' 
                                ? image_array.length !== 0
                                ? ''
                                : <div className='col-12' id='add__image_data'>
                                <div className='add_image'>
                                    <h5 onClick={submitImageAndVideo}>Add Images <span className="iconify" data-icon="bi:camera-fill"></span></h5>
                                </div>
                            </div>
                                : video_array.length !== 0
                                ? ''
                                : <div className='col-12' id='add__video_data'>
                                <div className='add_image'>
                                    <h5 onClick={submitImageAndVideo}>Add Videos <span className="iconify" data-icon="ant-design:play-circle-filled"></span></h5>
                                </div>
                            </div>
                            }
                            {
                                !loading 
                                ? ''
                                : windowWidth <= 768
                                ? <div className='row'>
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-6" id="column_one">
                                        {
                                            selected_tab === 'image'
                                            ? image_array.map((image,image_index) => (
                                                image_index%2 === 0
                                                ? <img src={props.backendurl + image.path} key={image_index} alt='user_images'/>
                                                : ''
                                            ))
                                            : video_array.map((video,video_index) => (
                                                <p key={video_index}></p>
                                            ))
                                        }
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-6" id="column_two">
                                        {
                                            selected_tab === 'image'
                                            ? image_array.map((image,image_index) => (
                                                image_index%2 !== 0
                                                ? <img src={props.backendurl + image.path} key={image_index} alt='user_images'/>
                                                : ''
                                            ))
                                            : video_array.map((video,video_index) => (
                                                <p key={video_index}></p>
                                            ))
                                        }
                                    </div>
                                </div>
                                : <div className='row'>
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-6" id="column_one">
                                        {
                                            selected_tab === 'image'
                                            ? image_array.map((image,image_index) => (
                                                image_index%3 === 0
                                                ? <img src={props.backendurl + image.path} key={image_index} alt='user_images'/>
                                                : ''
                                            ))
                                            : video_array.map((video,video_index) => (
                                                <p key={video_index}></p>
                                            ))
                                        }
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-6" id="column_two">
                                        {
                                            selected_tab === 'image'
                                            ? image_array.map((image,image_index) => (
                                                image_index%3 === 1
                                                ? <img src={props.backendurl + image.path} key={image_index} alt='user_images'/>
                                                : ''
                                            ))
                                            : video_array.map((video,video_index) => (
                                                <p key={video_index}></p>
                                            ))
                                        }
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-6" id="column_three">
                                        {
                                            selected_tab === 'image'
                                            ? image_array.map((image,image_index) => (
                                                image_index%3 === 2
                                                ? <img src={props.backendurl + image.path} key={image_index} alt='user_images'/>
                                                : ''
                                            ))
                                            : video_array.map((video,video_index) => (
                                                <p key={video_index}></p>
                                            ))
                                        }
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                    </div>
                                </div>
                            }
                        </div>
                    }
            </div>
        </div>
    </div>;
}

export default Account;