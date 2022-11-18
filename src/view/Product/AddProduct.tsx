import { DragDropUpload, TextEditor } from "../../view";
import { Form, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../util/notifications";
import { CreateProductData, ProductResponse } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as ProductService from "../../store/product/product.actions";
import { UserType } from "../../enums";
import {
  clearProductStateError,
  clearProductStateStatus,
} from "../../store/product/product.slice";
import useEffectOnce from "../../hooks/useEffectOnce";
import * as ConfigService from "../../store/config/config.actions";
import { UploadPictureWall } from "../Components/PictureWall";

const { Item } = Form;

interface ProductUploadPageProps {
  signupType: UserType.PARENT;
}

export const AddProductPage = (props: ProductUploadPageProps) => {
  const [form] = Form.useForm();

  const location = useLocation();

  const dispatch = useAppDispatch();

  const { setups } = useAppSelector((state) => state.config);

  const product = location.state as ProductResponse;

  const { status: productStatus, error: productError } = useAppSelector(
    (state) => state.product
  );

  const navigate = useNavigate();

  const onFormSubmit = (formData: CreateProductData) => {
    if (location.pathname.endsWith("/product/add")) {
      dispatch(ProductService.createProduct(formData));
    } else {
      formData.id = product.id;

      dispatch(ProductService.updateProduct(formData));
    }
  };

  const onFinishFailed = () => {
    displayErrorMessage(
      "Please complete all required form fields, or remove errors!"
    );
    return;
  };

  // useEffect(() => {
  //   if (productError) {
  //     displayErrorMessage(productError);
  //   };

  //   dispatch(clearProductStateError());
  // }, [dispatch, productError]);

  useEffect(() => {
    if (productStatus === "createProductResolved") {
      // displaySuccessNotification("Product has been uploaded");
      dispatch(ProductService.fetchUserProducts());

      form.resetFields();

      form.setFieldsValue({ productImages: [] });
    }

    // dispatch(clearProductStateStatus());
  }, [dispatch, productStatus]);

  useEffectOnce(() => {
    dispatch(ConfigService.fetchCategories());
  });

  useEffect(() => {
    if (product && product.title) {
      form.setFieldsValue({ title: product.title });
      form.setFieldsValue({ subTitle: product.subTitle });
      form.setFieldsValue({ description: product.description });
      form.setFieldsValue({ description: product.description });
      form.setFieldsValue({ specification: product.specification });
      form.setFieldsValue({ quantity: product.quantity });
      form.setFieldsValue({ rate: product.rate });
      form.setFieldsValue({ categoryId: product.categoryId });
      form.setFieldsValue({ condition: product.condition });
      form.setFieldsValue({ barter: product.barterAllowed ? "1" : "2" });
    }
  }, [product]);

  return (
    <>
      <Form
        form={form}
        onFinish={onFormSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h2 className="text-center">Create New Item</h2>
        <h4 className="text-center">
          Upload image(s) and add relevant description for item you want to sell
          or barter
        </h4>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
            {/* <DragDropUpload
                  ItemName="productImages"
                  type="product"
                ></DragDropUpload> */}
            <UploadPictureWall
              ItemName="productImages"
              buttonText="Product Images"
              type="product"
            ></UploadPictureWall>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
            <h4 className="text-center headingPrimary">
              Description Section about Item
              <br />
              <small className="subHeading">
                In this section you must fill some relevant information about
                the item to complete the upload process
              </small>
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
            <Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please enter what defines the title of the product",
                },
              ]}
            >
              <input
                maxLength={30}
                className="inpCtrl"
                placeholder="Title / Heading of item"
              />
            </Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
            <Item
              name="subTitle"
              rules={[
                {
                  required: true,
                  message:
                    "Please enter what defines the sub title of the product",
                },
              ]}
            >
              <input
                maxLength={50}
                className="inpCtrl"
                placeholder="Sub Title / Heading of item"
              />
            </Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2 col-lg-offset-2">
            <Item
              name="quantity"
              rules={[
                {
                  required: true,
                  message:
                    "Please enter what defines the quantity of the product",
                },
                {
                  pattern: /^[0-9]{1,2}$/,
                  message: "Only 2 digits number are allowed",
                },
              ]}
            >
              <input
                maxLength={10}
                className="inpCtrl"
                placeholder="Enter quantity"
              />
            </Item>
          </div>
          <div className="col-lg-2">
            <Item
              name="rate"
              rules={[
                {
                  required: true,
                  message:
                    "Please enter what defines the points of the product",
                },
                {
                  pattern: /^[0-9]{1,5}$/,
                  message: "Only 5 digits number are allowed",
                },
              ]}
            >
              <input
                maxLength={10}
                className="inpCtrl"
                placeholder="Enter points"
              />
            </Item>
          </div>
          <div className="col-lg-4">
            <Item
              name="categoryId"
              rules={[
                {
                  required: true,
                  message:
                    "Please enter what defines the category of the product",
                },
              ]}
            >
              <select className="inpCtrl">
                <option value="0">Category</option>

                {setups.categories.map((cat) => (
                  <option value={cat.id.toString()} key={cat.id.toString()}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-lg-offset-2">
            <Item
              name="condition"
              rules={[
                {
                  required: true,
                  message:
                    "Please enter what defines the condition of the product",
                },
              ]}
            >
              <select className="inpCtrl">
                <option value="0">Condition</option>
                <option value="1">Good</option>
                <option value="2">Perfect</option>
                <option value="3">Damaged</option>
                <option value="4">Better</option>
              </select>
            </Item>
          </div>
          <div className="col-lg-4">
            <Item
              name="barter"
              rules={[
                {
                  required: true,
                  message:
                    "Please enter what defines the rate/price of the product",
                },
              ]}
            >
              <select className="inpCtrl">
                <option value="0">Deal Type</option>
                <option value="1">For Barter</option>
                <option value="2">For Sell</option>
              </select>
            </Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
            <Item
              name="description"
              rules={[
                {
                  required: true,
                  message:
                    "Please enter what defines the description of the product",
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
              ></textarea>
            </Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
            <Item
              name="specification"
              rules={[
                {
                  required: true,
                  message: "Please enter the specifications of the product",
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
              {/* @ts-ignore */}
              <TextEditor placeholder="Product specifications" />
            </Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
            <button
              className="formBtnCtrl"
              type="submit"
              disabled={productStatus === "createProductPending"}
            >
              <span id="button-text">
                {productStatus === "createProductPending" ? (
                  <Spin size="small" />
                ) : (
                  "Upload Product Now"
                )}
              </span>
            </button>
          </div>
        </div>
      </Form>
    </>
  );
};
