import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Đọc baseURL từ môi trường
const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

// Fetch all users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page, limit }) => {
    const response = await axios.get(`${baseURL}/users`, {
      params: { page, limit },
    });
    return response.data;
  }
);

// Add a new user
export const addUser = createAsyncThunk(
  'users/addUser',
  async (newUser) => {
    const response = await axios.post(`${baseURL}/users`, newUser);
    return response.data;
  }
);

// Update an existing user
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, formData }) => {
    const response = await axios.put(`${baseURL}/users/${id}`, formData);
    return response.data;
  }
);

// Delete a user
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id) => {
    await axios.delete(`${baseURL}/users/${id}`);
    return id;
  }
);
