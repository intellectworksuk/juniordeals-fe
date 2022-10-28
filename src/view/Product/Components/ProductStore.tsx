import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../../util/notifications";
import * as ProductService from "../../../store/product/product.actions";
import { ProductCategoryResponse, SearchData } from "../../../types";
import Apiconfig from "../../../config/Apiconfig";
import * as routes from "../../../constants/routes";
import { Link, useLocation } from "react-router-dom";
import { ProductDiv } from "../../Components/ProductDiv";
import { clearProductStateStatus } from "../../../store/product/product.slice";
import { useScrollToTop } from "../../../hooks/useScrollToTop";
import { Form, Spin } from "antd";
import useEffectOnce from "../../../hooks/useEffectOnce";
import * as ConfigService from "../../../store/config/config.actions";
import { ProductDivFlex } from "../../Components/ProductDivFlex";

// interface ProductStoreProps {
//   timeStamp: string;
// }

export const ProductStore = (/*props: ProductStoreProps*/) => {
  // console.log(props.timeStamp);

  const [form] = Form.useForm();

  const location = useLocation();

  const dispatch = useAppDispatch();

  const {
    status: productStatus,
    categories,
    wishListproducts,
  } = useAppSelector((state) => state.product);

  // const [productActiveTab, setProductActiveTab] = useState<string>("active");
  // const [barterActiveTab, setBbarterActiveTab] = useState<string>("active");

  const { setups } = useAppSelector((state) => state.config);
  const { user } = useAppSelector((state) => state.auth);

  const onFormSubmit = (formData: SearchData) => {
    dispatch(ProductService.fetchProductsForSell(formData));
  };

  // useEffect(() => {
  //   if (error) {
  //     displayErrorMessage(error);
  //   }
  // }, [dispatch, error]);

  useEffectOnce(() => {
    dispatch(ConfigService.fetchCategories());
    if (!!user.userName) {
      dispatch(ProductService.fetchProductsForSell(undefined));
      dispatch(ProductService.fetchProductsWishList());
    }
  });

  let productActiveTab = "active";
  let barterActiveTab = "";
  // useEffect(() => {
  if (location.state) {
    if (location.state["product"]) {
      // setProductActiveTab(location.state["product"]);
      // setBbarterActiveTab("");
      productActiveTab = location.state["product"];
      barterActiveTab = "";
    }
    if (location.state["barter"]) {
      // setBbarterActiveTab(location.state["barter"]);
      // setProductActiveTab("");
      barterActiveTab = location.state["barter"];
      productActiveTab = "";
    }
  } else {
    // setProductActiveTab("active");
    productActiveTab = "active";
  }
  // }, [productActiveTab, barterActiveTab]);

  useScrollToTop();

  return (
    <>
      <div className="sec-category-search">
        <Form form={form} onFinish={onFormSubmit} autoComplete="off">
          <div className="searchBlock">
            <div className="searchingHeader">
              <div className="container-fluid support-flex">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="sb-title">
                    <h3>SEARCH BY INTEREST</h3>
                    <p></p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="row">
                    <div className="col-lg-5 col-md-5 col-sm-5">
                      <Form.Item name="Search">
                        <input
                          maxLength={30}
                          type="search"
                          className="form-control input-sm my-search"
                        />
                      </Form.Item>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-5">
                      <Form.Item name="Category">
                        <select className="form-control input-sm">
                          <option value="0">Select Category</option>
                          {setups.categories.map((cat) => (
                            <option
                              value={cat.id.toString()}
                              key={cat.id.toString()}
                            >
                              {cat.title}
                            </option>
                          ))}
                        </select>
                      </Form.Item>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2">
                      <button
                        type="submit"
                        className="btn btn-block btn-sm btn-primary"
                        disabled={
                          productStatus === "fetchProductsForSellPending"
                        }
                      >
                        <span id="button-text">
                          {productStatus === "fetchProductsForSellPending" ? (
                            <Spin size="small" />
                          ) : (
                            <i className="mdi mdi-magnify"></i>
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
        <div className="inlineTabs">
          <ul className="nav nav-pills nav-justified" role="tablist">
            <li role="presentation" className={`${productActiveTab}`}>
              <a
                href="#sellitems"
                aria-controls="home"
                role="tab"
                data-toggle="tab"
              >
                Selling items
              </a>
            </li>
            <li role="presentation" className={`${barterActiveTab}`}>
              <a
                href="#barteritems"
                aria-controls="profile"
                role="tab"
                data-toggle="tab"
              >
                Barter items
              </a>
            </li>
            <li role="presentation">
              <a
                href="#wishlistitems"
                aria-controls="profile"
                role="tab"
                data-toggle="tab"
              >
                Wishlist
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              role="tabpanel"
              className={`tab-pane ${productActiveTab}`}
              id="sellitems"
            >
              <div className="itemized-gallery">
                {categories &&
                  categories.map((cateogry: ProductCategoryResponse) =>
                    cateogry?.products
                      ?.filter((product) => !product.barterAllowed)
                      .map((product, index) => (
                        <ProductDiv
                          key={Math.random()}
                          product={product}
                          stateKey={index}
                        />
                      ))
                  )}
              </div>
            </div>
            <div
              role="tabpanel"
              className={`tab-pane ${barterActiveTab}`}
              id="barteritems"
            >
              <div className="itemized-gallery">
                {categories &&
                  categories.map((cateogry: ProductCategoryResponse) =>
                    cateogry?.products
                      ?.filter((product) => product.barterAllowed)
                      .map((product, index) => (
                        <ProductDiv
                          key={Math.random()}
                          product={product}
                          stateKey={index}
                        />
                      ))
                  )}
              </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="wishlistitems">
              <div className="itemized-gallery">
                {/* {categories &&
                  categories.map((cateogry: ProductCategoryResponse) =>
                    cateogry?.products
                      ?.filter((product) => product.barterAllowed)
                      .map((product) => (
                        <ProductDiv key={Math.random()} product={product} />
                      ))
                  )} */}
                <ProductDivFlex products={wishListproducts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
