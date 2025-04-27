"use client";
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../../const/baseUrl'; // Assuming the BASE_URL is defined in a separate file

const Dashboard: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    id: '',
  });
  const [users, setUsers] = useState<any[]>([]); // to store added users

  // Fetch users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to run only on mount

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleEdit = (id: string) => {
    console.log("Edit clicked for user ID:", id);
    // Add edit functionality here (e.g., open a modal, populate the form with user data)
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter(user => user.id !== id)); // Remove user by ID
    console.log("Delete clicked for user ID:", id);
  };

  const handleAdd = () => {
    setUsers((prevUsers) => [...prevUsers, formData]); // Adding new data to the list
    setFormData({ email: '', password: '', id: '' }); // Resetting form after adding
    console.log("Add clicked", formData);
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Dashboard</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex gap-2 mt-8">
            <button
              type="button"
              onClick={() => handleEdit(formData.id)}
              className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => handleDelete(formData.id)}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Add
            </button>
          </div>
        </div>
      </form>

      {/* Displaying added users */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Added Users</h3>
        <ul className="mt-4">
          {users.map((user, index) => (
            <li key={index} className="border-b py-2">
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
