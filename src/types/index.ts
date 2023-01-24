import { Action, ThunkAction } from "@reduxjs/toolkit";
import { FieldNames } from "rc-cascader";
import { UserType } from "../enums/usertype.enum";
import { store } from "../store";

export interface LoginData {
  userName: string;
  password: string;
}

export interface CreateAccountData {
  salutation?: string;
  fullName?: string;
  address?: string;
  userName?: string;
  password?: string;
  userType?: number;
  longitude?: string;
  latitude?: string;
  hearAboutUs?: string;
  phoneNumber?: string;
  parentApprovalRequired?: boolean;
  image?: string;
}

export interface UserStatsResponse {
  activeUsers: number;
  inActiveUsers: number;
}

export interface User {
  id?: bigint;
  userName?: string;
  authToken?: string;
  refreshToken?: string;
  role?: string;
  userType?: number;
  salutation?: string;
  fullName?: string;
  address?: string;
  phoneNumber?: string;
  latitude?: string;
  longitude?: string;
  city?: { id?: number; title?: string; countryId?: number };
  country?: { id?: number; title?: string };
  availableCredits?: number;
  image?: string;
  paging?: Paging;
  hasErrors?: false;
  error?: string;
  children?: User[];
  parentId?: bigint;
  createdOn?: Date;
  isActive?: boolean;
}

export interface CategoryResponse {
  id: bigint;
  title: string;
}

export interface ImageType {
  fileName: string;
  isPrimary: boolean;
}

export interface CreateProductData {
  id?: bigint;
  title?: "string";
  subTitle?: "string";
  specification?: "string";
  description?: "string";
  quantity?: number;
  condition?: number;
  rate?: number;
  barterAllowed?: true;
  categoryId?: number;
  images?: ImageType[];
}

export interface CreateDealData {
  Id?: bigint;
  ProductId?: bigint;
  ProductQuantity?: number;
  BarterProductId?: bigint;
  BarterProductQuantity?: number;
  DealCredits?: number;
  DeliveryDate?: string;
  Comments?: string;
  DealAmountPaidBy?: string;
  Status?: number;
}

export interface DealConfirmationData {
  Id?: number;
  Rating?: number;
  Comments?: string;
}

export interface SearchData {
  Status: number;
  Category: number;
  Search: string;
}

export interface ContactUsData {
  Id: bigint;
  FullName: string;
  Email: string;
  Message: string;
}

// export interface Children extends User {
//   cityId: bigint;
//   countryId: bigint;
//   hearAboutUs: string;
//   parentId: bigint;
//   parentApprovalRequired: boolean;
//   image: string;
//   availableCredits: number;
// }

export interface ChildrenPage {
  result: [
    {
      id: 0;
      userType: 0;
      isActive: true;
      salutation: string;
      fullName: string;
      address: string;
      latitude: 0;
      longitude: 0;
      cityId: 0;
      countryId: 0;
      hearAboutUs: string;
      parentId: 0;
      parentApprovalRequired: true;
      image: string;
      availableCredits: 0;
    }
  ];
  paging: Paging;
  hasErrors: true;
  error: string;
}

// export interface CreateProfileData extends Omit<Profile, "id" | "userId"> {}

export interface Socials {
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  portfolio?: string;
  slack?: string;
  github?: string;
}

export interface Channel {
  site: keyof Socials;
  link: string;
}

export interface CommonState<T> {
  status: Status;
  entities: T[];
  error: string;
}

export interface ProductResponse extends CreateProductData {
  availableQuantity?: number;
  category?: {
    id: number;
    title: string;
  };
  approvedByParent?: boolean;
  approvedByAdmin?: boolean;
  status?: string;
  userId?: number;
  applicationUser?: User;
  likes?: bigint;
  productImage?: ProductImageResponse[];
  createdOn?: Date;
  userLike?: boolean;
  inUserWishList?: boolean;
}

export interface ProductImageResponse {
  id: number;
  fileName: string;
  isPrimary: boolean;
}

export interface DealProductResponse {
  id: bigint;
  title: string;
  subTitle: string;
  specification: string;
  categoryId: bigint;
  condition: number;
  userId: bigint;
  quantity: number;
  rate: number;
  productImage?: ProductImageResponse[];
}

export interface TransactionData {
  Credits?: number;
  AvailableCredits?: number;
  Operator?: string;
  FeceiverId?: bigint;
}

export interface TransactionRedeemData {
  Credits?: number;
  Comments?: string;
}

export interface TransactionUser {
  id: bigint;
  userType: number;
  fullName: string;
}

export interface TransactionResponse {
  id: bigint;
  credits: number;
  receiverId: bigint;
  receiver: TransactionUser;
  senderId: bigint;
  sender: TransactionUser;
  juniorDealPercentage: bigint;
  dealId: bigint;
  stripeTransactionId: string;
  createdOn: Date;
  deal: DealResponse;
}

export interface RedemptionResponse {
  id: bigint;
  credits: string;
  userId: string;
  applicationUser: User;
  createdOn: string;
  status: string;
  comments: string;
}

