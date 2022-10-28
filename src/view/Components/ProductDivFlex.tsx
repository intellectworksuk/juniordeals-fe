import Apiconfig from "../../config/Apiconfig";
import { ProductResponse } from "../../types";
import * as routes from "../../constants/routes";
import { useAppSelector } from "../../hooks/reduxHooks";
import { ProviderProps } from "react-redux";
import moment from "moment";
import { Avatar, Image } from "antd";
import noImageIcon from "../assets/img/jd-icon.png";
import { UserOutlined } from "@ant-design/icons";

interface ProductDivFlexProps {
  // showBarters: boolean;
  products: ProductResponse[];
}

export const ProductDivFlex = (props: ProductDivFlexProps) => {
  // const { status, error, categories } = useAppSelector(
  //   (state) => state.product
  // );

  // const products = categories.flatMap((c) => c.products);

  const biproducts = props.products
    .filter((p) => p.availableQuantity! > 0)
    .reduce(function (accumulator: any[], currentValue, currentIndex, array) {
      if (currentIndex % 2 === 0)
        accumulator.push(array.slice(currentIndex, currentIndex + 2));
      return accumulator;
    }, []);

  return (
    <>
      <div className="sec-category-search">
        <div className="searchBlock">
          <div className="searchResults">
            <div className="container-fluid">
              {biproducts.map((product, index) => (
                <div className="row" key={Math.random()}>
                  <div className="col-lg-6 col-md-6">
                    <div className="interestCard">
                      <div className="categorDp">
                        {product[0].productImage &&
                        product[0].productImage.length > 0 ? (
                          <img
                            src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${product[0].productImage[0].fileName}&type=product`}
                            alt=""
                          />
                        ) : (
                          // <img
                          //   src="https://i.pinimg.com/originals/a2/a7/86/a2a786ea9b869c615f8652deb6a72a4d.png"
                          //   alt="This is product image"
                          // />
                          <Image preview={false} src={noImageIcon} />
                        )}
                      </div>
                      <div className="categoryDesc">
                        <p className="itemDate">
                          {moment(product[0]?.createdOn).format(
                            "MM-DD-YYYY HH:mm:ss"
                          )}
                        </p>
                        <h4 className="itemDesc">{product[0]?.title}</h4>
                        <div className="sellerInfo">
                          {product[0]?.applicationUser?.image ? (
                            <img
                              src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${product[0]?.applicationUser?.image}&type=user`}
                              alt=""
                              className="sellermicrodp"
                            />
                          ) : (
                            <Avatar size="small" icon={<UserOutlined />} />
                          )}
                          <div className="sellerSnap">
                            <p>{product[0].applicationUser?.fullName}</p>
                            <ul className="ranker">
                              <li>
                                <i className="mdi mdi-star"></i>
                              </li>
                              <li>
                                <i className="mdi mdi-star"></i>
                              </li>
                              <li>
                                <i className="mdi mdi-star"></i>
                              </li>
                              <li>
                                <i className="mdi mdi-star-half-full"></i>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {product.length > 1 && (
                    <div className="col-lg-6 col-md-6">
                      <div className="interestCard">
                        <div className="categorDp">
                          {product[1].productImage &&
                          product[1].productImage.length > 0 ? (
                            <img
                              src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${product[1]?.productImage[0].fileName}&type=product`}
                              alt=""
                            />
                          ) : (
                            // <img
                            //   src="https://i.pinimg.com/originals/23/91/52/2391523603cbd5153d7eb4e37eb3c882.png"
                            //   alt="This is product image"
                            // />
                            <img src={noImageIcon} />
                          )}
                        </div>
                        <div className="categoryDesc">
                          <p className="itemDate">
                            {moment(product[1]?.createdOn).format(
                              "MM-DD-YYYY HH:mm:ss"
                            )}
                          </p>
                          <h4 className="itemDesc">{product[1]?.title}</h4>
                          <div className="sellerInfo">
                            {product[0]?.applicationUser?.image ? (
                              <img
                                src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${product[1]?.applicationUser?.image}&type=user`}
                                alt=""
                                className="sellermicrodp"
                              />
                            ) : (
                              <Avatar size="small" icon={<UserOutlined />} />
                            )}
                            <div className="sellerSnap">
                              <p>{product[1].applicationUser?.fullName}</p>
                              <ul className="ranker">
                                <li>
                                  <i className="mdi mdi-star"></i>
                                </li>
                                <li>
                                  <i className="mdi mdi-star"></i>
                                </li>
                                <li>
                                  <i className="mdi mdi-star"></i>
                                </li>
                                <li>
                                  <i className="mdi mdi-star-half-full"></i>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
