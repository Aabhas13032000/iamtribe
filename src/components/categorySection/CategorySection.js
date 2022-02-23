import React from 'react';
import CategoryCard from '../categoryCard/CategoryCard';
import './CategorySection.css';

function CategorySection(props) {

    // console.log(props.cat);

    function updateValue(value) {
        props.onclickchange(value);
    }

    return <div className='row'>
        {props.cat.map((category,index) => (
            <CategoryCard onclickupdate={updateValue} key={index} category={category} backendurl={props.backendurl}></CategoryCard>
        ))}
    </div>;
}

export default CategorySection;