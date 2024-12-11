import axios from 'axios';
import { UserResponse, User, UserEntry } from '../types';

  // get all users
export const getUsers = async (): Promise<UserResponse[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`);
    return response.data;
  }

  // Add a new user
export const addUser = async (user: User): Promise<UserResponse> => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, user, {
    headers: {
      'Content-Type': 'application/json',
    },  
  });
  return response.data;
}
// Add updateCar function

export const updateUser = async (userEntry: UserEntry):

  Promise<UserResponse> => {
  const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${userEntry.id}`, userEntry.user, {
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return response.data;
}

// delete a user
export const deleteUser = async (id: string): Promise<UserResponse> =>  {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`);
      return response.data 
    }
    