import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const CarParts = () => {
  const carParts = useLoaderData();
  const [searchQuery, setSearchQuery] = useState('');

  const handleCallBuy = (carPartId) => () => {
    const selectedCarPart = carParts.find((carPart) => carPart._id === carPartId);

    const order = {
      type: 'carParts',
      order: selectedCarPart?.item,
      amount: selectedCarPart?.price,
    };

    localStorage.setItem('order', JSON.stringify(order));

    window.location.href = '/payment';
  };

  const filteredCarParts = carParts.filter((carPart) =>
    carPart.item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8">
      <div className="mb-4">
        <label htmlFor="search" className="text-lg font-bold mr-2">
          Search:
        </label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded py-2 px-3"
          placeholder='parts name'
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
        {filteredCarParts.map((carPart) => (
          <div key={carPart._id} className="card card-compact bg-base-100 shadow-xl">
            <figure>
              <img src={carPart.image} alt={carPart.item} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{carPart.item}</h2>
              <h3>Price: {carPart.price}</h3>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={handleCallBuy(carPart._id)}>
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

export default CarParts;
