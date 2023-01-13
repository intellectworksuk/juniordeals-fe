import { Upload, Modal, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { getAuthToken } from "../../util/helper";
import Apiconfig from "../../config/Apiconfig";
import { displayErrorMessage } from "../../util/notifications";
import { async } from "@firebase/util";
import { resolve } from "node:path/win32";

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const getFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export class UploadPictureWall extends React.Component<any, any> {
  state = {
    validated: false,
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = ({ fileList }: { fileList: any }) => {
    if (this.state.validated) {
      this.setState({ fileList });

      if (this.props.onImageSelect) this.props.onImageSelect(fileList);
    }
  };

  validateSizeAndTypeImage = (file: any) => {
    const allowedImgFormats =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/webp" ||
      file.type === "image/gif";

    this.state.validated = true;

    if (!allowedImgFormats) {
      displayErrorMessage("You can only upload JPG/GIF file!");
      this.state.validated = false;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      displayErrorMessage("Image must smaller than 2MB!");
      this.state.validated = false;
    }

    return this.state.validated;
  };

  checkImageDimensions = (file: any): Promise<boolean> => {
    this.state.validated = this.validateSizeAndTypeImage(file);

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", (event) => {
        const _loadedImageUrl = event.target?.result;
        const image = document.createElement("img");
        image.src = _loadedImageUrl as string;

        image.addEventListener("load", () => {
          const { width, height } = image;

          if (this.state.validated) {
            if (width < 300 || height < 300) {
              displayErrorMessage("Image dimension should be minimum 300*300");
              this.state.validated = false;
              resolve(false);
            } else {
              this.state.validated = true;

              resolve(true);
            }
          } else {
            this.state.validated = false;

            resolve(false);
          }
        });
      });
    });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>{this.props.buttonText}</div>
      </div>
    );
    const headers = {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    };

    if (this.props.clearState === true) {
      this.state.fileList = [];
    }

    return (
      <>
        <Form.Item name={this.props.ItemName}>
          <Upload
            action={`${Apiconfig.baseURI}${Apiconfig.endpoints.file.uploadFile}?type=${this.props.type}`}
            {...headers}
            listType="picture-card"
            fileList={fileList}
            // onPreview={this.handlePreview}
            accept={"image/jpeg, image/jpg, image/webp, image/gif"}
            onChange={this.handleChange}
            beforeUpload={this.checkImageDimensions}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
