
import { useMutation, useQuery } from "react-query";
import {toast} from "sonner";
import {User} from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



const getAuthHeaders = () => {
  const token = localStorage.getItem("jwtToken");
  return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const useGetMyUserClassic = () => {
  const getMyUserRequest = async (): Promise<User> => {
      const email = localStorage.getItem("userEmail");
      if (!email) {
          throw new Error("Email not found in localStorage");
      }

      const response = await fetch(`${API_BASE_URL}/api/my/user/classic?email=${encodeURIComponent(email)}`, {
          method: "GET",
          headers: getAuthHeaders(),
      });

      if (!response.ok) {
          throw new Error("Failed to fetch user");
      }

      return response.json();
  };

  const { data: currentUser, isLoading, error } = useQuery("fetchCurrentUser", getMyUserRequest);

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
    money: number;
}

export const useUpdateClassicUser = () => {
  const updateClassicUserRequest = async (formData: UpdateMyUserRequest) => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      throw new Error("User email not found in localStorage");
    }

    const updatedFormData = { ...formData, email };

    const response = await fetch(`${API_BASE_URL}/api/my/user/update`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(updatedFormData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  };

  const { mutateAsync: updateClassicUser, isLoading: classicLoading, isSuccess, error, reset } = useMutation(updateClassicUserRequest);

  if (isSuccess) {
    toast.success("User profile updated!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateClassicUser, classicLoading };
};



export const useAdminUpdateUser = () => {
  const updateAdminUserRequest = async ({ formData, email }: { formData: UpdateMyUserRequest; email: string }) => {
    if (!email) {
      throw new Error("User email not provided!");
    }
    console.log(formData);
      const updatedFormData = { 
    ...formData, 
    email,
    money: formData.money ?? 0 
  };
      
    const response = await fetch(`${API_BASE_URL}/api/my/user/update`, { 
      method: "PUT",
      headers: getAuthHeaders(),
      
      body: JSON.stringify(updatedFormData),
    });

    if (!response.ok) {
      console.error("Failed to update user. Server response:", response);
      throw new Error("Failed to update user");
    }
    return response.json();
  };

  const {
    mutateAsync: updateAdminUser,
    isLoading: adminLoading,
  } = useMutation(updateAdminUserRequest);


  return { updateAdminUser, adminLoading };
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
      const response = await fetch(`${API_BASE_URL}/api/my/user/data`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
  
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
  
 // Cerere pentru autentificare și salvarea token-ului JWT
export const useClassicLogin = () => {
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

          const data = await response.json();

          localStorage.setItem("userEmail", email);
          localStorage.setItem("jwtToken", data.token); // Salvează JWT-ul
          localStorage.setItem("type", data.accountType);

          return data.token;
      } catch (error) {
          console.error("Error logging in:", error);
          throw error;
      }
  };

  const { mutateAsync: login, isLoading } = useMutation(loginRequest);

  return { login, isLoading };
};
export const useDeleteUser = () => {
  const deleteUserRequest = async (email: string) => {
    const response = await fetch(`${API_BASE_URL}/api/my/user/delete`, {
      method: "DELETE",
      headers: getAuthHeaders(),
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
  };

  const { mutateAsync: deleteUser, isLoading } = useMutation(deleteUserRequest);

  return { deleteUser, isLoading };
};