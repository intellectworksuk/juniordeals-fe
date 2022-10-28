import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { clearProductStateError } from "../../store/product/product.slice";
import { displayErrorMessage } from "../../util/notifications";
import * as ProductService from "../../store/product/product.actions";
import md1 from "../assets/img/md1.jpg";
import { ProductResponse } from "../../types";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import * as routes from "../../constants/routes";
import { Badge, Tag } from "antd";
import { ProductAvatar } from "../Components/ProductAvatar";

export const BarterProductSelectionPage = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    status,
    error: productError,
    products,
  } = useAppSelector((state) => state.product);

  const { product: productFromLocation } = (location.state as any) || {};

  useEffect(() => {
    if (productError) {
      displayErrorMessage(productError);
      dispatch(clearProductStateError());
    }
  }, [dispatch, productError]);

  useEffect(() => {
    dispatch(ProductService.fetchUserProducts());
  }, [dispatch]);

  useScrollToTop();

  return (
    <>
      <section className="sec-customer-cart">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
            <h2 className="text-center headingPrimary">Barter Selection</h2>
            <h4 className="text-center subHeading">
              Select your products for barter
            </h4>
          </div>
        </div>
        <div className="cust-cart">
          <div className="generic-lister">
            {products
              .filter((p) => p.barterAllowed)
              .map((product) => (
                <Badge.Ribbon
                  text={`${
                    product.rate! - productFromLocation.rate! < 0
                      ? "Buyer to pay"
                      : "Seller to pay"
                  } to pay`}
                  color="volcano"
                >
                  <div key={Math.random()} className="list-item">
                    <ProductAvatar productImage={product.productImage} />
                    <div className="item-description">
                      <p style={{ marginBottom: 0 }}>
                        <small style={{ fontSize: "9px" }}>
                          ITEM CODE: {product.id}
                        </small>
                      </p>
                      <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                        {product.title}
                      </p>
                      <p>
                        <small>
                          Product Subtitle:&nbsp; {product.subTitle}
                        </small>
                        <br />
                        <small>Rate:&nbsp; $ {product.rate}</small>
                      </p>
                    </div>

                    <div className="item-price">
                      <Tag
                        color={
                          product.rate! - productFromLocation.rate! < 0
                            ? "red"
                            : "green"
                        }
                      >
                        <h3>{product.rate! - productFromLocation.rate!}</h3>
                      </Tag>
                    </div>
                    <div>
                      <button
                        className="btn-round btn-block"
                        type="button"
                        onClick={() =>
                          navigate(routes.TO_CHAT, {
                            state: {
                              product: productFromLocation,
                              barterProduct: product,
                            },
                          })
                        }
                      >
                        Send Offer&emsp;
                        <i className="mdi mdi-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </Badge.Ribbon>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};
