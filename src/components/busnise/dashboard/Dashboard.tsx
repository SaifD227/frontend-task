// "use client";
// import React, { useState, useEffect } from 'react';
// import { BASE_URL } from '../../../const/baseUrl'; 
// import { Button } from '@/components/ui/button';

// const Dashboard: React.FC = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     id: '',
//   });
//   const [users, setUsers] = useState<any[]>([]); // to store added users
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false); // For delete confirmation dialog
//   const [userToDelete, setUserToDelete] = useState<string | null>(null); // Store the user to be deleted

//   // Fetch users from the API when the component mounts
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/users`);
//         const data = await response.json();
//         setUsers(data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, []); // Empty dependency array to run only on mount

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   const handleEdit = (id: string) => {
//     console.log("Edit clicked for user ID:", id);
//     // Add edit functionality here (e.g., open a modal, populate the form with user data)
//   };

//   const handleDelete = (id: string) => {
//     setUserToDelete(id); // Set the user to be deleted
//     setShowDeleteDialog(true); // Show the confirmation dialog
//   };

//   const deleteUser = () => {
//     if (userToDelete) {
//       setUsers(users.filter(user => user.id !== userToDelete)); // Remove user by ID
//       console.log("Deleted user ID:", userToDelete);
//       setUserToDelete(null); // Reset the user to be deleted
//       setShowDeleteDialog(false); // Close the dialog
//     }
//   };

//   const cancelDelete = () => {
//     setShowDeleteDialog(false); // Close the dialog without deleting
//     setUserToDelete(null); // Reset the user to be deleted
//   };

//   const handleAdd = () => {
//     setUsers((prevUsers) => [...prevUsers, formData]); // Adding new data to the list
//     setFormData({ email: '', password: '', id: '' }); // Resetting form after adding
//     console.log("Add clicked", formData);
//   };

//   return (
//     <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
//       <h2 className="text-2xl font-semibold mb-4 text-center">Dashboard</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="flex items-center gap-4">
//           <div className="flex-1">
//             <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
//             <input
//               type="text"
//               id="id"
//               name="id"
//               value={formData.id}
//               onChange={handleChange}
//               className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="flex-1">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="flex-1">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="flex gap-2 mt-8">
//             <Button
//               type="button"
//               onClick={() => handleEdit(formData.id)}
//               className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             >
//               Edit
//             </Button>
//             <Button
//               type="button"
//               onClick={() => handleDelete(formData.id)}
//               className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
//             >
//               Delete
//             </Button>
//             <Button
//               type="button"
//               onClick={handleAdd}
//               className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
//             >
//               Add
//             </Button>
//           </div>
//         </div>
//       </form>

//       {/* Displaying added users */}
//       <div className="mt-8">
//         <h3 className="text-xl font-semibold">Added Users</h3>
//         <ul className="mt-4">
//           {users.map((user, index) => (
//             <li key={index} className="border-b py-2">
//               <p><strong>ID:</strong> {user.id}</p>
//               <p><strong>Email:</strong> {user.email}</p>
//               <div className="flex gap-2">
//                 <Button
//                   onClick={() => handleEdit(user.id)}
//                   className="bg-yellow-500 text-white py-1 px-2 rounded-lg"
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   onClick={() => handleDelete(user.id)}
//                   className="bg-red-500 text-white py-1 px-2 rounded-lg"
//                 >
//                   Delete
//                 </Button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Delete Confirmation Dialog */}
//       {showDeleteDialog && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this user?</h3>
//             <div className="flex gap-4">
//               <Button
//                 onClick={deleteUser}
//                 className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
//               >
//                 Delete
//               </Button>
//               <Button
//                 onClick={cancelDelete}
//                 className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;




"use client";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../const/baseUrl";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  email: string;
  password: string;
}

const Dashboard: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    id: "",
    email: "",
    password: "",
  });
  const [users, setUsers] = useState<User[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users`);
        const data = await response.json();
        setUsers(data || []); // safety check
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddOrUpdate = () => {
    if (!formData.id || !formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    if (isEditing && editUserId) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editUserId ? { ...formData } : user
        )
      );
      setIsEditing(false);
      setEditUserId(null);
      console.log("User updated:", formData);
    } else {
      setUsers((prevUsers) => [...prevUsers, { ...formData }]);
      console.log("New user added:", formData);
    }

    resetForm();
  };

  const handleEdit = (id: string) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setFormData({
        id: userToEdit.id || "",
        email: userToEdit.email || "",
        password: userToEdit.password || "",
      });
      setIsEditing(true);
      setEditUserId(id);
    }
  };

  const handleDelete = (id: string) => {
    setUserToDelete(id);
    setShowDeleteDialog(true);
  };

  const deleteUser = () => {
    if (userToDelete) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete));
      console.log("Deleted user ID:", userToDelete);
      setUserToDelete(null);
      setShowDeleteDialog(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setUserToDelete(null);
  };

  const resetForm = () => {
    setFormData({ id: "", email: "", password: "" });
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Dashboard</h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">
              ID
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isEditing}
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
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
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
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
        </div>
        <div className="flex gap-2 mt-6">
          <Button
            type="button"
            onClick={handleAddOrUpdate}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            {isEditing ? "Update User" : "Add User"}
          </Button>
        </div>
      </form>

      {/* Display users */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Users</h3>
        <ul className="mt-4 space-y-4">
          {users.map((user) => (
            <li key={user.id} className="border p-4 rounded-lg flex flex-col md:flex-row justify-between items-center">
              <div>
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <Button
                  onClick={() => handleEdit(user.id)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex gap-4">
              <Button
                onClick={deleteUser}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Delete
              </Button>
              <Button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
