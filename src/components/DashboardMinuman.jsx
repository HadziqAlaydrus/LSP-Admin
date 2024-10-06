import React, { useState, useEffect } from 'react';

const DashboardMinuman = () => {
  const [minuman, setMinuman] = useState([]);
  const [newMinuman, setNewMinuman] = useState({
    nama_minuman: '',
    harga_minuman: '',
    stock_minuman: '',
    image: ''
  });
  const [updateMinuman, setUpdateMinuman] = useState({
    id: '',
    nama_minuman: '',
    harga_minuman: '',
    stock_minuman: '',
    image: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch minuman from backend
  const fetchMinuman = () => {
    setLoading(true);
    fetch('http://localhost:3000/api/menu/minuman')
      .then((response) => response.json())
      .then((data) => {
        setMinuman(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching minuman.');
        console.error('Error fetching minuman:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMinuman();
  }, []);

  // Add new minuman
  const addMinuman = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/admin/add-minuman', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMinuman)
    })
      .then((response) => response.json())
      .then(() => {
        fetchMinuman();
        setNewMinuman({ nama_minuman: '', harga_minuman: '', stock_minuman: '', image: '' });
      })
      .catch((error) => {
        setError('Error adding minuman.');
        console.error('Error adding minuman:', error);
      });
  };

  // Update existing minuman
  const updateExistingMinuman = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/admin/update-minuman/${updateMinuman.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateMinuman)
    })
      .then((response) => response.json())
      .then(() => {
        fetchMinuman();
        setUpdateMinuman({ id: '', nama_minuman: '', harga_minuman: '', stock_minuman: '', image: '' });
      })
      .catch((error) => {
        setError('Error updating minuman.');
        console.error('Error updating minuman:', error);
      });
  };

  // Delete minuman
  const deleteMinuman = (id) => {
    fetch(`http://localhost:3000/api/admin/delete-minuman/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => fetchMinuman())
      .catch((error) => {
        setError('Error deleting minuman.');
        console.error('Error deleting minuman:', error);
      });
  };

  // Handle selection for updating
  const handleSelectUpdate = (minuman) => {
    setUpdateMinuman({
      id: minuman.id,
      nama_minuman: minuman.nama_minuman,
      harga_minuman: minuman.harga_minuman,
      stock_minuman: minuman.stock_minuman,
      image: minuman.image
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Dashboard Minuman</h1>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-blue-500">Loading...</p>}

      {/* Add Minuman Form */}
      <form onSubmit={addMinuman} className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Minuman</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nama Minuman"
            value={newMinuman.nama_minuman}
            onChange={(e) => setNewMinuman({ ...newMinuman, nama_minuman: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="number"
            placeholder="Harga Minuman"
            value={newMinuman.harga_minuman}
            onChange={(e) => setNewMinuman({ ...newMinuman, harga_minuman: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="number"
            placeholder="Stock Minuman"
            value={newMinuman.stock_minuman}
            onChange={(e) => setNewMinuman({ ...newMinuman, stock_minuman: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newMinuman.image}
            onChange={(e) => setNewMinuman({ ...newMinuman, image: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Add Minuman
        </button>
      </form>

      {/* Update Minuman Form */}
      <form onSubmit={updateExistingMinuman} className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Update Minuman</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Minuman ID"
            value={updateMinuman.id}
            onChange={(e) => setUpdateMinuman({ ...updateMinuman, id: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="text"
            placeholder="Nama Minuman"
            value={updateMinuman.nama_minuman}
            onChange={(e) => setUpdateMinuman({ ...updateMinuman, nama_minuman: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="number"
            placeholder="Harga Minuman"
            value={updateMinuman.harga_minuman}
            onChange={(e) => setUpdateMinuman({ ...updateMinuman, harga_minuman: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="number"
            placeholder="New Stock"
            value={updateMinuman.stock_minuman}
            onChange={(e) => setUpdateMinuman({ ...updateMinuman, stock_minuman: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="text"
            placeholder="New Image URL"
            value={updateMinuman.image}
            onChange={(e) => setUpdateMinuman({ ...updateMinuman, image: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
          Update Minuman
        </button>
      </form>

      {/* List of Minuman */}
      <h2 className="text-2xl font-semibold mb-4">Minuman List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {minuman.map((minuman) => (
          <div key={minuman.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold">{minuman.nama_minuman}</h3>
            <p>Harga: {minuman.harga_minuman}</p>
            <p>Stock: {minuman.stock_minuman}</p>
            <img src={minuman.image} alt={minuman.nama_minuman} className="w-full h-32 object-cover rounded-lg mt-2" />
            <button
              onClick={() => handleSelectUpdate(minuman)}
              className="mt-2 bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => deleteMinuman(minuman.id)}
              className="mt-2 bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardMinuman;
