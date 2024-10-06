import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [appetizers, setAppetizers] = useState([]);
  const [newAppetizer, setNewAppetizer] = useState({
    nama_makanan: '',
    harga_makanan: '',
    stock_makanan: '',
    image: ''
  });
  const [updateAppetizer, setUpdateAppetizer] = useState({
    id: '',
    nama_makanan: '',
    harga_makanan: '',
    stock_makanan: '',
    image: ''
  });

  // Fetch all appetizers
  const fetchAppetizers = () => {
    fetch('http://localhost:3000/api/menu/appetizer')
      .then((response) => response.json())
      .then((data) => setAppetizers(data))
      .catch((error) => console.error('Error fetching appetizers:', error));
  };

  useEffect(() => {
    fetchAppetizers();
  }, []);

  // Add appetizer
  const addAppetizer = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/admin/add-appetizer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAppetizer)
    })
      .then((response) => response.json())
      .then(() => {
        fetchAppetizers();
        setNewAppetizer({ nama_makanan: '', harga_makanan: '', stock_makanan: '', image: '' });
      })
      .catch((error) => console.error('Error adding appetizer:', error));
  };

  // Update appetizer
  const updateExistingAppetizer = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/admin/update-appetizer/${updateAppetizer.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateAppetizer)
    })
      .then((response) => response.json())
      .then(() => {
        fetchAppetizers();
        setUpdateAppetizer({ id: '', nama_makanan: '', harga_makanan: '', stock_makanan: '', image: '' });
      })
      .catch((error) => console.error('Error updating appetizer:', error));
  };

  // Delete appetizer
  const deleteAppetizer = (id) => {
    fetch(`http://localhost:3000/api/admin/delete-appetizer/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => fetchAppetizers())
      .catch((error) => console.error('Error deleting appetizer:', error));
  };

  // Select appetizer to update
  const handleSelectUpdate = (appetizer) => {
    setUpdateAppetizer({
      id: appetizer.id,
      nama_makanan: appetizer.nama_makanan,
      harga_makanan: appetizer.harga_makanan,
      stock_makanan: appetizer.stock_makanan,
      image: appetizer.image
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Dashboard Appetizer</h1>

      {/* Add Appetizer Form */}
      <form onSubmit={addAppetizer} className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Appetizer</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nama Makanan"
            value={newAppetizer.nama_makanan}
            onChange={(e) => setNewAppetizer({ ...newAppetizer, nama_makanan: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="number"
            placeholder="Harga Makanan"
            value={newAppetizer.harga_makanan}
            onChange={(e) => setNewAppetizer({ ...newAppetizer, harga_makanan: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="number"
            placeholder="Stock Makanan"
            value={newAppetizer.stock_makanan}
            onChange={(e) => setNewAppetizer({ ...newAppetizer, stock_makanan: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newAppetizer.image}
            onChange={(e) => setNewAppetizer({ ...newAppetizer, image: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Add Appetizer
        </button>
      </form>

      {/* Update Appetizer Form */}
      <form onSubmit={updateExistingAppetizer} className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Update Appetizer</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Appetizer ID"
            value={updateAppetizer.id}
            onChange={(e) => setUpdateAppetizer({ ...updateAppetizer, id: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="text"
            placeholder="Nama Makanan"
            value={updateAppetizer.nama_makanan}
            onChange={(e) => setUpdateAppetizer({ ...updateAppetizer, nama_makanan: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="number"
            placeholder="Harga Makanan"
            value={updateAppetizer.harga_makanan}
            onChange={(e) => setUpdateAppetizer({ ...updateAppetizer, harga_makanan: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="number"
            placeholder="New Stock"
            value={updateAppetizer.stock_makanan}
            onChange={(e) => setUpdateAppetizer({ ...updateAppetizer, stock_makanan: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="text"
            placeholder="New Image URL"
            value={updateAppetizer.image}
            onChange={(e) => setUpdateAppetizer({ ...updateAppetizer, image: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
          Update Appetizer
        </button>
      </form>

      {/* List of Appetizers */}
      <h2 className="text-2xl font-semibold mb-4">Appetizer List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appetizers.map((appetizer) => (
          <div key={appetizer.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={appetizer.image} alt={appetizer.nama_makanan} className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-lg font-semibold">{appetizer.nama_makanan}</h3>
            <p className="text-gray-600">Price: Rp{appetizer.harga_makanan}</p>
            <p className="text-gray-600">Stock: {appetizer.stock_makanan}</p>
            <div className="mt-4">
              <button
                onClick={() => handleSelectUpdate(appetizer)}
                className="bg-yellow-500 text-white py-1 px-4 rounded-lg hover:bg-yellow-600 mr-2"
              >
                Select to Update
              </button>
              <button
                onClick={() => deleteAppetizer(appetizer.id)}
                className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
