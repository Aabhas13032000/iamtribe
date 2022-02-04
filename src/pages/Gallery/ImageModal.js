import React,{useEffect} from "react";
import './ImageModal.css';

function ImageModal(props) {

    useEffect(() => {
        console.log(props.show);
        if(props.show === 1){
            document.getElementById('imagemodal').setAttribute('className','imagemodal activeimagemodal');
        } else {
            document.getElementById('imagemodal').setAttribute('className','imagemodal');
        }
    }, []);

    if(props.show === 1){
        document.getElementById('imagemodal').setAttribute('className','imagemodal activeimagemodal');
    } else {
        document.getElementById('imagemodal').setAttribute('className','imagemodal');
    }

    return <div className="imagemodal" id="imagemodal">
        <div className="close">
            <a><span className="iconify" data-icon="akar-icons:cross"></span></a>
        </div>
        <div className="row">
            <div className="col-lg-1 col-md-1 col-sm-6 col-6 order-lg-1 order-md-1 order-sm-2 order-2">

            </div>
            <div className="col-lg-10 col-md-10 col-sm-12 col-12 order-lg-2 order-md-2 order-sm-1 order-1">
                <img src={props.path} />
            </div>
            <div className="col-lg-1 col-md-1 col-sm-6 col-6 order-lg-3 order-md-3 order-sm-3 order-3">

            </div>
        </div>
    </div>;
}

export default ImageModal; 