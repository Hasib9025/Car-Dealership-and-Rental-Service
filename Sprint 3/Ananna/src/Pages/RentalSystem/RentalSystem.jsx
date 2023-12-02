import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";


const RentalSystem = () => {
    const destinations = useLoaderData();
    
    const [destination, setDestination] =  useState(null);
    const [car, setCar] =  useState(null);
    const [carObject, setCarObject] =  useState({});
    const [destinationObject, setDestinationObject] =  useState({});


    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('http://localhost:5000/cars')
            .then(res => res.json())
            .then(data => {
                setCars(data);
                setLoading(false);
            });
    }, [])

    const handleDestinationChange = (selectedDestination) => {
        setDestination(selectedDestination);
        const filteredDestinations = destinations.filter(
            (destination) => destination.name === selectedDestination
          );
          setDestinationObject(filteredDestinations[0])
    }
    const handleCarChange = (selectedCar) => {
        setCar(selectedCar);
        const filteredCars = cars.filter(
            (car) => car.type === selectedCar
          );
          setCarObject(filteredCars[0])
    }

    

    return (
        <div style={{ maxWidth: "1400px", margin: "50px auto", }}>
            <div className="navbar">
                <div className="navbar-start">
                    <p>Start from Dhaka</p>
                </div>
                
                <div className="navbar-end">
                        <select name="cars" id="cars" className="p-2" onChange={(e) => handleCarChange(e.target.value)}>
                            <option value="none">Choose a car</option>
                            {cars?.map((car) => (
                        <option key={car._id} value={car.type} >
                            {car.type}
                        </option>
                        ))}
                        </select>
                        
                        &ensp; &ensp; 

                        <select name="destinations" id="destinations" className="p-2" onChange={(e) => handleDestinationChange(e.target.value)}>
                        <option value="none">Choose your destination</option>
                        {destinations?.map((destination) => (
                        <option key={destination._id} value={destination.name} >
                            {destination.name}
                        </option>
                        ))}
                        </select>
                </div>
            </div>

            <div>
                <div className="hero bg-base-200">
                    <div className="hero-content flex-col lg:flex-row">
                        <img src={carObject?.imageLink} className="max-w-sm rounded-lg shadow-2xl" />
                        
                        <div className="text-left">
                            <h1 className="text-5xl font-bold">{carObject?.type}</h1>
                            <p className="pt-6">From Dhaka to - {destinationObject?.name}</p>
                            <p className="py-2">Distance: {destinationObject?.distance}</p>
                            <p className="pb-6">Cost: { (carObject?.type === "privateCar")? destinationObject?.cost?.privateCar : destinationObject?.cost?.minivan}</p>
                            <a className="btn btn-primary" href="/payment">Rent</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RentalSystem;