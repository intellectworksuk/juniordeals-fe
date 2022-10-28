import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../../util/notifications";
import * as ProductService from "../../../store/product/product.actions";
import { ProductCategoryResponse } from "../../../types";
import Apiconfig from "../../../config/Apiconfig";
import * as routes from "../../../constants/routes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProductDiv } from "../../Components/ProductDiv";
import {
  clearProductStateError,
  clearProductStateStatus,
} from "../../../store/product/product.slice";
import { store } from "../../../store";
import { Image } from "antd";
import noImageIcon from "../../assets/img/jd-icon.png";

export const ProductLatestList = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useAppDispatch();

  const { products } = useAppSelector((state) => state.product);

  const { user } = useAppSelector((state) => state.auth);

  // useEffect(() => {
  //   if (productError) {
  //     displayErrorMessage(productError);
  //   }

  //   dispatch(clearProductStateError());
  // }, [dispatch, productError]);

  // useEffect(() => {
  //   if (productStatus === "addLikesResolved") {
  //     displaySuccessNotification("Likes added");
  //   }
  //   if (productStatus === "addToWishListResolved") {
  //     displaySuccessNotification("Added to Wishlist");
  //   }

  //   dispatch(clearProductStateStatus());
  // }, [dispatch, productStatus]);

  useEffect(() => {
    dispatch(ProductService.fetchAllProducts({ status: 2 }));
  }, [dispatch]);

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
        <div className="freeHeaderCenter">
          {/* {categories &&
            categories.map((cateogry: ProductCategoryResponse) =>
              cateogry?. */}
          {products
            .filter((p) => p.availableQuantity! > 0)
            .filter((p) => user.userName === undefined || p.userId != user.id)
            ?.slice(0, 4)
            ?.sort(
              (a, b) =>
                new Date(b.createdOn!).getTime() -
                new Date(a.createdOn!).getTime()
            )
            .map((product) => (
              <div className="basicDiv" key={Math.random()}>
                <div className="itemImage">
                  {product.productImage && product.productImage.length > 0 ? (
                    <img
                      style={{ width: "100%", height: 187 }}
                      src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${product.productImage[0].fileName}&type=product`}
                      alt=""
                    />
                  ) : (
                    // <img
                    //   src="https://cdn.dribbble.com/users/3794257/screenshots/14968829/media/51623ff71554bb312db41d1ebe277f9a.png?compress=1&resize=400x300&vertical=top"
                    //   alt=""
                    // />
                    <Image preview={false} src={noImageIcon} />
                  )}
                  {/* <div className="sellerInfomini">
                      <img
                        src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${product.applicationUser?.image}&type=user`}
                        alt="Seller"
                      />
                      <p>{product.applicationUser?.fullName}</p>
                    </div> */}
                </div>
                <div className="itemInfo">
                  <h4>{product.title}</h4>
                  <p className="targetPrice">Points: {product.rate}</p>
                  <p>{product.description?.substring(0, 30)}</p>
                </div>
                <div className="selectKey">
                  {user.userName && product.barterAllowed && (
                    <button
                      type="button"
                      className="border-left"
                      style={{ width: "100%" }}
                      onClick={() =>
                        navigate(routes.FETCH_USER_PRODUCT_DETAIL, {
                          state: product,
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
                        navigate(routes.FETCH_USER_PRODUCT_DETAIL, {
                          state: product,
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
