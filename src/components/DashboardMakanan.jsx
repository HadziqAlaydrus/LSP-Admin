import React, { useState, useEffect } from 'react';

const DashboardMakanan = () => {
  const [makananUtama, setMakananUtama] = useState([]);
  const [newMakanan, setNewMakanan] = useState({
    nama_makanan: '',
    harga_makanan: '',
    stock_makanan: '',
    image: ''
  });
  const [updateMakanan, setUpdateMakanan] = useState({
    id: '',
    nama_makanan: '',
    harga_makanan: '',
    stock_makanan: '',
    image: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch makanan utama from backend
  const fetchMakananUtama = () => {
    setLoading(true);
    fetch('http://localhost:3000/api/menu/makanan_utama')
      .then((response) => response.json())
      .then((data) => {
        setMakananUtama(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching makanan utama.');
        console.error('Error fetching makanan utama:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMakananUtama();
  }, []);

  // Add new makanan
  const addMakanan = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/admin/add-makanan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMakanan)
    })
      .then((response) => response.json())
      .then(() => {
        fetchMakananUtama();
        setNewMakanan({ nama_makanan: '', harga_makanan: '', stock_makanan: '', image: '' });
      })
      .catch((error) => {
        setError('Error adding makanan.');
        console.error('Error adding makanan:', error);
      });
  };

  // Update existing makanan
  const updateExistingMakanan = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/admin/update-makanan/${updateMakanan.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateMakanan)
    })
      .then((response) => response.json())
      .then(() => {
        fetchMakananUtama();
        setUpdateMakanan({ id: '', nama_makanan: '', harga_makanan: '', stock_makanan: '', image: '' });
      })
      .catch((error) => {
        setError('Error updating makanan.');
        console.error('Error updating makanan:', error);
      });
  };

  // Delete makanan
  const deleteMakanan = (id) => {
    fetch(`http://localhost:3000/api/admin/delete-makanan/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => fetchMakananUtama())
      .catch((error) => {
        setError('Error deleting makanan.');
        console.error('Error deleting makanan:', error);
      });
  };

  // Handle selection for updating
  const handleSelectUpdate = (makanan) => {
    setUpdateMakanan({
      id: makanan.id,
      nama_makanan: makanan.nama_makanan,
      harga_makanan: makanan.harga_makanan,
      stock_makanan: makanan.stock_makanan,
      image: makanan.image
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Dashboard Makanan Utama</h1>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-blue-500">Loading...</p>}

      {/* Add Makanan Form */}
      <form onSubmit={addMakanan} className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Makanan Utama</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nama Makanan"
            value={newMakanan.nama_makanan}
            onChange={(e) => setNewMakanan({ ...newMakanan, nama_makanan: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="number"
            placeholder="Harga Makanan"
            value={newMakanan.harga_makanan}
            onChange={(e) => setNewMakanan({ ...newMakanan, harga_makanan: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="number"
            placeholder="Stock Makanan"
            value={newMakanan.stock_makanan}
            onChange={(e) => setNewMakanan({ ...newMakanan, stock_makanan: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newMakanan.image}
            onChange={(e) => setNewMakanan({ ...newMakanan, image: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Add Makanan
        </button>
      </form>

      {/* Update Makanan Form */}
      <form onSubmit={updateExistingMakanan} className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Update Makanan Utama</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Makanan ID"
            value={updateMakanan.id}
            onChange={(e) => setUpdateMakanan({ ...updateMakanan, id: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="text"
            placeholder="Nama Makanan"
            value={updateMakanan.nama_makanan}
            onChange={(e) => setUpdateMakanan({ ...updateMakanan, nama_makanan: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="number"
            placeholder="Harga Makanan"
            value={updateMakanan.harga_makanan}
            onChange={(e) => setUpdateMakanan({ ...updateMakanan, harga_makanan: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="number"
            placeholder="New Stock"
            value={updateMakanan.stock_makanan}
            onChange={(e) => setUpdateMakanan({ ...updateMakanan, stock_makanan: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
          <input
            type="text"
            placeholder="New Image URL"
            value={updateMakanan.image}
            onChange={(e) => setUpdateMakanan({ ...updateMakanan, image: e.target.value })}
            className="border p-2 rounded-lg w-full"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
          Update Makanan
        </button>
      </form>

      {/* List of Makanan Utama */}
      <h2 className="text-2xl font-semibold mb-4">Makanan Utama List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {makananUtama.map((makanan) => (
          <div key={makanan.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold">{makanan.nama_makanan}</h3>
            <p>Harga: {makanan.harga_makanan}</p>
            <p>Stock: {makanan.stock_makanan}</p>
            <img src={makanan.image} alt={makanan.nama_makanan} className="w-full h-32 object-cover rounded-lg mt-2" />
            <button
              onClick={() => handleSelectUpdate(makanan)}
              className="mt-2 bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => deleteMakanan(makanan.id)}
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

export default DashboardMakanan;
