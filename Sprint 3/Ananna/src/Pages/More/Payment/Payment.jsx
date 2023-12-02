import React from 'react';
import Swal from 'sweetalert2';

const Payment = () => {
    const handlePayment = () => {
        // Add your payment logic here
    
        // For demonstration purposes, show SweetAlert when payment is complete
        Swal.fire({
          icon: 'success',
          title: 'Payment Complete!',
          showConfirmButton: false,
          timer: 1500,
        });
      };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">Payment Options</h2>

        <div className="flex items-center mb-4">
          <input
            type="radio"
            name="paymentOption"
            className="radio radio-primary mr-2"
            checked
          />
          <label className="text-gray-700">Cash</label>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="radio"
            name="paymentOption"
            className="radio radio-primary mr-2"
            disabled
          />
          <label className="text-gray-500">Mobile Banking (Disabled)</label>
        </div>

        <div className="flex items-center">
          <input
            type="radio"
            name="paymentOption"
            className="radio radio-primary mr-2"
            disabled
          />
          <label className="text-gray-500">SSL Commerce (Disabled)</label>
        </div>

        <button
          className="bg-blue-500 text-white py-2 px-4 mt-6 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handlePayment}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
