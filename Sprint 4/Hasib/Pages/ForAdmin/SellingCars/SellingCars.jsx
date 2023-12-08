import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import Modal from 'react-modal';

const SellingCars = () => {
  const [ourCars, setOurCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    carName: '',
    producingYear: 0,
    engineType: 0,
    capacity: 0,
    mileage: '',
    fuelType: [],
    colour: '',
    price: 0,
    image: '',
  });

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/sellingCars');
        if (response.ok) {
          const data = await response.json();
          setOurCars(data);
        } else {
          console.error('Error fetching selling cars:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (car) => {
    setSelectedCar(car);
    setFormData({
      carName: car.carName,
      producingYear: car.producingYear,
      engineType: car.engineType,
      capacity: car.capacity,
      mileage: car.mileage,
      fuelType: car.fuelType,
      colour: car.colour,
      price: car.price,
      image: car.image,
    });
    openCreateModal();
  };

  const handleCreate = () => {
    setSelectedCar(null);
    setFormData({
      carName: '',
      producingYear: 0,
      engineType: 0,
      capacity: 0,
      mileage: '',
      fuelType: [],
      colour: '',
      price: 0,
      image: '',
    });
    openCreateModal();
  };

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const handleCreateOrUpdate = async () => {
    try {
      let response;
      if (selectedCar) {
        // Update logic
        response = await fetch(`http://localhost:5000/sellingCars/${selectedCar._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Create logic
        response = await fetch('http://localhost:5000/sellingCars', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }

      if (response.ok) {
        console.log(selectedCar ? 'Car Updated' : 'Car Created');
        // Reload the page after create or update
        window.location.reload();
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Close the modal after the operation is complete
    closeCreateModal();
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Selling Cars</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleCreate}
      >
        Create
      </button>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ourCars.map((car) => (
          <div key={car._id} className="card card-compact bg-base-100 shadow-xl">
            <figure>
              <img src={car.image} alt={car.carName} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{car.carName}</h2>
              <h3>Price: {car.price}</h3>
              <ul>
                <li>Year: {car.producingYear}</li>
                <li>Engine Type: {car.engineType}</li>
                <li>Capacity: {car.capacity}</li>
                <li>Mileage: {car.mileage}</li>
                <li>Fuel Type: {car.fuelType.join(', ')}</li>
                <li>Colour: {car.colour}</li>
              </ul>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(car)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      <Modal isOpen={isCreateModalOpen} onRequestClose={closeCreateModal}>
        <h2 className="text-2xl font-bold mb-4">
          {selectedCar ? 'Edit Car' : 'Create Car'}
        </h2>
        <form>
          <label className="block mb-2">
            Car Name:
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              value={formData.carName}
              onChange={(e) => setFormData({ ...formData, carName: e.target.value })}
            />
          </label>
          <label className="block mb-2">
            Producing Year:
            <input
              className="border rounded w-full py-2 px-3"
              type="number"
              value={formData.producingYear}
              onChange={(e) => setFormData({ ...formData, producingYear: e.target.value })}
            />
          </label>
          <label className="block mb-2">
            Engine Type:
            <input
              className="border rounded w-full py-2 px-3"
              type="number"
              value={formData.engineType}
              onChange={(e) => setFormData({ ...formData, engineType: e.target.value })}
            />
          </label>
          <label className="block mb-2">
            Capacity:
            <input
              className="border rounded w-full py-2 px-3"
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            />
          </label>
          <label className="block mb-2">
            Mileage:
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              value={formData.mileage}
              onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
            />
          </label>
          <label className="block mb-2">
            Fuel Type:
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              value={formData.fuelType}
              onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
            />
          </label>
          <label className="block mb-2">
            Colour:
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              value={formData.colour}
              onChange={(e) =>setFormData({ ...formData, colour: e.target.value })}
              />
            </label>
            <label className="block mb-2">
              Price:
              <input
                className="border rounded w-full py-2 px-3"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </label>
            <label className="block mb-2">
              Image URL:
              <input
                className="border rounded w-full py-2 px-3"
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </label>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              type="button"
              onClick={handleCreateOrUpdate}
            >
              {selectedCar ? 'Update' : 'Create'}
            </button>
          </form>
        </Modal>
      </div>
    );
  };
  
  export default SellingCars;