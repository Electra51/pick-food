import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';


const ServicesCard = ({ service }) => {
    const { name, img, price,description,_id } = service;
    return (
        <PhotoProvider>
        <div className="card card-compact w-80 bg-base-100 shadow-xl">
                <figure>
                <PhotoView src={img}>
                        <img src={img} alt="Shoes" />
                    </PhotoView></figure>
        <div className="card-body flex-grow-0">
                      <h2 className="card-title">{name }</h2>
                      <p className='text-xl font-semibold text-orange-600'>Price: $ {price}</p>
                      <div className='flex align-middle justify-items-center'>
                      <FaStar></FaStar>
                      <FaStar></FaStar>
                      <FaStar></FaStar>
                      <FaStar></FaStar>
                      <FaStar></FaStar>
                          <button>5</button></div>
                      {
                          description.length > 100 ? 
                              <p>{description.slice(0, 100) + '...'}</p>
                              : <p>{description }</p>
                      }
      
                    <div className="card-actions justify-end">
                    <Link to={`/services/${_id}`}><button className="btn btn-accent">View Detail</button></Link>
          
          </div>
        </div>
            </div>
            </PhotoProvider>
    );
};

export default ServicesCard;