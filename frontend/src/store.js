
import { configureStore } from '@reduxjs/toolkit'
import {productSlice,productDetailsSlice} from './slice/productSlice'

export default configureStore({
    reducer:{
        productList:productSlice.reducer,
        productDetails:productDetailsSlice.reducer
    },
    devTools: process.env.NODE_ENV !== 'production',
})
