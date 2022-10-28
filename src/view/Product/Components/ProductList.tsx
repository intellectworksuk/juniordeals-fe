import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import {
  displayErrorMessage,
  displaySuccessNotification,
} from '../../../util/notifications'
import * as ProductService from '../../../store/product/product.actions'
import { ProductCategoryResponse } from '../../../types'
import Apiconfig from '../../../config/Apiconfig'
import * as routes from '../../../constants/routes'
import { Link, useLocation } from 'react-router-dom'
import { ProductDiv } from '../../Components/ProductDiv'
import {
  clearProductStateError,
  clearProductStateStatus,
} from '../../../store/product/product.slice'
import { ProductDivView } from '../../Components/ProductDivView'
import useEffectOnce from '../../../hooks/useEffectOnce'

export const ProductList = () => {
  const location = useLocation()

  const dispatch = useAppDispatch()

  const { products } = useAppSelector((state) => state.product)

  useEffectOnce(() => {
    dispatch(ProductService.fetchAllProducts(undefined))
  })

  return (
    <>
      <div className="sec-itemized-gallery">
        {/* <div className="user-header">
          <div className="uhTitle">
            <img
              src="https://api.uifaces.co/our-content/donated/AVQ0V28X.jpg"
              alt=""
            />
            <h4>
              Minie Barnes
              <br />
              <small>
                Joined; 2022
                <br />
                <i>12 Sales | 23 Barters</i>
              </small>
            </h4>
          </div>
          <div className="uhsearch">
            <div className="row">
              <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7">
                <input
                  type="text"
                  placeholder="Search item here"
                  className="inpCtrl"
                />
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                <select className="inpCtrl">
                  <option value="0">By Latest</option>
                </select>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                <select className="inpCtrl">
                  <option value="0">12 Item</option>
                  <option value="0">8 Item</option>
                  <option value="0">4 Item</option>
                </select>
              </div>
            </div>
          </div>
        </div> */}

        <div className="itemized-gallery">
          {products &&
            products?.map((product) => (
              <ProductDivView product={product} key={Math.random()} />
            ))}
        </div>
      </div>
    </>
  )
}
