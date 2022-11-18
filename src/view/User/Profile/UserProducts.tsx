import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../../util/notifications";
import * as ProductService from "../../../store/product/product.actions";
import Apiconfig from "../../../config/Apiconfig";
import * as routes from "../../../constants/routes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearProductStateStatus } from "../../../store/product/product.slice";
import { ProductDiv } from "../../Components/ProductDiv";
import { Divider } from "antd";
import { ProductDivView } from "../../Components/ProductDivView";
import { ProductLatestList, ProductStore } from "../../Product";

export const UserProductsListPage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useAppDispatch();

  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(ProductService.fetchUserProducts());
  }, [dispatch]);

  return (
    <>
      <section className="sec-itemized-gallery">
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

        <div className="row">
          <div className="col-lg-12 col-lg-offset-5">
            <button
              className="btn-round-sec btn-block"
              type="button"
              onClick={() => navigate(routes.ADD_PRODUCT)}
            >
              Add Products
            </button>
          </div>
        </div>

        <div className="inlineTabs">
          <ul className="nav nav-pills nav-justified" role="tablist">
            <li role="presentation" className="active">
              <a
                href="#sellitems"
                aria-controls="home"
                role="tab"
                data-toggle="tab"
              >
                Selling items
              </a>
            </li>
            <li role="presentation">
              <a
                href="#barteritems"
                aria-controls="profile"
                role="tab"
                data-toggle="tab"
              >
                Barter items
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div role="tabpanel" className="tab-pane active" id="sellitems">
              <div className="itemized-gallery">
                {products &&
                  products
                    ?.filter((product) => !product.barterAllowed)
                    .map((product) => (
                      <ProductDivView key={Math.random()} product={product} />
                    ))}
              </div>
            </div>
            <div role="tabpanel" className="tab-pane" id="barteritems">
              <div className="itemized-gallery">
                <div className="itemized-gallery">
                  {products &&
                    products
                      ?.filter((product) => product.barterAllowed)
                      .map((product) => (
                        <ProductDivView key={Math.random()} product={product} />
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row">
          <Divider />

          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <button
              className="btn-round-sec btn-block"
              type="button"
              onClick={() => navigate(routes.ADD_PRODUCT)}
            >
              Add Products
            </button>
          </div>
          <div className="col-lg-4"></div>
        </div> */}
      </section>
    </>
  );
};
