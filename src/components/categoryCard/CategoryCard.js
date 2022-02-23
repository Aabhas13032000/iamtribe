import React from 'react';
import './CategoryCard.css';

function CategoryCard(props) {

    function updateCat(){
        props.onclickupdate(props.category.name);
    }

    return <div className='col-lg-4 col-md-4 col-sm-6 col-6 column'>
        <div className='card' onClick={updateCat}>
            <img src={props.backendurl + props.category.image} alt='server_image'/>
        </div>
        <div className='heading' onClick={updateCat}>
            <h5>{props.category.name}</h5>
        </div>
    </div>;
}

export default CategoryCard;