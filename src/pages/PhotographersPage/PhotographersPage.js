import React,{useEffect,useState} from 'react';
import './PhotographersPage.css';
import { useStateIfMounted } from 'use-state-if-mounted';

function PhotographersPage(props) {
    
    var [photographers,setPhotographers] = useStateIfMounted([]);
    const [photographersLoading,setPhotographersLoading] = useStateIfMounted(false);
    var [offset,setOffset] = useState(0);

    useEffect(()=> {
        getPhotographers(0);
    },[])

    function getPhotographers(innerOffset) {
        var url;
        if(props.user.id !== null) {
            url = `${props.backendurl}/getPhotographersExcludeId/${props.user.id}/${innerOffset}`;
        } else {
            url = `${props.backendurl}/getPhotographers/${innerOffset}`;
        }
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(url, requestOptions).then(response => response.json()).then((result) => {
            // console.log(result);
            for(var i=0;i<result.data.length;i++){
                photographers.push(result.data[i]);
            }
            setPhotographers(photographers);
            setPhotographersLoading(true);
        }).catch((err) => {
            console.log(err);
        });
    }

    function getMorePhotographers() {
        // console.log(image_array);
        // console.log('hey');
        offset=offset+30;
        setOffset(offset);
        getPhotographers(offset);
        // console.log(offset);
    }

    function getSearchResult() {
        photographers = [];
        var name = document.getElementById('search').value;
        if(name.length !== 0){
            var url;
            if(props.user.id !== null) {
                url = `${props.backendurl}/getSearchPhotographerExcludeId/${props.user.id}/${name}`;
            } else {
                url = `${props.backendurl}/getSearchPhotographerIncludeId/${name}`;
            }
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            fetch(url, requestOptions).then(response => response.json()).then((result) => {
                // console.log(result);
                for(var i=0;i<result.data.length;i++){
                    photographers.push(result.data[i]);
                }
                setPhotographers(photographers);
                setPhotographersLoading(true);
            }).catch((err) => {
                console.log(err);
            });
        } else {
            getPhotographers(0);
        }
    }

    return <div className='photographers container' onScroll={getMorePhotographers}>
        <div className='search'>
            <div className='heading'>
                <h3>Photographers</h3> 
            </div>
            <div className='form-group'>
                <input type='text' placeholder='Search photographer here...' id='search' onKeyUp={getSearchResult} className='form-control'/>
            </div>
        </div>
        {
            !photographersLoading ? <p className='loading'>Loading...</p> 
            : <div className='row each'>
                {
                    photographers.map((photographer,index) => (
                        <div className='col-lg-4 col-md-6 col-sm-12 col-12' key={index}>
                            <div className='profile_card row'>
                                <div className='col-4'>
                                    <div className='image'>
                                        <img src={photographer.profile_pic} alt='profile_image'/>
                                    </div>
                                </div>
                                <div className='col-8'>
                                    <div>
                                        <h5>{photographer.name}</h5>
                                        <p>{photographer.bio.slice(0,50) + '...'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        }
    </div>;
}

export default PhotographersPage;