export interface DealResponse {
  id?: bigint;
  productId?: bigint;
  productQuantity?: number;
  barterProductId?: bigint;
  barterProductQuantity?: number;
  dealCredits?: number;
  deliveryDate?: string;
  comments?: string;
  product: DealProductResponse;
  productRate: number;
  barterProduct?: DealProductResponse;
  barterProductRate?: number;
  approvedBySeller: boolean;
  approvedBySellerParent: boolean;
  approvedByBuyerParent: boolean;
  approvedByAdmin: boolean;
  status: string;
  createdOn: Date;
  buyerConfirmation: boolean;
  buyerDeliveryDate?: string;
  sellerConfirmation: boolean;
  sellerDeliveryDate: string;
  dealAmountPaidBy: string;
  creditTransactionHistory: TransactionResponse[];
  buyerId: bigint;
  buyerParentId: bigint;
  sellerId?: bigint;
  sellerParentId?: bigint;
  buyerRating: number;
  buyerComments: string;
  sellerRating: number;
  sellerComments: string;
  seenBySeller: boolean;
  deliveryAddressBuyer: String;
}

export interface ConfigResponse {
  id: bigint;
  key: string;
  value: {};
}

export interface ChargesSetupResponse {
  JDPoints: number;
  Amount: number;
  Currency: string;
}

// export interface ProductCategoryResponse {
//   id?: bigint;
//   title?: string;
//   products?: ProductResponse[];
// }

export interface QuizCategoryResponse {
  id: bigint;
  title: string;
  description: string;
  quiz: QuizResponse[];
}

export interface QuizResponse {
  id: bigint;
  isActive: boolean;
  title: string;
  description: string;
  image: string;
  quizQuestion: QuizQuestionResponse[];
  numberOfAttempts: number;
}

export interface QuizQuestionResponse {
  id?: bigint;
  question?: string;
  type?: string;
  choices?: string;
  answer?: string;
  order?: number;
  points?: number;
}

export interface Country {
  result: [
    {
      id: 0;
      title: string;
      countryId: 0;
    }
  ];
  paging: Paging;
  hasErrors: true;
  error: string;
}

export interface City {
  result: [
    {
      id: 0;
      title: string;
    }
  ];
  paging: Paging;
  hasErrors: true;
  error: string;
}

export interface Paging {
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  sortDirection?: string;
  orderBy?: string;
}

export interface ProductState {
  status: ProductStatus;
  error: string;
  // categories: ProductCategoryResponse[];
  products: ProductResponse[];
  latestproducts: ProductResponse[];
  recentproducts: ProductResponse[];
  wishListproducts: ProductResponse[];
  paging: Paging;
  approvedProductId: bigint;
  likedProductId: bigint;
  wishedProductId: bigint;
}

export interface DealState {
  status: DealStatus;
  error: string;
  parentDeals: DealResponse[];
  childDeals: DealResponse[];
}

export interface ConfigState {
  status: ConfigStatus;
  error: string;
  setups: {
    configs: ConfigResponse[];
    categories: CategoryResponse[];
    charges: ChargesSetupResponse;
  };
}

export interface TransactionState {
  status: TransactionStatus;
  error: string;
  transactions: TransactionResponse[];
  tranPaging: Paging;
  redemptions: RedemptionResponse[];
}

export interface CreateEmailNotifyData {
  UserId?: bigint;
  Subject?: string;
  Message?: string;
}

export interface CreateQuizData {
  id?: bigint;
  QuizCategoryId?: bigint;
  Title?: string;
  Description?: string;
  Image?: string;
  QuizQuestions?: QuizQuestionResponse[];
  NumberOfAttempts?: number;
}

type ProductStatus =
  | "idle"
  | "createProductPending"
  | "createProductResolved"
  | "createProductRejected"
  | "addLikesPending"
  | "addLikesResolved"
  | "addLikesRejected"
  | "addToWishListPending"
  | "addToWishListResolved"
  | "addToWishListRejected"
  | "fetchProductsForSellPending"
  | "fetchProductsForSellResolved"
  | "fetchProductsForSellRejected"
  | "fetchUserProductsPending"
  | "fetchUserProductsResolved"
  | "fetchUserProductsRejected"
  | "fetchAllProductsPending"
  | "fetchAllProductsResolved"
  | "fetchAllProductsRejected"
  | "fetchSingleProductResolved"
  | "fetchRecentlyViewedListPending"
  | "fetchRecentlyViewedListResolved"
  | "fetchRecentlyViewedListRejected"
  | "fetchAllProductsRejected"
  | "fetchProductsWishListPending"
  | "fetchProductsWishListResolved"
  | "fetchProductsWishListRejected"
  | "approveProductPending"
  | "approveProductResolved"
  | "approveProductRejected"
  | "rejectProductPending"
  | "rejectProductResolved"
  | "rejectProductRejected";

