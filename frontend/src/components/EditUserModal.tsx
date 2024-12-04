// EditUserModal.tsx
import React, { useState } from "react";

interface User {
  email: string;
  name?: string;
  addressLine1?: string;
  city?: string;
  country?: string;
  money: string;
}

interface Props {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

const EditUserModal: React.FC<Props> = ({ user, onClose, onSave }) => {
  const [updatedUser, setUpdatedUser] = useState<User>(user);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSave(updatedUser);
    setShowNotification(true); 
  };

  const handleCloseNotification = () => {
    setShowNotification(false); 
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
      <div className="z-10 w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email:</label>
            <input
              type="text"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
              disabled={true}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={updatedUser.name || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Address:</label>
            <input
              type="text"
              name="addressLine1"
              value={updatedUser.addressLine1 || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">City:</label>
            <input
              type="text"
              name="city"
              value={updatedUser.city || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Country:</label>
            <input
              type="text"
              name="country"
              value={updatedUser.country || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Money:</label>
            <input
              type="text"
              name="money"
              value={updatedUser.money || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
        {showNotification && (
          <div className="mt-4 bg-green-200 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> User updated successfully!</span>
            <button
              onClick={handleCloseNotification} 
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <svg
                className="fill-current h-6 w-6 text-green-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.354 5.646a.5.5 0 0 1 .708.708L10.707 10l4.354 4.354a.5.5 0 0 1-.708.708L10 10.707l-4.354 4.353a.5.5 0 1 1-.708-.708L9.293 10 4.94 5.646a.5.5 0 1 1 .708-.708L10 9.293l4.354-4.647z"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditUserModal;
