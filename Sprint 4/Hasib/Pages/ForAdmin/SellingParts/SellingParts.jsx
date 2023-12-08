import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Modal from 'react-modal';

const SellingParts = () => {
  const ourCarParts = useLoaderData();
  const [selectedPart, setSelectedPart] = useState(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    item: '',
    price: 0,
    image: '',
  });

  const handleEdit = (part) => {
    setSelectedPart(part);
    setFormData({
      item: part.item,
      price: part.price,
      image: part.image,
    });
    openCreateModal();
  };

  const handleCreate = () => {
    setSelectedPart(null);
    setFormData({
      item: '',
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
      if (selectedPart) {
        // Update logic
        response = await fetch(`http://localhost:5000/carParts/${selectedPart._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Create logic
        response = await fetch('http://localhost:5000/carParts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }

      if (response.ok) {
        console.log(selectedPart ? 'Part Updated' : 'Part Created');
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

  const handleDelete = async (part) => {
    try {
      const response = await fetch(`http://localhost:5000/carParts/${part._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Deleted item with ID: ${part._id}`);
        // Reload the page after delete
        window.location.reload();
      } else {
        console.error('Error deleting car part:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Car Parts</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleCreate}
      >
        Create
      </button>
      <table className="w-full table-auto mt-8">
        <thead>
          <tr>
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ourCarParts.map((part) => (
            <tr key={part._id}>
              <td className="border px-4 py-2">{part.item}</td>
              <td className="border px-4 py-2">{part.price}</td>
              <td className="border px-4 py-2">
                <img src={part.image} alt={part.item} className="w-24 h-24 object-cover" />
              </td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(part)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(part)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Create/Edit Modal */}
      <Modal isOpen={isCreateModalOpen} onRequestClose={closeCreateModal}>
        <h2 className="text-2xl font-bold mb-4">
          {selectedPart ? 'Edit Part' : 'Create Part'}
        </h2>
        <form>
          <label className="block mb-2">
            Item:
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              value={formData.item}
              onChange={(e) => setFormData({ ...formData, item: e.target.value })}
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
            {selectedPart ? 'Update' : 'Create'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default SellingParts;
