
import { useMutation, useQuery } from "react-query";
import {toast} from "sonner";
import {User} from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;




export const useGetMyUserClassic = () => {
  const getMyUserRequest = async (): Promise<User> => {
    const email = localStorage.getItem('userEmail');

    if (!email) {
      throw new Error('Email not found in localStorage');
    }

    const response = await fetch(`${API_BASE_URL}/api/my/user/classic?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery('fetchCurrentUser', getMyUserRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isLoading };
};





type UpdateMyUserRequest = {
    name: string;
    addressLine1: string;
    city: string;
    country: string;
}


export const useUpdateClassicUser = () => {
  const updateClassicUserRequest = async (formData: UpdateMyUserRequest) => {
    try {
      const email = localStorage.getItem("userEmail");
    
      if (!email) {
        throw new Error("User email not found in localStorage");
      }

      const updatedFormData = { ...formData, email };

      const response = await fetch(`${API_BASE_URL}/api/my/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        console.error("Failed to update user. Server response:", response);
        throw new Error("Failed to update user");
      }

      return response.json();
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const {
    mutateAsync: updateClassicUser,
    isLoading: classicLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateClassicUserRequest);

  if (isSuccess) {
    toast.success("User profile updated!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateClassicUser, classicLoading };
};


  export const useClassicRegister = () => {
    const registerRequest = async (userData: any) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/my/user/register`, { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
    
        if (!response.ok) {
          toast.error("Oops.. couldn't register the account!");
          throw new Error("Failed to register user");
        }

        toast.success("User profile registered! You can login now.");
        
      } catch (error) {
        console.error("Error registering user:", error);
        throw error;
      }
    };
  
    const { mutateAsync: register, isLoading } = useMutation(registerRequest);
  
    return { register, isLoading };
  };
  

  export const getAllUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/my/user/data`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      return data.users || []; 
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };
  const useClassicLogin = () => {  
    const loginRequest = async (userData: any) => {
      const { email } = userData;
      
      try {
        const response = await fetch(`${API_BASE_URL}/api/my/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
    
        if (!response.ok) {
          toast.error("Oops.. error logging in!");
          throw new Error("Failed to login user");
        }
    
        console.log("User logged in!");
        const data = await response.json();
        localStorage.setItem("userEmail", email);
        const { accountType } = data;

        localStorage.setItem("type", accountType);
        
    
        return data.token; 
      } catch (error) {
        console.error("Error logging in:", error);
        throw error;
      }
    };
    
  
    const { mutateAsync: login, isLoading } = useMutation(loginRequest);
  
    return { login, isLoading };
  };
  
  export default useClassicLogin;


  export const useDeleteUser = () => {
    const deleteUserRequest = async (email: string) => {
      const response = await fetch(`${API_BASE_URL}/api/my/user/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
    };
  
    const { mutateAsync: deleteUser, isLoading } = useMutation(deleteUserRequest);
  
    return { deleteUser, isLoading };
  };
  