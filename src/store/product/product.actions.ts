import { createAsyncThunk } from '@reduxjs/toolkit'
import Apiconfig from '../../config/Apiconfig'
import {
  CreateProductData,
  ProductCategoryResponse,
  ProductResponse,
  User,
} from '../../types'
import http from '../../util/http'

export const createProduct = createAsyncThunk(
  'product/add',
  async (values: any, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.product.createProduct

      let product: CreateProductData = {}

      product = JSON.parse(JSON.stringify(values))

      if (values.barter === '1') {
        product.barterAllowed = true
      }

      product.images = []
      if (values.productImages) {
        for (
          let index = 0;
          index < values.productImages['fileList'].length;
          index++
        ) {
          product.images.push({
            fileName: values.productImages['fileList'][index].response.result,
            isPrimary: false,
          })
        }
      }

      const {
        data: { result },
      } = await http.post<{ result: ProductResponse }>(url, product)
      return result
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err)
    }
  },
)

export const updateProduct = createAsyncThunk(
  'product/update',
  async (values: any, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.product.updateProduct}/${values.id}`

      let product: CreateProductData = {}

      product = JSON.parse(JSON.stringify(values))

      if (values.barter === '1') {
        product.barterAllowed = true
      }

      product.images = []
      if (values.productImages) {
        for (
          let index = 0;
          index < values.productImages['fileList'].length;
          index++
        ) {
          product.images.push({
            fileName: values.productImages['fileList'][index].response.result,
            isPrimary: false,
          })
        }
      }

      const {
        data: { result },
      } = await http.put<{ result: ProductResponse }>(url, product)
      return result
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err)
    }
  },
)

export const addLikes = createAsyncThunk(
  'product/addLikes',
  async (id: bigint, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.product.addLikes}/${id}`

      const {
        data: { result },
      } = await http.put<{ result: boolean }>(url)
      return result
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err)
    }
  },
)

export const addToWishList = createAsyncThunk(
  'product/addToWishList',
  async (id: bigint, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.product.addToWishList}/${id}`

      const {
        data: { result },
      } = await http.put<{ result: boolean }>(url)
      return result
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err)
    }
  },
)

export const fetchProductsForSell = createAsyncThunk(
  'product/fetchProductsForSell',
  async (values: any, thunkAPI) => {
    try {
      let url = Apiconfig.endpoints.product.fetchProductsForSell

      if (values) {
        let category = 0
        if (values.Category) {
          category = values.Category
        }
        url += `?category=${category}`
        if (values.Search && values.Search.length > 0) {
          url += `&search=${values.Search}`
        }
      }

      const {
        data: { result },
      } = await http.get<{ result: ProductCategoryResponse[] }>(url)
      return result
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  },
)

export const fetchProductsWishList = createAsyncThunk(
  'product/fetchProductsWishList',
  async (_, thunkAPI) => {
    try {
      let url = Apiconfig.endpoints.product.fetchProductsWishList

      const {
        data: { result },
      } = await http.get<{ result: ProductResponse[] }>(url)
      return result
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  },
)

export const fetchUserProducts = createAsyncThunk(
  'product/fetchUserProducts',
  async (_, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.product.fetchUserProducts
      const {
        data: { result },
      } = await http.get<{ result: ProductResponse[] }>(url)
      return result
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  },
)

export const fetchAllProducts = createAsyncThunk(
  'product/fetchAllProducts',
  async (values: any, thunkAPI) => {
    try {
      let url = Apiconfig.endpoints.product.fetchAllProducts

      if (values) {
        let status = 0
        if (values.status) {
          status = values.status
        }
        url += `?status=${status}`
        if (values.Search && values.Search.length > 0) {
          url += `&search=${values.Search}`
        }
      }

      const {
        data: { result },
      } = await http.get<{ result: ProductResponse[] }>(url)
      return result
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  },
)

export const fetchRecentlyViewedList = createAsyncThunk(
  'product/fetchRecentlyViewedList',
  async (_, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.product.fetchRecentlyViewedList
      const {
        data: { result },
      } = await http.get<{ result: ProductResponse[] }>(url)
      return result
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  },
)

export const userAttachToProduct = createAsyncThunk(
  'product/userAttachToProduct',
  async (id: string, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.product.userAttachToProduct

      // const {
      //   data: { result },
      // } = await http.put<{ result: boolean }>(url);
      // return result;

      return true
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err)
    }
  },
)

export const approveProduct = createAsyncThunk(
  'product/approveProduct',
  async (id: bigint, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.product.approveProduct}/${id}`

      const {
        data: { result },
      } = await http.put<{ result: boolean }>(url)
      return result
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err)
    }
  },
)
