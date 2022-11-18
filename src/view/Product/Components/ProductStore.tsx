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
import { clearProductStateStatus } from "../../../store/product/product.slice";
import { useScrollToTop } from "../../../hooks/useScrollToTop";
import { Form, Pagination, Skeleton, Spin } from "antd";
import useEffectOnce from "../../../hooks/useEffectOnce";
import * as ConfigService from "../../../store/config/config.actions";
import { ProductDivFlex } from "../../Components/ProductDivFlex";
import type { PaginationProps } from "antd";

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
    error: productError,
    products,
    wishListproducts,
    paging: productPaging,
  } = useAppSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchFilter, setSearchFilter] = useState<SearchData>();

  const [productDivState, setProductDivState] = useState<any>();
  const [currProdStateId, setCurrProdStateId] = useState<bigint>();

  // const [productActiveTab, setProductActiveTab] = useState<string>("active");
  // const [barterActiveTab, setBbarterActiveTab] = useState<string>("active");

  const { setups } = useAppSelector((state) => state.config);
  const { user } = useAppSelector((state) => state.auth);

  const onFormSubmit = (formData: SearchData) => {
    setSearchFilter(formData);

    setCurrentPage(1);

    dispatch(
      ProductService.fetchProductsForSell({
        ...formData,
        pageNo: 1,
        pageSize: 10,
      })
    );
  };

  useEffect(() => {
    if (productError) {
      // displayErrorMessage(error);
      productDivState?.forEach((ds: { status: string }) => {
        ds.status = "idle";
      });
    }
  }, [dispatch, productError]);

  useEffectOnce(() => {
    dispatch(ConfigService.fetchCategories());

    // if (!!user.userName) {
      dispatch(
        ProductService.fetchProductsForSell({ pageNo: 1, pageSize: 10 })
      );

      dispatch(ProductService.fetchProductsWishList());
    // }
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

  useEffect(() => {
    if (productStatus === "fetchProductsForSellResolved") {
      setProductDivState(
        products.map((p, index) => ({
          id: p?.id,
          liked: p?.userLike,
          wished: p?.inUserWishList,
          status: "idle",
        }))
      );
    }
  }, [productStatus]);

  const addLikes = (pid: bigint) => {
    // const newState = [...props.productState];

    const prod = productDivState.find((p: { id: bigint }) => p?.id! === pid);

    if (prod) {
      prod.status = "addLikesPending";

      setCurrProdStateId(pid);
    }

    dispatch(ProductService.addLikes(pid));
  };

  const addToWishList = (pid: bigint) => {
    const prod = productDivState.find((p: { id: bigint }) => p?.id! === pid);

    if (prod) {
      prod.status = "addToWishListPending";

      setCurrProdStateId(pid);
    }

    dispatch(ProductService.addToWishList(pid));
  };

  useEffect(() => {
    if (productStatus === "addLikesResolved") {
      // const newState = [...props.productState];

      const prod = productDivState.find(
        (p: { id: bigint }) => BigInt(p?.id!) === BigInt(currProdStateId!)
      );

      if (prod) {
        prod.status = "addLikesResolved";

        prod.liked = true;
      }

      // productDivState.find(
      //   (p: { id: bigint }) => BigInt(p?.id!) === BigInt(currProdStateId!)
      // )!.liked = true;

      // dispatch(ProductService.fetchSingleProduct(currProdStateId!))

      // props.setProductState(newState);
    }
    if (productStatus === "addToWishListResolved") {
      // const newState = [...props.productState];

      const prod = productDivState.find(
        (p: { id: bigint }) => BigInt(p?.id!) === BigInt(currProdStateId!)
      );

      if (prod) {
        prod.status = "addToWishListPending";

        prod.wished = true;
      }
    }
  }, [productStatus]);

  const onPageChange: PaginationProps["onChange"] = (page, pageSize) => {
    dispatch(
      ProductService.fetchProductsForSell({
        ...searchFilter,
        pageNo: page,
        pageSize: pageSize,
      })
    );

    setCurrentPage(page);
  };

  useScrollToTop();

  return (
    <>
      <div className="sec-category-search">
        <Form form={form} onFinish={onFormSubmit} autoComplete="off">
          <div className="searchBlock">
            <div className="searchingHeader">
              <div className="support-flex">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="sb-title">
                    <h3>SEARCH BY INTEREST</h3>
                    <p></p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
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
                        className="btn btn-block btn-sm btn-primary btn-ps"
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

          {/* {productStatus.endsWith("Pending") ? (
            <Skeleton active></Skeleton>
          ) : ( */}
          <div className="tab-content">
            <div
              role="tabpanel"
              className={`tab-pane ${productActiveTab}`}
              id="sellitems"
            >
              <div className="itemized-gallery">
                {productDivState &&
                  products &&
                  products
                    ?.filter((product) => !product.barterAllowed)
                    .map((product, index) => (
                      <ProductDiv
                        key={Math.random()}
                        product={product}
                        productState={productDivState}
                        addLikes={() => addLikes(product.id!)}
                        addWishList={() => addToWishList(product.id!)}
                        // setProductState={setProductDivState}
                      />
                    ))}
              </div>
            </div>
            <div
              role="tabpanel"
              className={`tab-pane ${barterActiveTab}`}
              id="barteritems"
            >
              <div className="itemized-gallery">
                {productDivState &&
                  products &&
                  products
                    ?.filter((product) => product.barterAllowed)
                    .map((product, index) => (
                      <ProductDiv
                        key={Math.random()}
                        product={product}
                        productState={productDivState}
                        addLikes={() => addLikes(product.id!)}
                        addWishList={() => addToWishList(product.id!)}
                        // setProductState={setProductDivState}
                      />
                    ))}
              </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="wishlistitems">
              <div className="itemized-gallery">
                <ProductDivFlex products={wishListproducts} />
              </div>
            </div>
          </div>
        </div>
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
      </div>
    </>
  );
};
