import { Link, useLocation, useNavigate } from "react-router-dom";
import Apiconfig from "../../config/Apiconfig";
import * as routes from "../../constants/routes";
import parse from "html-react-parser";
import { ProductResponse } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import * as ProductService from "../../store/product/product.actions";
import useEffectOnce from "../../hooks/useEffectOnce";
import { Carousel, Image, Space, Tag } from "antd";
import moment from "moment";
import noImageIcon from "../assets/img/jd-icon.png";
import { useScrollToTop } from "../../hooks/useScrollToTop";

export const ProductDetailPage = () => {
  const location = useLocation();

  const dispatch = useAppDispatch();

  const { product } = (location.state as any) || {};

  const navigate = useNavigate();

  const { recentproducts: recentlyViewedProducts } = useAppSelector(
    (state) => state.product
  );

  // useEffectOnce(() => {
  //   dispatch(ProductService.fetchRecentlyViewedList());
  // });

  // const productAttachToBuy = () => {
  //   // const chatRoomId = window.btoa(
  //   //   unescape(
  //   //     encodeURIComponent(
  //   //       `${store.getState().auth.user.id}${product.id}${String(product.userId)}`
  //   //     )
  //   //   )
  //   // );

  //   // dispatch(ProductService.userAttachToProduct(chatRoomId))
  // };

  useScrollToTop();

  return (
    <>
      <section className="sec-product-info">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <Carousel autoplay>
              {product.productImage?.map((img: any) => (
                <div key={Math.random()}>
                  <img
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                    // style={{ height: "100%" }}
                    src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${img.fileName}&type=product`}
                    alt=""
                  />
                </div>
              ))}
            </Carousel>
            {/* <div className="albery-container">
              <div className="albery-wrapper">
                {product.productImage?.map((img: any) => (
                  <div className="albery-item">
                    <img
                      style={{ width: 400, height: 400 }}
                      src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${img.fileName}&type=product`}
                      alt=""
                    />
                  </div>
                ))}
              </div>

              <div className="move-right">
                <a href="#" id="rightArrow">
                  &nbsp;
                </a>
              </div>
              <div className="move-left">
                <a href="#" id="leftArrow">
                  &nbsp;
                </a>
              </div>
            </div>
            <div className="pagination-container">
              <div className="pagination-wrapper">
                {product.productImage?.map((img: any) => (
                  <div className="pagination-item" data-item="1">
                    <img
                      style={{ width: 100, height: 100 }}
                      src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${img.fileName}&type=product`}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div> */}
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <h6 className="text-uppercase">
              Upload Date:{" "}
              {moment(product.createdOn).format("MM-DD-YYYY HH:mm:ss")}
            </h6>
            <h2>{product.title}</h2>
            <h4>{product.subTitle}</h4>
            <div className="itemRating">
              <i className="glyphicon glyphicon-star"></i>
              <i className="glyphicon glyphicon-star"></i>
              <i className="glyphicon glyphicon-star"></i>
              <i className="glyphicon glyphicon-star"></i>
              <i className="glyphicon glyphicon-star"></i>
            </div>
            <div className="sellerprofile">
              <img
                src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${product.applicationUser.image}&type=user`}
                alt=""
              />
              <div className="shrtDesc">
                <strong>{product.applicationUser.fullName}</strong>
                <br />
                <a
                  href="javascript:void(0)"
                  className="btn-link"
                  onClick={() => dispatch(ProductService.addLikes(product.id!))}
                >
                  Like this Item
                </a>{" "}
                |
                <a
                  href="javascript:void(0)"
                  className="btn-link"
                  onClick={() =>
                    dispatch(ProductService.addToWishList(product.id!))
                  }
                >
                  Add to Wishlist
                </a>
              </div>
            </div>
            <p className="itemDesc">
              {product.description}
              <br />
            </p>
            <hr />
            <h5 style={{ fontWeight: "bold" }}>
              Item Specs &amp; other Information
            </h5>
            {parse(product.specification)}
            <hr />
            <p className="itemDesc">
              <Tag
                color="darkgreen"
                style={{ width: "50px", textAlign: "center" }}
              >
                <b> {product.rate}</b>
              </Tag>
            </p>
            <hr />
            <Space direction="horizontal">
              <button
                className="btn btn-default btn-lg"
                onClick={() =>
                  navigate(routes.TO_CHAT, {
                    state: { product: product, chatUserType: "buyer" },
                  })
                }
              >
                Buy this Item
              </button>
              &nbsp;
              {product.barterAllowed && (
                <button
                  className="btn btn-default btn-lg"
                  onClick={() =>
                    navigate(routes.FETCH_PRODUCT_BARTER, {
                      state: { product: product, chatUserType: "buyer" },
                    })
                  }
                >
                  Barter this Item
                </button>
              )}
            </Space>
          </div>
        </div>
      </section>
      {/* <div className="sec-barter-latest">
        <div className="freeHeadCenter">
          <h2>Recently Viewed Items</h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              {recentlyViewedProducts &&
                recentlyViewedProducts.map((product) => (
                  <div className="shot" key={Math.random()}>
                    <div className="flexible">
                      {product.productImage &&
                      product.productImage.length > 0 ? (
                        <img
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
                    <div className="shotKnow">
                      <div className="price">{product.rate}</div>
                      <div className="like">
                        {product.likes}&emsp;<i className="mdi mdi-heart"></i>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
