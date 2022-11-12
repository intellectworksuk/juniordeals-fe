import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../../util/notifications";
import * as ProductService from "../../../store/product/product.actions";
import { ProductCategoryResponse, ProductResponse } from "../../../types";
import Apiconfig from "../../../config/Apiconfig";
import * as routes from "../../../constants/routes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProductDiv } from "../../Components/ProductDiv";
import {
  clearProductStateError,
  clearProductStateStatus,
} from "../../../store/product/product.slice";
import { store } from "../../../store";
import { Carousel, Image } from "antd";
import noImageIcon from "../../assets/img/jd-icon.png";
import useEffectOnce from "../../../hooks/useEffectOnce";

export const ProductLatestList = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useAppDispatch();

  const { latestproducts: products, status: prodStatus } = useAppSelector(
    (state) => state.product
  );

  const { user } = useAppSelector((state) => state.auth);

  useEffectOnce(() => {
    dispatch(ProductService.fetchLatestProducts({ status: 2 }));
  });

  return (
    <>
      <div className="sec-product-latest">
        <div className="freeHeadCenter">
          <h2>
            Latest Products
            <br />
            <small>Make your day, find the best deal.</small>
          </h2>
        </div>
        <Carousel autoplay>
          <div className="freeHeaderCenter">
            {/* {categories &&
            categories.map((cateogry: ProductCategoryResponse) =>
              cateogry?. */}
            {products &&
              products
                .filter((p) => p.availableQuantity! > 0)
                .filter(
                  (p) => user.userName === undefined || p.userId !== user.id
                )
                ?.sort((a, b) => Number(b.id!) - Number(a.id!))
                ?.slice(0, 4)
                .map((product) => (
                  <div className="basicDiv" key={Math.random()}>
                    <Link
                      to={routes.FETCH_PRODUCT_DETAIL}
                      state={{ product: product }}
                    >
                      <div className="itemImage">
                        {product.productImage &&
                        product.productImage.length > 0 ? (
                          <img
                            alt={noImageIcon}
                            style={{ width: "100%", height: 187 }}
                            src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${product.productImage[0].fileName}&type=product`}
                          />
                        ) : (
                          <img alt="" src={noImageIcon} />
                        )}
                      </div>
                    </Link>
                    <div className="itemInfo">
                      <h4>{product.title}</h4>
                      <p className="targetPrice" style={{ float: "right" }}>
                        Points: {product.rate}
                      </p>
                      <br />
                      <hr />
                      <p>
                        {product.description?.substring(0, 32)}
                        {product.description &&
                          product.description?.length > 32 &&
                          "..."}
                      </p>
                    </div>
                    <div className="selectKey">
                      {user.userName && product.barterAllowed && (
                        <button
                          type="button"
                          className="border-left"
                          style={{ width: "100%" }}
                          onClick={() =>
                            navigate(routes.FETCH_PRODUCT_BARTER, {
                              state: {
                                product: product,
                                chatUserType: "buyer",
                              },
                            })
                          }
                        >
                          Barter
                        </button>
                      )}
                      {user.userName && (
                        <button
                          type="button"
                          style={{ width: "100%" }}
                          onClick={() =>
                            navigate(routes.TO_CHAT, {
                              state: {
                                product: product,
                                chatUserType: "buyer",
                              },
                            })
                          }
                        >
                          Buy
                        </button>
                      )}
                    </div>
                  </div>
                ))}
          </div>
          {products.length > 4 && (
            <div className="freeHeaderCenter">
              {/* {categories &&
            categories.map((cateogry: ProductCategoryResponse) =>
              cateogry?. */}
              {products &&
                products
                  .filter((p) => p.availableQuantity! > 0)
                  .filter(
                    (p) => user.userName === undefined || p.userId !== user.id
                  )
                  ?.sort((a, b) => Number(b.id!) - Number(a.id!))
                  ?.slice(4, 8)
                  .map((product) => (
                    <div className="basicDiv" key={Math.random()}>
                      <Link
                        to={routes.FETCH_PRODUCT_DETAIL}
                        state={{ product: product }}
                      >
                        <div className="itemImage">
                          {product.productImage &&
                          product.productImage.length > 0 ? (
                            <img
                              alt={noImageIcon}
                              style={{ width: "100%", height: 187 }}
                              src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${product.productImage[0].fileName}&type=product`}
                            />
                          ) : (
                            // <img
                            //   src="https://cdn.dribbble.com/users/3794257/screenshots/14968829/media/51623ff71554bb312db41d1ebe277f9a.png?compress=1&resize=400x300&vertical=top"
                            //   alt=""
                            // />
                            <img alt="" src={noImageIcon} />
                          )}
                          {/* <div className="sellerInfomini">
                      <img
                        src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${product.applicationUser?.image}&type=user`}
                        alt="Seller"
                      />
                      <p>{product.applicationUser?.fullName}</p>
                    </div> */}
                        </div>
                      </Link>
                      <div className="itemInfo">
                        <h4>{product.title}</h4>
                        <p className="targetPrice" style={{ float: "right" }}>
                          Points: {product.rate}
                        </p>
                        <br />
                        <hr />
                        <p>
                          {product.description?.substring(0, 32)}
                          {product.description &&
                            product.description?.length > 32 &&
                            "..."}
                        </p>
                      </div>
                      <div className="selectKey">
                        {user.userName && product.barterAllowed && (
                          <button
                            type="button"
                            className="border-left"
                            style={{ width: "100%" }}
                            onClick={() =>
                              navigate(routes.FETCH_PRODUCT_BARTER, {
                                state: {
                                  product: product,
                                  chatUserType: "buyer",
                                },
                              })
                            }
                          >
                            Barter
                          </button>
                        )}
                        {user.userName && (
                          <button
                            type="button"
                            style={{ width: "100%" }}
                            onClick={() =>
                              navigate(routes.TO_CHAT, {
                                state: {
                                  product: product,
                                  chatUserType: "buyer",
                                },
                              })
                            }
                          >
                            Buy
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
            </div>
          )}
          {products.length > 8 && (
            <div className="freeHeaderCenter">
              {/* {categories &&
            categories.map((cateogry: ProductCategoryResponse) =>
              cateogry?. */}
              {products &&
                products
                  .filter((p) => p.availableQuantity! > 0)
                  .filter(
                    (p) => user.userName === undefined || p.userId !== user.id
                  )
                  ?.sort((a, b) => Number(b.id!) - Number(a.id!))
                  ?.slice(8, 12)
                  .map((product) => (
                    <div className="basicDiv" key={Math.random()}>
                      <Link
                        to={routes.FETCH_PRODUCT_DETAIL}
                        state={{ product: product }}
                      >
                        <div className="itemImage">
                          {product.productImage &&
                          product.productImage.length > 0 ? (
                            <img
                              alt={noImageIcon}
                              style={{ width: "100%", height: 187 }}
                              src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${product.productImage[0].fileName}&type=product`}
                            />
                          ) : (
                            // <img
                            //   src="https://cdn.dribbble.com/users/3794257/screenshots/14968829/media/51623ff71554bb312db41d1ebe277f9a.png?compress=1&resize=400x300&vertical=top"
                            //   alt=""
                            // />
                            <img alt="" src={noImageIcon} />
                          )}
                          {/* <div className="sellerInfomini">
                      <img
                        src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${product.applicationUser?.image}&type=user`}
                        alt="Seller"
                      />
                      <p>{product.applicationUser?.fullName}</p>
                    </div> */}
                        </div>
                      </Link>
                      <div className="itemInfo">
                        <h4>{product.title}</h4>
                        <p className="targetPrice" style={{ float: "right" }}>
                          Points: {product.rate}
                        </p>
                        <br />
                        <hr />
                        <p>
                          {product.description?.substring(0, 32)}
                          {product.description &&
                            product.description?.length > 32 &&
                            "..."}
                        </p>
                      </div>
                      <div className="selectKey">
                        {user.userName && product.barterAllowed && (
                          <button
                            type="button"
                            className="border-left"
                            style={{ width: "100%" }}
                            onClick={() =>
                              navigate(routes.FETCH_PRODUCT_BARTER, {
                                state: {
                                  product: product,
                                  chatUserType: "buyer",
                                },
                              })
                            }
                          >
                            Barter
                          </button>
                        )}
                        {user.userName && (
                          <button
                            type="button"
                            style={{ width: "100%" }}
                            onClick={() =>
                              navigate(routes.TO_CHAT, {
                                state: {
                                  product: product,
                                  chatUserType: "buyer",
                                },
                              })
                            }
                          >
                            Buy
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
            </div>
          )}
          {products.length > 12 && (
            <div className="freeHeaderCenter">
              {/* {categories &&
            categories.map((cateogry: ProductCategoryResponse) =>
              cateogry?. */}
              {products &&
                products
                  .filter((p) => p.availableQuantity! > 0)
                  .filter(
                    (p) => user.userName === undefined || p.userId !== user.id
                  )
                  ?.sort((a, b) => Number(b.id!) - Number(a.id!))
                  ?.slice(12, 16)
                  .map((product) => (
                    <div className="basicDiv" key={Math.random()}>
                      <Link
                        to={routes.FETCH_PRODUCT_DETAIL}
                        state={{ product: product }}
                      >
                        <div className="itemImage">
                          {product.productImage &&
                          product.productImage.length > 0 ? (
                            <img
                              alt={noImageIcon}
                              style={{ width: "100%", height: 187 }}
                              src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${product.productImage[0].fileName}&type=product`}
                            />
                          ) : (
                            // <img
                            //   src="https://cdn.dribbble.com/users/3794257/screenshots/14968829/media/51623ff71554bb312db41d1ebe277f9a.png?compress=1&resize=400x300&vertical=top"
                            //   alt=""
                            // />
                            <img alt="" src={noImageIcon} />
                          )}
                          {/* <div className="sellerInfomini">
                      <img
                        src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${product.applicationUser?.image}&type=user`}
                        alt="Seller"
                      />
                      <p>{product.applicationUser?.fullName}</p>
                    </div> */}
                        </div>
                      </Link>
                      <div className="itemInfo">
                        <h4>{product.title}</h4>
                        <p className="targetPrice" style={{ float: "right" }}>
                          Points: {product.rate}
                        </p>
                        <br />
                        <hr />
                        <p>
                          {product.description?.substring(0, 32)}
                          {product.description &&
                            product.description?.length > 32 &&
                            "..."}
                        </p>
                      </div>
                      <div className="selectKey">
                        {user.userName && product.barterAllowed && (
                          <button
                            type="button"
                            className="border-left"
                            style={{ width: "100%" }}
                            onClick={() =>
                              navigate(routes.FETCH_PRODUCT_BARTER, {
                                state: {
                                  product: product,
                                  chatUserType: "buyer",
                                },
                              })
                            }
                          >
                            Barter
                          </button>
                        )}
                        {user.userName && (
                          <button
                            type="button"
                            style={{ width: "100%" }}
                            onClick={() =>
                              navigate(routes.TO_CHAT, {
                                state: {
                                  product: product,
                                  chatUserType: "buyer",
                                },
                              })
                            }
                          >
                            Buy
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </Carousel>

        {/* <div className="freeHeadCenter">
          <button
            type="button"
            className="btn-round-sec"
            style={{ marginTop: "32px" }}
            onClick={() => navigate(routes.FETCH_STORE_PRODUCT)}
          >
            All Latest Products
          </button>
        </div> */}
      </div>
    </>
  );
};
