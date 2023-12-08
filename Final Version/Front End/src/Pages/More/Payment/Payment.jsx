import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Payment = () => {
  const navigate = useNavigate();
  const [isCardInputVisible, setIsCardInputVisible] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const handlePayment = () => {
    const orderData = JSON.parse(localStorage.getItem('order'));
    let updatedOrderData;

    if (orderData) {
      if (isCardInputVisible) {
        updatedOrderData = {
          ...orderData,
          payment: 'Paid',
          cardInfo: cardInfo,
        };
      } else {
        updatedOrderData = {
          ...orderData,
          payment: 'Not Paid',
        };
      }

      fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrderData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Booking Complete!',
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      localStorage.removeItem('order');

      Swal.fire({
        icon: 'success',
        title: 'Payment Complete!',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/');
    }
  };

  const handlePaymentOptionChange = (event) => {
    setIsCardInputVisible(event.target.value === 'card');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">Payment Options</h2>

        <div className="flex items-center mb-4">
          <input
            type="radio"
            name="paymentOption"
            value="cash"
            className="radio radio-primary mr-2"
            checked={!isCardInputVisible}
            onChange={handlePaymentOptionChange}
          />
          <label className="text-gray-700">Cash</label>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="radio"
            name="paymentOption"
            value="mobile"
            className="radio radio-primary mr-2"
            disabled
            onChange={handlePaymentOptionChange}
          />
          <label className="text-gray-500">Mobile Banking (Disabled)</label>
        </div>

        <div className="flex items-center">
          <input
            type="radio"
            name="paymentOption"
            value="card"
            className="radio radio-primary mr-2"
            checked={isCardInputVisible}
            onChange={handlePaymentOptionChange}
          />
          <label className="text-gray-500">Visa/Mastercard</label>
        </div>

        {isCardInputVisible && (
          <div>
            <label className="block mt-4">
              Card Number:
              <input
                type="text"
                className="form-input mt-1 block w-full"
                value={cardInfo.cardNumber}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, cardNumber: e.target.value })
                }
              />
            </label>

            <label className="block mt-4">
              Expiration Date:
              <input
                type="text"
                className="form-input mt-1 block w-full"
                value={cardInfo.expirationDate}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, expirationDate: e.target.value })
                }
              />
            </label>

            <label className="block mt-4">
              CVV:
              <input
                type="text"
                className="form-input mt-1 block w-full"
                value={cardInfo.cvv}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, cvv: e.target.value })
                }
              />
            </label>
          </div>
        )}

        <button
          className="bg-blue-500 text-white py-2 px-4 mt-6 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handlePayment}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Payment;
