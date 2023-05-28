
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const getProductList = createAsyncThunk('getProductList', async () => {
    const response = await axios.get('/api/products');
    return response.data;
  });

  export const getProducDetails = createAsyncThunk('getProductDetails', async (id) => {
    const response = await axios.get(`/api/products/${id}`);
    return response.data;
  });

export const productSlice = createSlice({
    name: 'productSlice',
    initialState: {
      loading: false,
      error: null,
      products: []
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getProductList.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.products=[]
        })
        .addCase(getProductList.fulfilled, (state, action) => {
          state.loading = false;
          state.products = action.payload;
        })
        .addCase(getProductList.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });

  export const productDetailsSlice = createSlice({
    name: 'productSlice',
    initialState: {
      loading: false,
      error: null,
      product: {
        reviews:[]
      }
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getProducDetails.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.product={}
        })
        .addCase(getProducDetails.fulfilled, (state, action) => {
          state.loading = false;
          state.product = action.payload;
        })
        .addCase(getProducDetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });