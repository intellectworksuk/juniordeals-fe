import Apiconfig from '../../config/Apiconfig'
import { ProductResponse } from '../../types'
import * as routes from '../../constants/routes'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { ProviderProps } from 'react-redux'
import kid1img from '../assets/img/kid-1.png'
import kid2img from '../assets/img/kid-2.png'
import kid3img from '../assets/img/kid-3.png'
import { Avatar, Image, Input, Space, Spin, Tag } from 'antd'
import moment from 'moment'
import { AvatarUpload } from './AvatarUpload'
import { UserOutlined } from '@ant-design/icons'
import noImageIcon from '../assets/img/jd-icon.png'
import useEffectOnce from '../../hooks/useEffectOnce'
import * as AdminService from '../../store/admin/admin.actions'
import { useFireBase } from './ChatStore/firebase/config'
import { onValue, ref } from 'firebase/database'
import { useState } from 'react'

const { Search } = Input

export const UserDivFlex = () => {
  const dispatch = useAppDispatch()

  const { status: adminStatus, users } = useAppSelector((state) => state.admin)

  const biusers = users?.reduce(function (
    accumulator: any[],
    currentValue,
    currentIndex,
    array,
  ) {
    if (currentIndex % 2 === 0)
      accumulator.push(array.slice(currentIndex, currentIndex + 2))
    return accumulator
  },
  [])

  // const initSearch = (searchText: string) => {
  //   dispatch(AdminService.fetchAllUsers(searchText))
  // }

  const updateUserStatus = (userId: string, status: boolean) => {
    dispatch(AdminService.updateUserStatus({ id: userId, status: status }))

    // dispatch(AdminService.updateUserState({ id: userId, status: status }))
  }

  return (
    <>
      <div className="sec-category-search">
        <div className="searchBlock">
          <div className="searchResults">
            <div className="container-fluid">
              <div className="row">
                {biusers?.map((usr, index) => (
                  <div className="row" key={Math.random()}>
                    <div className="col-lg-6 col-md-6">
                      <div className="interestCard">
                        <div className="categorDp">
                          {usr[0]?.image ? (
                            <Avatar
                              style={{ margin: '50px 20px' }}
                              size={64}
                              src={
                                <Image
                                  preview={false}
                                  src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${usr[0].image}&type=user`}
                                />
                              }
                              icon={<UserOutlined />}
                              className="mb-1"
                            />
                          ) : (
                            // <AvatarUpload
                            //   type="user"
                            //   buttonSize={64}
                            //   userImageType="usr"
                            // />
                            <img src={noImageIcon} />
                          )}
                        </div>
                        <div className="categoryDesc">
                          <p className="itemDate">
                            {moment(usr[0]?.createdOn).format(
                              'MM-DD-YYYY HH:mm:ss',
                            )}
                          </p>
                          <h4 className="itemDesc">{usr[0]?.fullName}</h4>
                          <h4 className="profileItem">{usr[0]?.userName}</h4>
                          <Space direction="horizontal">
                            <Tag
                              color="darkgreen"
                              style={{ width: '100px', textAlign: 'center' }}
                            >
                              <b>{usr[0]?.availableCredits}</b>
                            </Tag>
                            {' Available Credits'}
                          </Space>
                          {usr[0].isActive !== undefined &&
                            (usr[0].isActive ? (
                              <button
                                style={{
                                  margin: '250px 0px 350px 250px',
                                  position: 'absolute',
                                }}
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  updateUserStatus(usr[0].id, false)
                                }
                              >
                                <span id="button-text">
                                  {adminStatus === 'updateUserStatusPending' ? (
                                    <Spin size="small" />
                                  ) : (
                                    'Deactivate'
                                  )}
                                </span>
                              </button>
                            ) : (
                              <button
                                style={{
                                  margin: '250px 0px 350px 250px',
                                  position: 'absolute',
                                }}
                                className="btn btn-success btn-sm"
                                onClick={() =>
                                  updateUserStatus(usr[0].id, true)
                                }
                              >
                                <span id="button-text">
                                  {adminStatus === 'updateUserStatusPending' ? (
                                    <Spin size="small" />
                                  ) : (
                                    'Activate'
                                  )}
                                </span>
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>
                    {usr.length > 1 && (
                      <div className="col-lg-6 col-md-6">
                        <div className="interestCard">
                          <div className="categorDp">
                            {usr[1].image ? (
                              <Avatar
                                style={{ margin: '50px 20px' }}
                                size={64}
                                src={
                                  <img
                                    src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${usr[1].image}&type=user`}
                                  />
                                }
                                icon={<UserOutlined />}
                                className="mb-1"
                              />
                            ) : (
                              // <AvatarUpload
                              //   type="user"
                              //   buttonSize={64}
                              //   userImageType="usr"
                              // />
                              <img src={noImageIcon} />
                            )}
                          </div>
                          <div className="categoryDesc">
                            <p className="itemDate">
                              {moment(usr[1]?.createdOn).format(
                                'MM-DD-YYYY HH:mm:ss',
                              )}
                            </p>
                            <h4 className="itemDesc">{usr[1]?.fullName}</h4>
                            <h4 className="profileItem">{usr[1]?.userName}</h4>
                            <Space direction="horizontal">
                              <Tag
                                color="darkgreen"
                                style={{ width: '100px', textAlign: 'center' }}
                              >
                                <b>{usr[1]?.availableCredits}</b>
                              </Tag>
                              {' Available Credits'}
                            </Space>
                            {usr[0].isActive !== undefined &&
                              (usr[1].isActive ? (
                                <button
                                  style={{
                                    margin: '250px 0px 350px 250px',
                                    position: 'absolute',
                                  }}
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    updateUserStatus(usr[1].id, false)
                                  }
                                >
                                  <span id="button-text">
                                    {adminStatus ===
                                    'updateUserStatusPending' ? (
                                      <Spin size="small" />
                                    ) : (
                                      'Deactivate'
                                    )}
                                  </span>
                                </button>
                              ) : (
                                <button
                                  style={{
                                    margin: '250px 0px 350px 250px',
                                    position: 'absolute',
                                  }}
                                  className="btn btn-success btn-sm"
                                  onClick={() =>
                                    updateUserStatus(usr[1].id, true)
                                  }
                                >
                                  <span id="button-text">
                                    {adminStatus ===
                                    'updateUserStatusPending' ? (
                                      <Spin size="small" />
                                    ) : (
                                      'Activate'
                                    )}
                                  </span>
                                </button>
                              ))}
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
  )
}
