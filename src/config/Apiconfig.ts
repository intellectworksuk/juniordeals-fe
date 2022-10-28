import { config } from '../constants/env'

/**
 * Application wide configuration.
 * The object are nested on basis of redux store
 */
const Apiconfig = {
  env: process.env.NODE_ENV,
  baseURI: config.url.API_URL,
  sentryDSN: process.env.REACT_APP_SENTRY_DSN,
  endpoints: {
    auth: {
      login: '/auth/login',
      createAccount: '/auth/register',
      updateAccount: '/auth/editprofile',
      activateAccount: '/auth/activate',
      logout: '/auth/logout',
      profile: '/auth/profile',
      sendNotify: '/user/sendemail',
      forgotpassword: '/auth/forgotpassword',
      resetPassword: '/auth/resetpassword',
    },
    admin: {
      fetchAllUsers: '/user/getall',
      fetchUserStats: '/user/getstats',
      fetchAllDeals: '/deal/getall',
      sendAdminDealStatus: '/deal/admin/updatestatus',
      updateUserStatus: '/user/updateStatus',
    },
    profile: {
      fetchChildrenProfile: '/user/getchildren',
      createProfile: '/auth/editprofile',
    },
    file: {
      uploadFile: '/file/upload',
    },
    product: {
      createProduct: '/product/add',
      updateProduct: '/product/update',
      addLikes: '/product/likes/add',
      addToWishList: '/product/wishlist/add',
      userAttachToProduct: '/product/user/attach',
      approveProduct: '/product/approve',
      fetchProductsForSell: 'product/getstoreproducts',
      fetchProductsWishList: 'product/getWishlistProducts',
      fetchUserProducts: 'product/getMyProducts',
      fetchAllProducts: 'product/getall',
      fetchRecentlyViewedList: 'product/getRecentProducts',
    },
    deal: {
      createDeal: '/deal/create',
      fetchUserDeals: '/deal/getMyDeals',
      fetchUserDealByID: '/deal/details',
      fetchChildUserDeals: '/deal/getChildrenDeals',
      parrentApproval: '/deal/buyer/updatestatusbyparent',
      markConfirmation: '/deal/received',
      sellerApproval: '/deal/seller/updatestatus',
      dealComplete: '/deal/complete',
    },
    setup: {
      fetchChargesSetup: '/setup/get',
      fetchCategoryList: '/category/getall',
    },
    transaction: {
      addTransferTransaction: '/transaction/addTransferTransaction',
      fetchAllTransactions: '/transaction/getall',
      initPay: '/transaction/getPaymentIntent',
      updPay: '/transaction/addStripeTransaction',
    },
    quiz: {
      fetchQuizCategories: '/quiz/category/getall',
      fetchAllQuizes: '/quiz/getall',
      fetchUserQuizes: '/quiz/getmyquizzes',
      createQuiz: '/quiz/add',
      updateQuiz: '/quiz/update',
      approveQuiz: '/quiz',
    }
  },
}

export default Apiconfig
