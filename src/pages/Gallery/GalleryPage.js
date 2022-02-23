import React ,{useEffect,useState} from 'react';
import './GalleryPage.css';
// import ImageModal from './ImageModal';

function GalleryPage(props) {

    var [offset,setOffset] = useState(0);
    var [image_array,setImageArray] = useState([]);
    var [openpath,setPath] = useState('');
    var [active,setactive] = useState(0);

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`${props.backendurl}/getCategories`, requestOptions).then(response => response.json()).then((result) => {
            console.log(result);
            for(var i=0;i<result.data.length;i++) {
                var node = document.createElement('A');
                if(props.selectedTab === result.data[i].name){
                    node.setAttribute('class','inner_tabs selected_tab');
                } else {
                    node.setAttribute('class','inner_tabs');
                }
                node.innerHTML = result.data[i].name
                document.getElementById('tabs').appendChild(node);
            }
            document.querySelectorAll('.inner_tabs').forEach(item => {
                item.addEventListener('click', event => {
                    var selected_list = document.getElementsByClassName('selected_tab')[0];
                    selected_list.classList.remove('selected_tab');
                    item.classList.add('selected_tab');
                    document.getElementById('column_one').innerHTML = '';
                    document.getElementById('column_two').innerHTML = '';
                    document.getElementById('column_three').innerHTML = '';
                    console.log(item.innerHTML);
                    setImageArray([]);
                    setOffset(0);
                    if(item.innerHTML === 'All') {
                        console.log(offset);
                        getImages(0);
                    } else {
                        console.log(offset);
                        getImagesByCategories(item.innerHTML,0);
                    }
                });
            });
        }).catch((err) => {
            console.log(err);
        });
        getImages(0);
    }, []);

    function getImages(inneroffset) {
        // console.log(offset);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`${props.backendurl}/getImages/1/${inneroffset}`, requestOptions).then(response => response.json()).then((result) => {
            // console.log(result);
            const windowWidth = window.innerWidth;
            for(var i=0;i<result.data.length;i++){
                image_array.push(`${props.backendurl}` + result.data[i].path);
                var node = document.createElement("IMG");
                node.setAttribute('src',`${props.backendurl}` + result.data[i].path);
                node.setAttribute('class','gallery_image');
                if(windowWidth <= 768){
                    if(i%2 === 0){
                        document.getElementById('column_one').appendChild(node);
                    } else {
                        document.getElementById('column_two').appendChild(node);
                    }
                } else {
                    if(i%3 === 0){
                        document.getElementById('column_one').appendChild(node);
                    } else if(i%3 === 1){
                        document.getElementById('column_two').appendChild(node);
                    } else if(i%3 === 2){
                        document.getElementById('column_three').appendChild(node);
                    }
                }
            }
            document.querySelectorAll('.gallery_image').forEach(item => {
                item.addEventListener('click', event => {
                    var path = item.getAttribute('src');
                    openImage(path);
                });
            });
            setImageArray(image_array);
        }).catch((err) => {
            console.log(err);
        });
    }

    function getImagesByCategories(category,inneroffset) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`${props.backendurl}/getImagesByCategories/${category}/${inneroffset}`, requestOptions).then(response => response.json()).then((result) => {
            // console.log(result);
            const windowWidth = window.innerWidth;
            for(var i=0;i<result.data.length;i++){
                image_array.push(`${props.backendurl}` + result.data[i].path);
                var node = document.createElement("IMG");
                node.setAttribute('src',`${props.backendurl}` + result.data[i].path);
                node.setAttribute('class','gallery_image');
                if(windowWidth <= 768){
                    if(i%2 === 0){
                        document.getElementById('column_one').appendChild(node);
                    } else {
                        document.getElementById('column_two').appendChild(node);
                    }
                } else {
                    if(i%3 === 0){
                        document.getElementById('column_one').appendChild(node);
                    } else if(i%3 === 1){
                        document.getElementById('column_two').appendChild(node);
                    } else if(i%3 === 2){
                        document.getElementById('column_three').appendChild(node);
                    }
                }
            }
            document.querySelectorAll('.gallery_image').forEach(item => {
                item.addEventListener('click', event => {
                    var path = item.getAttribute('src');
                    openImage(path);
                });
            });
            setImageArray(image_array);
        }).catch((err) => {
            console.log(err);
        });
    }

    function getMoreImages() {
        // console.log(image_array);
        offset = offset+20;
        setOffset(offset);
        // console.log(offset);
        var selected_list = document.getElementsByClassName('selected_tab')[0];
        if(selected_list.innerHTML === 'All'){
            getImages(offset);
        } else {
            getImagesByCategories(selected_list.innerHTML,offset);
        }
    }

    function openImage(path) {
        console.log(path);
        setPath(path);
        setactive(1);
        document.getElementById('imagemodal').setAttribute('class','imagemodal activeimagemodal');
    }

    function toggleModal() {
        if(active === 0){
            setactive(1);
            // document.getElementById('imagemodal').setAttribute('class','imagemodal activeimagemodal');
        } else {
            setactive(0);
            // document.getElementById('imagemodal').setAttribute('class','imagemodal');
        }
        document.getElementById('imagemodal').setAttribute('class','imagemodal');
    }

    return <div className='gallery container' onScroll={getMoreImages}>
        <div className="imagemodal" id="imagemodal" onClick={toggleModal}>
            <div className="close">
                <a onClick={toggleModal}><span className="iconify" data-icon="akar-icons:cross"></span></a>
            </div>
            <div className="row">
                {/* <div className="col-lg-1 col-md-1 col-sm-6 col-6 order-lg-1 order-md-1 order-sm-2 order-2">
                    <a><span className="iconify" data-icon="eva:arrow-ios-back-fill"></span></a>
                </div> */}
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 order-lg-2 order-md-2 order-sm-1 order-1">
                    <img src={openpath} alt='view_image'/>
                </div>
                {/* <div className="col-lg-1 col-md-1 col-sm-6 col-6 order-lg-3 order-md-3 order-sm-3 order-3">
                    <a><span className="iconify" data-icon="eva:arrow-ios-forward-outline"></span></a>
                </div> */}
            </div>
        </div>
        <br/><br/>
        <br/><br/>
        <div className='tabs' id='tabs'>
            { 
                props.selectedTab !== 'All' ?
                <a className='inner_tabs'>All</a> 
                : <a className='inner_tabs selected_tab'>All</a>
            }
        </div>
        <div className='row'>
            <div className="col-lg-4 col-md-4 col-sm-6 col-6" id="column_one">
            
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-6" id="column_two">

            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-6" id="column_three">

            </div>
        </div>
    </div>;
}

export default GalleryPage;