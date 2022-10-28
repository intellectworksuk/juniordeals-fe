import { createAsyncThunk } from '@reduxjs/toolkit'
import { onValue, ref } from 'firebase/database'
import Apiconfig from '../../config/Apiconfig'
import { LOGIN } from '../../constants/routes'
import {
  CreateAccountData,
  CreateEmailNotifyData,
  // CreateProfileData,
  // CreateAccountData,
  LoginData,
  PaymentResponse,
  TransactionResponse,
  // Profile,
  // ProfileResponse,
  User,
  // LoginResponse,
  // Profile,
  // User,
} from '../../types'
import http from '../../util/http'

export const createAccount = createAsyncThunk(
  'auth/createAccount',
  async (values: any, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.auth.createAccount

      let account: CreateAccountData = {}

      account.salutation = values.salutation
      account.fullName = values.fullName
      account.userName = values.userName
      account.password = values.password
      account.userType = values.userType
      account.address = values.address
      account.longitude = values.longitude
      account.latitude = values.latitude
      account.mobileNumber = values.mobileNumber
      account.parentApprovalRequired = true
      account.hearAboutUs = values.hearAboutUs
      if (values.image) {
        account.image = values.image
      }

      const {
        data: { result },
      } = await http.post<{ result: User }>(url, account)
      return result
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  },
)

export const updateAccount = createAsyncThunk(
  'auth/updateAccount',
  async (values: any, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.auth.updateAccount;

      let account: CreateAccountData = {}

      account.fullName = values.fullName
      account.address = values.address
      account.longitude = values.longitude
      account.latitude = values.latitude
      account.mobileNumber = values.mobileNumber

      if (values.image) {
        account.image = values.image
      }

      const {
        data: { result },
      } = await http.post<{ result: User }>(url, account)
      return result
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  },
)

export const activateAccount = createAsyncThunk(
  'auth/activate',
  async (values: { token: string; email: string }, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.auth.activateAccount

      const {
        data: { result },
      } = await http.post<{ result: {} }>(url, values)
      return result
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  },
)

export const logIn = createAsyncThunk(
  'auth/logIn',
  async ({ userName, password }: LoginData, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.auth.login
      const {
        data: { result },
      } = await http.post<{ result: User }>(url, {
        userName,
        password,
      })
      return result
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  },
)

export const logOut = createAsyncThunk('auth/logOut', async (_, thunkAPI) => {
  try {
    const url = Apiconfig.endpoints.auth.logout
    // await http.post(url);
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

// export const loadCurrentUser = createAsyncThunk(
//   'auth/loadCurrentUser',
//   async (_, thunkAPI) => {
//     try {
//       // const url = Apiconfig.endpoints.auth.profile;
//       // const {
//       //   data: { result },
//       // } = await http.get<{ result: User }>(url);

//       const result: User = JSON.parse(localStorage.getItem('user.auth')!)

//       if (!result) {
//         return thunkAPI.rejectWithValue(undefined)
//       }

//       return result
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err)
//     }
//   },
// )

export const loadCurrentProfile = createAsyncThunk(
  'auth/loadCurrentProfile',
  async (_, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.auth.profile
      const {
        data: { result },
      } = await http.get<{ result: User }>(url)
      return result
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  },
)

export const sendNotification = createAsyncThunk(
  'auth/sendNotification',
  async (values: any, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.auth.sendNotify}`

      let emailModal: CreateEmailNotifyData = {}
      emailModal.UserId = values.UserId
      emailModal.Subject =
        'JuniorDeals ==== Notifications ==== ' + values.ProductTitle
      emailModal.Message = values.Message

      const {
        data: { result },
      } = await http.post<{ result: boolean }>(url, emailModal)
      return result
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  },
)

export const forgetPassword = createAsyncThunk(
  'auth/forgetPassword',
  async (values: any, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.auth.forgotpassword}`

      const {
        data: { result },
      } = await http.post<{ result: boolean }>(url, values)
      return result
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  },
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (values: any, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.auth.resetPassword}`

      const {
        data: { result },
      } = await http.post<{ result: boolean }>(url, values)
      return result
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  },
)

export const fetchChildrenProfile = createAsyncThunk(
  'profile/fetchChildrenProfile',
  async (_, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.profile.fetchChildrenProfile}`
      const {
        data: { result },
      } = await http.get<{ result: User[] }>(url)
      return result
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  },
)

export const initPaymentIntent = createAsyncThunk(
  'user/initPaymentIntent',
  async (credits: number, thunkAPI) => {
    try {
      const url = `${Apiconfig.endpoints.transaction.initPay}?amount=${credits}`

      const {
        data: { result },
      } = await http.get<{ result: PaymentResponse }>(url)
      return result
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  },
)

export const confirmPaymentIntent = createAsyncThunk(
  'user/confirmPaymentIntent',
  async (values: any, thunkAPI) => {
    try {
      const url = Apiconfig.endpoints.transaction.updPay

      let transactionData = {
        StripeTransactionId: values.Id,
        Credits: values.Credits,
        ReceiverId: values.UserId,
      }

      const {
        data: { result },
      } = await http.post<{ result: TransactionResponse }>(url, transactionData)
      return result
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  },
)
