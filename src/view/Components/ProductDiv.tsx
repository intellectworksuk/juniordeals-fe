import Apiconfig from "../../config/Apiconfig";
import { AppDispatch, ProductResponse } from "../../types";
import * as routes from "../../constants/routes";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import * as ProductService from "../../store/product/product.actions";
import { useEffect } from "react";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../util/notifications";
import {
  clearProductStateError,
  clearProductStateStatus,
} from "../../store/product/product.slice";
import { Image, Spin, Typography } from "antd";
import noImageIcon from "../assets/img/jd-icon.png";

const { Text } = Typography;

interface ProductDivProps {
  product: ProductResponse;
  stateKey: number;
  //   dispatch: AppDispatch;
}

export const ProductDiv = (props: ProductDivProps) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const product = props.product;

  const { status, error, products } = useAppSelector((state) => state.product);

  const addLikes = () => {
    dispatch(ProductService.addLikes(product.id!));
  };

  const addToWishList = () => {
    dispatch(ProductService.addToWishList(product.id!));
  };

  return (
    <>
      <div key={Math.random()} className="shelf-item">
        <div className="imgBox">
          {product.productImage && product.productImage.length > 0 ? (
            <img
              style={{ maxWidth: "100%", height: "160px" }}
              src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${product.productImage[0].fileName}&type=product`}
              alt=""
            />
          ) : (
            // <img
            //   src="https://cdn.dribbble.com/users/6237882/screenshots/18023510/media/35569a6fa4b4d8dc6cb48f05a9cb20be.png?compress=1&resize=800x600&vertical=top"
            //   alt=""
            // />
            <Image preview={false} src={noImageIcon} />
          )}
        </div>
        <div className="miniDetail">
          <strong>{product.title}</strong>
          <br />
          <i>Points: {product.rate}</i>
        </div>
        <div className="softactions">
          <button
            className="softactionbtn"
            onClick={addLikes}
            disabled={product.userLike || status === "addLikesPending"}
          >
            <span id="button-text">
              {status === "addLikesPending" ? (
                <Spin size="small" />
              ) : (
                <>{product.likes!}&ensp;Likes</>
              )}
            </span>
          </button>
          <button
            className="softactionbtn"
            onClick={addToWishList}
            disabled={
              product.inUserWishList || status === "addToWishListPending"
            }
          >
            <span id="button-text">
              {status === "addToWishListPending" ? (
                <Spin size="small" />
              ) : (
                "+ Wishlist"
              )}
            </span>
          </button>
          <Link
            className="softactionbtn"
            to={`/navigate/global/product/detail`}
            state={{ product: product }}
          >
            Buy Now
          </Link>
        </div>
      </div>
    </>
  );
};
