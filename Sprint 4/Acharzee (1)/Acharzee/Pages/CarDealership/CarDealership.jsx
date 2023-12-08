import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const CarDealership = () => {
  const carDealerships = useLoaderData();
  const [searchQuery, setSearchQuery] = useState('');

  const handleCallBuy = (carId) => () => {
    const selectedCar = carDealerships.find((car) => car._id === carId);

    const order = {
      type: 'Car Purchase',
      order: selectedCar?.carName,
      amount: selectedCar?.price,
    };

    localStorage.setItem('order', JSON.stringify(order));

    window.location.href = '/payment';
  };

  const handleCallTest = (carId) => () => {
    const selectedCar = carDealerships.find((car) => car._id === carId);

    const amount = Math.floor(selectedCar?.price * 0.002) || 0;

    const order = {
      type: 'Car Test Drive',
      order: selectedCar?.carName,
      amount: amount.toString(),
      };

    localStorage.setItem('order', JSON.stringify(order));

    window.location.href = '/payment';
  };

  const filteredCarDealerships = carDealerships.filter((car) =>
    car.carName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8">
      <div className="mb-4">
        <label htmlFor="search" className="text-lg mr-2">
          Search:
        </label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded py-2 px-3"
          placeholder='car name'
        />
      </div>
      <p className='text-right'><small className='text-red-600'>Test drive will cost 0.2% of the car price</small></p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {filteredCarDealerships.map((car) => (
          <div key={car._id} className="card card-compact bg-base-100 shadow-xl">
            <figure>
              <img src={car.image} alt={car.carName} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{car.carName}</h2>
              <h3>Price: {car.price}</h3>
              <div className="card-actions justify-between">
                <a className="btn btn-primary" href={`/cars/${car._id}`}>
                  View
                </a>
                <button className="btn btn-primary" onClick={handleCallTest(car._id)}>
                  Order Test Drive
                </button>
                <button className="btn btn-primary" onClick={handleCallBuy(car._id)}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarDealership;
