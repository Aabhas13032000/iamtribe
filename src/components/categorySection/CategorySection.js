import React from 'react';
import CategoryCard from '../categoryCard/CategoryCard';
import './CategorySection.css';

function CategorySection(props) {

    // console.log(props.cat);

    return <div className='row'>
        {props.cat.map((category,index) => (
            <CategoryCard key={index} category={category} backendurl={props.backendurl}></CategoryCard>
        ))}
    </div>;
}

export default CategorySection;