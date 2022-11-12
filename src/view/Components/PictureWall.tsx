import { Upload, Modal, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { getAuthToken } from "../../util/helper";
import Apiconfig from "../../config/Apiconfig";

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
    this.setState({ fileList });

    if (this.props.onImageSelect) this.props.onImageSelect(fileList);
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

    return (
      <>
        <Form.Item name={this.props.ItemName} >
          <Upload
            action={`${Apiconfig.baseURI}${Apiconfig.endpoints.file.uploadFile}?type=${this.props.type}`}
            {...headers}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
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
