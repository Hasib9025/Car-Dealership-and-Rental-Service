import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Orders = () => {
    const orders = useLoaderData();
    
    return (
        <div className='mt-12 mb-6'>
            <h1 className='text-center fw-bold '>Orders</h1>
            <table className="table-auto w-full max-w-4xl mx-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Order ID</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Order Details</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">Card</th>
                        <th className="px-4 py-2">Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td className="border px-4 py-2">{order?._id}</td>
                            <td className="border px-4 py-2">{order?.type}</td>
                            <td className="border px-4 py-2">{order?.order}</td>
                            <td className="border px-4 py-2">{order?.amount}</td>
                            <td className="border px-4 py-2">{order?.cardInfo?.cardNumber || "Cash"}</td>
                            <td className="border px-4 py-2">{order?.payment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;