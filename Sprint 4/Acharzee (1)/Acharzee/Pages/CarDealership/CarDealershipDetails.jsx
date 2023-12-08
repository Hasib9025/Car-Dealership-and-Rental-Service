import React from 'react';
import { useLoaderData } from 'react-router-dom';

const CarDealershipDetails = () => {
  const carDetails = useLoaderData();

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <img src={carDetails?.image} className="max-w-sm rounded-lg shadow-2xl" />
            <div>
            <h1 className="text-5xl font-bold">{carDetails?.carName}</h1> <br/>
            <p>Year: {carDetails?.producingYear}</p>
            <p>Engine Type: {carDetails?.engineType}</p>
            <p>Capacity: {carDetails?.capacity}</p>
            <p>Mileage: {carDetails?.mileage}</p>
            <p>Fuel Type: {carDetails?.fuelType?.join(', ')}</p>
            <p>Colour: {carDetails?.colour}</p>
            <p>Price: {carDetails?.price}</p>
            </div>
        </div>
    </div>
    </div>
  );
};

export default CarDealershipDetails;
