import Apiconfig from "../../config/Apiconfig";
import { ProductResponse } from "../../types";
import * as routes from "../../constants/routes";
import { useAppSelector } from "../../hooks/reduxHooks";
import { ProviderProps } from "react-redux";
import kid1img from "../assets/img/kid-1.png";
import kid2img from "../assets/img/kid-2.png";
import kid3img from "../assets/img/kid-3.png";
import { Avatar, Image, Space, Tag } from "antd";
import moment from "moment";
import { AvatarUpload } from "./AvatarUpload";
import { UserOutlined } from "@ant-design/icons";
import noImageIcon from "../assets/img/jd-icon.png";
import { useNavigate } from "react-router-dom";

export const KidDivFlex = () => {
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const bikids = user.children?.reduce(function (
    accumulator: any[],
    currentValue,
    currentIndex,
    array
  ) {
    if (currentIndex % 2 === 0)
      accumulator.push(array.slice(currentIndex, currentIndex + 2));
    return accumulator;
  },
  []);

  return (
    <>
      <div className="sec-category-search">
        <div className="searchBlock">
          <div className="searchResults">
            <div className="container-fluid">
              <div className="row">
                {bikids?.map((kid, index) => (
                  <div className="row" key={Math.random()}>
                    <div className="col-lg-6 col-md-6">
                      <div className="interestCard">
                        <div className="categorDp">
                          {kid[0]?.image ? (
                            <Avatar
                              style={{ margin: "50px 20px" }}
                              size={64}
                              src={
                                <Image
                                  preview={false}
                                  src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${kid[0].image}&type=user`}
                                />
                              }
                              icon={<UserOutlined />}
                              className="mb-1"
                            />
                          ) : (
                            // <AvatarUpload
                            //   type="user"
                            //   buttonSize={64}
                            //   userImageType="kid"
                            // />
                            <img src={noImageIcon} />
                          )}
                        </div>
                        <div className="categoryDesc">
                          <button
                            style={{
                              marginTop: "22px",
                              marginRight: "22px",
                              position: "absolute",
                              top: 0,
                              right: 0,
                            }}
                            className="btn btn-warning btn-md"
                            onClick={() =>
                              navigate(routes.USER_UPDATE, {
                                state: { userLoc: kid[0] },
                              })
                            }
                          >
                            Edit
                          </button>
                          <p className="itemDate">
                            {moment(kid[0]?.createdOn).format(
                              "MM-DD-YYYY HH:mm:ss"
                            )}
                          </p>
                          <h4 className="itemDesc">{kid[0]?.fullName}</h4>
                          <h4 className="profileItem">{kid[0]?.userName}</h4>
                          <Space direction="horizontal">
                            <Tag
                              color="darkgreen"
                              style={{ width: "100px", textAlign: "center" }}
                            >
                              <b>{kid[0]?.availableCredits}</b>
                            </Tag>
                            {" Available Credits"}
                          </Space>
                        </div>
                      </div>
                    </div>
                    {kid.length > 1 && (
                      <div className="col-lg-6 col-md-6">
                        <div className="interestCard">
                          <div className="categorDp">
                            {kid[1].image ? (
                              <Avatar
                                style={{ margin: "50px 20px" }}
                                size={64}
                                src={
                                  <img
                                    src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${kid[1].image}&type=user`}
                                  />
                                }
                                icon={<UserOutlined />}
                                className="mb-1"
                              />
                            ) : (
                              // <AvatarUpload
                              //   type="user"
                              //   buttonSize={64}
                              //   userImageType="kid"
                              // />
                              <img src={noImageIcon} />
                            )}
                          </div>
                          <div className="categoryDesc">
                            <button
                              style={{
                                marginTop: "22px",
                                marginRight: "22px",
                                position: "absolute",
                                top: 0,
                                right: 0,
                              }}
                              className="btn btn-warning btn-md"
                              onClick={() =>
                                navigate(routes.USER_UPDATE, {
                                  state: { userLoc: kid[1] },
                                })
                              }
                            >
                              Edit
                            </button>
                            <p className="itemDate">
                              {moment(kid[1]?.createdOn).format(
                                "MM-DD-YYYY HH:mm:ss"
                              )}
                            </p>
                            <h4 className="itemDesc">{kid[1]?.fullName}</h4>
                            <h4 className="profileItem">{kid[1]?.userName}</h4>
                            <Space direction="horizontal">
                              <Tag
                                color="darkgreen"
                                style={{ width: "100px", textAlign: "center" }}
                              >
                                <b>{kid[1]?.availableCredits}</b>
                              </Tag>
                              {" Available Credits"}
                            </Space>
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
      </div>
    </>
  );
};
