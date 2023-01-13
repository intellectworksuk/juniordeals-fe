import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../../util/notifications";
import * as ProductService from "../../../store/product/product.actions";
import { SearchData } from "../../../types";
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
import { Form, Pagination, Skeleton, Spin } from "antd";
import type { PaginationProps } from "antd";

export const ProductList = () => {
  const [form] = Form.useForm();

  const location = useLocation();

  const dispatch = useAppDispatch();

  const {
    products,
    status: productStatus,
    paging: productPaging,
  } = useAppSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(0);
  const [searchFilter, setSearchFilter] = useState<SearchData>();

  useEffectOnce(() => {
    // dispatch(ProductService.fetchAllProducts(undefined));
    setCurrentPage(1);
  });

  const onFormSubmit = (formData: SearchData) => {
    setSearchFilter(formData);

    setCurrentPage(1);

    dispatch(
      ProductService.fetchAllProducts({
        ...formData,
        pageNo: 1,
        pageSize: 10,
      })
    );
  };

  const onPageChange: PaginationProps["onChange"] = (page, pageSize) => {
    dispatch(
      ProductService.fetchAllProducts({
        ...searchFilter,
        pageNo: page,
        pageSize: pageSize,
      })
    );

    setCurrentPage(page);
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
                          <option value="2" key={1}>
                            Available
                          </option>
                          <option value="4" key={2}>
                            Sold
                          </option>
                          <option value="3" key={3}>
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
                        disabled={productStatus === "fetchAllProductsPending"}
                      >
                        <span id="button-text">
                          {productStatus === "fetchAllProductsPending" ? (
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
      </div>
      {productStatus === "fetchAllProductsPending" ? (
        <Skeleton active></Skeleton>
      ) : (
        <div className="sec-itemized-gallery">
          <div className="itemized-gallery">
            {products &&
              products?.map((product) => (
                <ProductDivView product={product} key={Math.random()} />
              ))}
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-lg-12 text-center">
          <Pagination
            current={currentPage}
            showSizeChanger={false}
            onChange={onPageChange}
            total={productPaging.totalCount}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
            // defaultPageSize={20}
            // defaultCurrent={1}
          />
        </div>
      </div>
    </>
  );
};
