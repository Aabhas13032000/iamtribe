import React from 'react';
import './TestimonialSection.css';

function TestimonialSection(props) {

    // console.log(props.testimonials);

    return <div className='row'>
        {props.testimonials.map((testimonial,index) => (
            <div className='col-lg-4 col-md-4 col-sm-12 col-12' key={index}>
                <div className='card'>
                    <div>
                        <h4>{testimonial.name}</h4>
                        <h5 dangerouslySetInnerHTML={{__html: testimonial.message}} />
                    </div>
                </div>
            </div>
        ))}
    </div>;
}

export default TestimonialSection;