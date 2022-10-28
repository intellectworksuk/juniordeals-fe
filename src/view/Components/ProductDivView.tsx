import Apiconfig from '../../config/Apiconfig'
import { AppDispatch, ProductResponse } from '../../types'
import * as routes from '../../constants/routes'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import * as ProductService from '../../store/product/product.actions'
import { useEffect } from 'react'
import {
  displayErrorMessage,
  displaySuccessNotification,
} from '../../util/notifications'
import {
  clearProductStateError,
  clearProductStateStatus,
} from '../../store/product/product.slice'
import { Image, Spin } from 'antd'
import { UserType } from '../../enums'
import { store } from '../../store'
import noImageIcon from '../assets/img/jd-icon.png'

interface ProductDivViewProps {
  product: ProductResponse
  //   dispatch: AppDispatch;
}

export const ProductDivView = (props: ProductDivViewProps) => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { status } = useAppSelector((state) => state.product)

  const { user } = useAppSelector((state) => state.auth)

  const product = props.product

  const approveProduct = () => {
    dispatch(ProductService.approveProduct(product.id!))
  }

  return (
    <>
      <div key={Math.random()} className="shelf-item">
        <div className="imgBox">
          {product.productImage && product.productImage.length > 0 ? (
            <img
              style={{ width: '100%', height: '160px' }}
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
          {[UserType.PARENT, UserType.CHILD].includes(
            Number(user.userType),
          ) && (
            <button
              className="softactionbtn"
              onClick={() =>
                navigate(routes.EDIT_PRODUCT, {
                  state: product,
                })
              }
            >
              Edit
            </button>
          )}
          <button
            className="softactionbtn"
            onClick={() =>
              navigate(routes.FETCH_USER_PRODUCT_DETAIL, {
                state: product,
              })
            }
          >
            View
          </button>
          {user.userType !== UserType.CHILD &&
            (user.userType === UserType.PARENT
              ? !product.approvedByParent
              : !product.approvedByAdmin) && (
              <button
                className="softactionbtn"
                onClick={() => approveProduct()}
                disabled={status === 'approveProductPending'}
              >
                <span id="button-text">
                  {status === 'approveProductPending' ? (
                    <Spin size="small" />
                  ) : (
                    'Approve'
                  )}
                </span>
              </button>
            )}
        </div>
      </div>
    </>
  )
}
