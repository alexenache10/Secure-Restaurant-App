import React, { useState } from "react";
import EditUserModal from "./EditUserModal";
import { useDeleteUser } from "@/api/MyUserApi";

interface User {
  email: string;
  name?: string;
  addressLine1?: string;
  city?: string;
  country?: string;
  money: string;
}

interface Props {
  users: User[];
}

const UserTable: React.FC<Props> = ({ users: initialUsers }) => {
  const [users, setUsers] = useState<User[]>(initialUsers); // Stare locală pentru utilizatori
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { deleteUser } = useDeleteUser();

  const handleDeleteUser = async (email: string) => {
    if (window.confirm(`Are you sure you want to delete ${email}?`)) {
      try {
        await deleteUser(email); // Apel API pentru ștergere
        setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email)); // Actualizează lista locală
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleSaveUser = (updatedUser: User) => {
    console.log("Saving user... (TBD)", updatedUser);
  };

  return (
    <div className="overflow-x-auto max-h-90">
      <table className="w-full table-auto bg-transparent">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-xs leading-normal">
            <th className="px-2 py-2">Email</th>
            <th className="px-2 py-2">Name</th>
            <th className="px-2 py-2">Address</th>
            <th className="px-2 py-2">City</th>
            <th className="px-2 py-2">Country</th>
            <th className="px-2 py-2">Money</th>
            <th className="px-2 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-sm font-medium">
          {users.map((user, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="px-2 py-2 whitespace-nowrap">{user.email}</td>
              <td className="px-2 py-2">{user.name || "N/A"}</td>
              <td className="px-2 py-2">{user.addressLine1 || "N/A"}</td>
              <td className="px-2 py-2">{user.city || "N/A"}</td>
              <td className="px-2 py-2">{user.country || "N/A"}</td>
              <td className="px-2 py-2">{user.money || "N/A"}</td>
              <td className="px-2 py-2">
                <button onClick={() => handleEditUser(user)} className="mr-2">
                  Edit
                </button>
                <button onClick={() => handleDeleteUser(user.email)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};

export default UserTable;
