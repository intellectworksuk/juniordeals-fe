import { Upload, message, Form } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import React from 'react'
import { getAuthToken } from '../../util/helper'
import Apiconfig from '../../config/Apiconfig'

function getBase64(img: any, callback: any) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file: any) {
  const allowedImgFormats =
    file.type === 'image/jpeg' ||
    file.type === 'image/jpg' ||
    file.type === 'image/webp' ||
    file.type === 'image/gif'

  if (!allowedImgFormats) {
    message.error('You can only upload JPG/PNG file!')
  }

  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }

  return allowedImgFormats && isLt2M
}

export class SingleUpload extends React.Component<any, any> {
  state = {
    loading: false,
    imageUrl: '',
    fileList: [],
  }

  handleChange = (info: any) => {
    let fileList = [...info.fileList]

    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'error') {
      this.setState({ loading: false })
      return
    }
    if (info.file.status === 'done') {
      const { response } = info.file
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) =>
        this.setState({
          imageUrl,
          loading: false,
          fileList: info.file.fileList,
        }),
      )

      fileList = fileList.map((file) => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.result
        }
        return file
      })
    }

    this.props.onImageSelect(fileList[0])
  }

  render() {
    const { loading, imageUrl } = this.state
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>{this.props.buttonText}</div>
      </div>
    )

    const headers = {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }

    const getFile = (e: any) => {
      console.log('Upload event:', e)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList.slice(-1)
    }

    return (
      // <Form.Item
      //   name="Image"
      //   getValueFromEvent={getFile}
      // >
      <Upload
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={`${Apiconfig.baseURI}${Apiconfig.endpoints.file.uploadFile}?type=${this.props.type}`}
        {...headers}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        maxCount={1}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
      // </Form.Item>
    )
  }
}
