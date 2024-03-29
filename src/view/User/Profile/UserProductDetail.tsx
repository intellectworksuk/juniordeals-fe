import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Apiconfig from "../../../config/Apiconfig";
import * as routes from "../../../constants/routes";
import parse from "html-react-parser";
import { ProductResponse } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import * as ProductService from "../../../store/product/product.actions";
import { store } from "../../../store";
import { Avatar, Badge, Button, Carousel, Form, Image, Space } from "antd";
import { WechatOutlined } from "@ant-design/icons";
import useEffectOnce from "../../../hooks/useEffectOnce";
import * as FireStoreService from "../../Components/ChatStore/firebase/fireStoreService";
import { useFireBase } from "../../Components/ChatStore/firebase/config";
import { useEffect, useState } from "react";
import { useScrollToTop } from "../../../hooks/useScrollToTop";
import noImageIcon from "../../assets/img/jd-icon.png";
import chatIcon from "../../assets/img/chat-icon.png";
import { UserType } from "../../../enums";
import { ChatNotifyBadge } from "../../Components";
import { displayErrorMessage } from "../../../util/notifications";

export const UserProductDetailPage = () => {
  const [form] = Form.useForm();

  const [auth, fs] = useFireBase();

  const location = useLocation();

  const dispatch = useAppDispatch();

  const product = location.state as ProductResponse;

  const navigate = useNavigate();

  // const [messagetCount, setMessageCount] = useState<bigint>(BigInt(0));

  const { recentproducts: recentlyViewedProducts } = useAppSelector(
    (state) => state.product
  );

  const { user } = useAppSelector((state) => state.auth);

  const onFormSubmit = (formData: any) => {
    dispatch(ProductService.rejectProduct(formData));
  };

  const onFinishFailed = () => {
    displayErrorMessage("Please complete all required form fields!");
    return;
  };

  // const getMessageCount = async () => {
  //   FireStoreService.getProductMessageCount(auth, fs, product).then((n) =>
  //     setMessageCount(n)
  //   );
  // };

  // useEffectOnce(() => {
  //   // getMessageCount();

  //   dispatch(ProductService.fetchRecentlyViewedList())
  // })

  // const productAttachToBuy = () => {
  //   // const chatRoomId = window.btoa(
  //   //   unescape(
  //   //     encodeURIComponent(
  //   //       `${store.getState().auth.user.id}${product.id}${String(product.userId)}`
  //   //     )
  //   //   )
  //   // );

  //   // dispatch(ProductService.userAttachToProduct(chatRoomId))

  //   // navigate("/navigate/user/chat", { state: product });
  // };

  useEffectOnce(() => {
    form.setFieldsValue({
      ProductId: product.id,
    });
  });

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
                    style={{ width: "100%", height: "100%" }}
                    src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${img.fileName}&type=product`}
                    alt=""
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <h6 className="text-uppercase">Upload Date: 01-01-2022</h6>
            <h2>{product.title}</h2>
            <h4>{product.subTitle}</h4>
            <div className="itemRating">
              <i className="glyphicon glyphicon-star"></i>
              <i className="glyphicon glyphicon-star"></i>
              <i className="glyphicon glyphicon-star"></i>
              <i className="glyphicon glyphicon-star"></i>
              <i className="glyphicon glyphicon-star"></i>
            </div>
            {/* <div className="sellerprofile">
              <img
                src="https://imgs.search.brave.com/WF0zrJ_-Yy8Vp45wxEkFte9KxmxmqYnt4Bzps4BE77U/rs:fit:550:550:1/g:ce/aHR0cDovL3d3dy5z/dWdhcmN1YmVkLmll/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEz/LzEyL1NxdWFyZS1G/YWNlcy5qcGc"
                alt=""
              />
              <div className="shrtDesc">
                <strong>Jane Hollywood</strong>
                <br />
                <a href="#" className="btn-link">
                  Like this Item
                </a>{" "}
                |
                <a href="#" className="btn-link">
                  Share Link
                </a>
              </div>
            </div> */}
            <p className="itemDesc">
              {product.description}
              <br />
            </p>
            <hr />
            <h5 style={{ fontWeight: "bold" }}>
              Item Specs &amp; other Information
            </h5>
            {parse(product.specification!)}
            <br />
            <br />
            <Link
              to={routes.TO_CHAT}
              state={{ product: product, chatUserType: "seller" }}
            >
              <ChatNotifyBadge
                product={product}
                size="large"
                bgcolor="rgb(255,255,255)"
              />
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            {user.userType !== UserType.CHILD && product.status !== "Rejected" && (
              <Form
                form={form}
                size="small"
                onFinish={onFormSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                initialValues={{ ProductId: "", Reason: "" }}
              >
                <Space
                  direction="vertical"
                  align="center"
                  style={{ width: "100%", gap: "0" }}
                >
                  <Form.Item name="ProductId" hidden={true}>
                    <input />
                  </Form.Item>
                  <Form.Item
                    name="Reason"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please enter reason for the product rejection.",
                      },
                      ({ getFieldValue }) => ({
                        validator(_rule, value) {
                          if (!value || !value.includes("<script>")) {
                            return Promise.resolve();
                          }
                          return Promise.reject("Invalid input found!");
                        },
                      }),
                    ]}
                  >
                    <textarea
                      maxLength={100}
                      className="inpCtrl"
                      placeholder="Special Description for the item"
                      style={{ width: "480px" }}
                    ></textarea>
                  </Form.Item>
                  <button
                    className="btn-round-sec btn-block"
                    style={{ backgroundColor: "red" }}
                    type="submit"
                  // onClick={() =>
                  //   navigate(routes.START_DEAL, { state: { product: product } })
                  // }
                  >
                    Reject Product
                  </button>
                </Space>
              </Form>
            )}
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
