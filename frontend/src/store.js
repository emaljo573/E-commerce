
import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slice/apiSlice'
import cartSliceReducer from './slice/cartSlice'
export default configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        cart:cartSliceReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})