type DealStatus =
  | "idle"
  | "createDealPending"
  | "createDealResolved"
  | "createDealRejected"
  | "fetchUserDealsPending"
  | "fetchUserDealsResolved"
  | "fetchUserDealsRejected"
  | "fetchUserDealByIDPending"
  | "fetchUserDealByIDResolved"
  | "fetchUserDealByIDRejected"
  | "fetchChildUserDealsPending"
  | "fetchChildUserDealsResolved"
  | "fetchChildUserDealsRejected"
  | "sendParentApprovalPending"
  | "sendParentApprovalResolved"
  | "sendParentApprovalRejected"
  | "markConfirmationPending"
  | "markConfirmationResolved"
  | "markConfirmationRejected"
  | "sendSellerApprovalPending"
  | "sendSellerApprovalResolved"
  | "sendSellerApprovalRejected";

type AdminStatus =
  | "idle"
  | "fetchAllUsersPending"
  | "fetchAllUsersResolved"
  | "fetchAllUsersRejected"
  | "fetchAllDealsPending"
  | "fetchUserStatsPending"
  | "fetchUserStatsResolved"
  | "fetchUserStatsRejected"
  | "fetchAllDealsPending"
  | "fetchAllDealsResolved"
  | "fetchAllDealsRejected"
  | "updateUserStatusPending"
  | "updateUserStatusResolved"
  | "updateUserStatusRejected"
  | "sendAdminDealStatusPending"
  | "sendAdminDealStatusResolved"
  | "sendAdminDealStatusRejected";

type QuizStatus =
  | "idle"
  | "fetchQuizCategoriesPending"
  | "fetchQuizCategoriesResolved"
  | "fetchUserQuizesPending"
  | "fetchUserQuizesResolved"
  | "fetchAllQuizesPending"
  | "fetchAllQuizesResolved"
  | "createQuizPending"
  | "createQuizResolved"
  | "createQuizRejected"
  | "approveQuizPending"
  | "approveQuizResolved"
  | "approveQuizRejected";

type Status =
  | "idle"
  | "loadCurrentUserPending"
  | "loadCurrentUserResolved"
  | "loadCurrentUserRejected"
  | "loadCurrentProfilePending"
  | "loadCurrentProfileResolved"
  | "loadCurrentProfileRejected"
  | "fetchChildrenProfilePending"
  | "fetchChildrenProfileResolved"
  | "fetchChildrenProfileRejected"
  | "loggedOutPending"
  | "loggedOut"
  | "loggedOutRejected"
  | "loggedIn"
  | "loggedInPending"
  | "loggedInRejected"
  | "activateAccountPending"
  | "activateAccountResolved"
  | "activateAccountRejected"
  | "userSignedUpPending"
  | "userSignedUp"
  | "userSignedUpRejected"
  | "userUpdatedPending"
  | "userUpdatedResolved"
  | "userUpdatedRejected"
  | "userProductRejected"
  | "userProductSuccessfullyUploaded"
  | "sendNotificationPending"
  | "sendNotificationResolved"
  | "sendNotificationRejected"
  | "forgetPasswordPending"
  | "forgetPasswordResolved"
  | "forgetPasswordRejected"
  | "resetPasswordPending"
  | "resetPasswordResolved"
  | "resetPasswordRejected"
  | "initPaymentIntentPending"
  | "initPaymentIntentResolved"
  | "initPaymentIntentRejected"
  | "confirmPaymentIntentPending"
  | "confirmPaymentIntentResolved"
  | "confirmPaymentIntentRejected"
  | "saveContactUsPending"
  | "saveContactUsResolved"
  | "saveContactUsRejected";

type ConfigStatus =
  | "idle"
  | "fetchChargesSetupPending"
  | "fetchChargesSetupResolved"
  | "fetchChargesSetupRejected"
  | "fetchCategoriesPending"
  | "fetchCategoriesResolved"
  | "fetchCategoriesRejected";

type TransactionStatus =
  | "idle"
  | "transferCreditsPending"
  | "transferCreditsResolved"
  | "transferCreditsRejected"
  | "redeemCreditsPending"
  | "redeemCreditsResolved"
  | "redeemCreditsRejected"
  | "approveRedemptionPending"
  | "approveRedemptionResolved"
  | "approveRedemptionRejected"
  | "rejectRedemptionPending"
  | "rejectRedemptionResolved"
  | "rejectRedemptionRejected"
  | "fetchAllTransactionsPending"
  | "fetchAllTransactionsResolved"
  | "fetchAllTransactionsRejected"
  | "fetchAllRedemptionsPending"
  | "fetchAllRedemptionsResolved"
  | "fetchAllRedemptionsRejected";

export interface AuthState {
  status: Status;
  isAuthenticated: boolean;
  error: string;
  user: User;
  paymentId: string;
}

export interface AdminState {
  status: AdminStatus;
  error: string;
  activeUsersCount: number;
  inActiveUsersCount: number;
  users: User[];
  deals: DealResponse[];
  usersPaging: Paging;
  dealsPaging: Paging;
  // quizCategories: QuizCategoryResponse[];
  // quizes: QuizResponse[];
}

export interface QuizState {
  status: QuizStatus;
  error: string;
  quizCategories: QuizCategoryResponse[];
  quizes: QuizResponse[];
}

export interface PaymentResponse {
  id: string;
  object: object;
  status: string;
  clientSecret: string;
}

export interface ErrorState {
  message: string | null;
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
