import { useEffect } from "react";
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
import {
  clearProductStateError,
  clearProductStateStatus,
} from "../../../store/product/product.slice";
import { ProductDivView } from "../../Components/ProductDivView";
import useEffectOnce from "../../../hooks/useEffectOnce";
import { Form } from "antd";

export const ProductList = () => {
  const [form] = Form.useForm();

  const location = useLocation();

  const dispatch = useAppDispatch();

  const { products } = useAppSelector((state) => state.product);

  useEffectOnce(() => {
    // dispatch(ProductService.fetchAllProducts(undefined));
  });

  const onFormSubmit = (formData: SearchData) => {
    dispatch(ProductService.fetchAllProducts(formData));
  };

  return (
    <>
      <div className="sec-category-search">
        <Form form={form} onFinish={onFormSubmit}>
          <div className="searchBlock">
            <div className="searchingHeader">
              <div className="container-fluid support-flex">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div
                    style={{
                      color: "rgb(250, 173, 20)",
                      fontSize: "35px",
                      fontWeight: "900",
                    }}
                  >
                    <div className="row">Use Search</div>
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
                      <Form.Item name="status">
                        <select className="form-control input-sm">
                          <option value="0">Select Status</option>
                          <option value="1" key={0}>
                            Approval Pending
                          </option>
                          <option value="2" key={0}>
                            Available
                          </option>
                          <option value="4" key={0}>
                            Sold
                          </option>
                          <option value="3" key={0}>
                            Inactive
                          </option>
                        </select>
                      </Form.Item>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2">
                      <button
                        type="submit"
                        className="btn btn-block btn-sm"
                        style={{ backgroundColor: "rgb(250, 173, 20)" }}
                      >
                        <span id="button-text">
                          <i className="mdi mdi-magnify"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>

      <div className="sec-itemized-gallery">
        <div className="itemized-gallery">
          {products &&
            products?.map((product) => (
              <ProductDivView product={product} key={Math.random()} />
            ))}
        </div>
      </div>
    </>
  );
};
