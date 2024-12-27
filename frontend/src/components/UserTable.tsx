import React, { useState } from "react";
import EditUserModal from "./EditUserModal";
import { useDeleteUser, useAdminUpdateUser } from "@/api/MyUserApi";
import { toast } from "sonner";

interface User {
  email: string;
  name?: string;
  addressLine1?: string;
  city?: string;
  country?: string;
  money: number;
}

interface Props {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserTable: React.FC<Props> = ({ users, setUsers }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { deleteUser } = useDeleteUser();
  const { updateAdminUser } = useAdminUpdateUser();

  const handleDeleteUser = async (email: string) => {
    if (window.confirm(`Are you sure you want to delete ${email}?`)) {
      try {
        await deleteUser(email);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.email !== email)
        );
        toast.success("User deleted successfully!");
      } catch (error) {
        console.error("Failed to delete user:", error);
        toast.error("Could not delete user!");
      }
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleSaveUser = async (updatedUser: User) => {
    try {
      await updateAdminUser({
        formData: {
          name: updatedUser.name || "",
          addressLine1: updatedUser.addressLine1 || "",
          city: updatedUser.city || "",
          country: updatedUser.country || "",
          money: updatedUser.money || 0,
        },
        email: updatedUser.email,
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === updatedUser.email ? updatedUser : user
        )
      );
      toast.success("User updated successfully!");
      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Could not update user!");
    }
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
              <td className="px-2 py-2">{Number(user.money).toFixed(2) || "N/A"}</td>
              <td className="px-2 py-2">
                <button
                  onClick={() => handleEditUser(user)}
                  className="mr-2 text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.email)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
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
