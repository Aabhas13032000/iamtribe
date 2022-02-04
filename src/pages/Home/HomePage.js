import React,{useEffect} from 'react';
import './HomePage.css';
import CategorySection from '../../components/categorySection/CategorySection';
import { Link } from 'react-router-dom';
import { useStateIfMounted } from 'use-state-if-mounted';
// import $ from 'jquery';

function HomePage(props) {
    // const videoImage = require('../../images/video.png');
    const firstImage = require('../../images/1.webp');
    const secondImage = require('../../images/2.webp');

    const [categories,setcategory] = useStateIfMounted([]);
    const [catloading,setLoading] = useStateIfMounted(false);
    // const [count, setCount] = useStateIfMounted(0);

    // var categories = [];

    useEffect(() => {
        getCategories().then(response => {
            setcategory(response.data);
            setLoading(true);
            if(props.user.name){
                console.log(props.user.name);
                if(props.user.status === 1){
                    console.log(document.getElementsByClassName('popup_message')[0]);
                    document.getElementsByClassName('popup_message')[0].innerHTML = `Hello, ${props.user.name} nice to have you back`;
                    document.getElementsByClassName('popup_message')[0].classList.add('activepopup_message');
                } else if(props.user.status === 4){
                    console.log(document.getElementsByClassName('popup_message')[0]);
                    document.getElementsByClassName('popup_message')[0].innerHTML = `Hello, ${props.user.name} your profile has been blocked by admin`;
                    document.getElementsByClassName('popup_message')[0].classList.add('activepopup_message');
                }
                setTimeout(()=>{
                    document.getElementsByClassName('popup_message')[0].classList.remove('activepopup_message')
                },1800)
            }
        });
    },[]);

    function getCategories() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        return fetch(`${props.backendurl}/getImpCategories`, requestOptions).then(response => response.json()).then((result) => {
            // // console.log(result);
            // setcategory(result.data);
            return result;
        }).catch((err) => {
            console.log(err);
        });
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
                            <Link to='/photographer' className='link'>Looking for a photographer?</Link>
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
            {
                !catloading ? <p className='loader'>Loading...</p> : categories.length > 0 ?
                <CategorySection cat={categories} backendurl={props.backendurl}></CategorySection>  
                : ''
            }
        </div>
     </div>;
}

export default HomePage;