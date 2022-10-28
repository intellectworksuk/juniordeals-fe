import { Upload, message, Form } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { getAuthToken } from '../../util/helper'
import React from 'react'
import Apiconfig from '../../config/Apiconfig'
import replace_img_sm from '../assets/img/replace-img-sm.png'

const { Dragger } = Upload
export class DragDropUpload extends React.Component<any, any> {
  state = {
    fileList: [],
  }

  onChange(info: any) {
    const { status } = info.file
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      this.setState(info.fileList)

      if (this.props.onImageSelect) this.props.onImageSelect(info.fileList)

      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  onDrop(e: any) {
    console.log('Dropped files', e.dataTransfer.files)
  }

  render() {
    const props = {
      name: 'file',
      multiple: true,
      action: `${Apiconfig.baseURI}${Apiconfig.endpoints.file.uploadFile}?type=${this.props.type}`,
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    }

    return (
      <>
        <Form.Item name={this.props.ItemName}>
          <Dragger {...props} onChange={this.onChange} onDrop={this.onDrop}>
            <img className="upload-blank" src={replace_img_sm} />
            <p className="ant-upload-hint">
              Strictly prohibit from uploading company data or other band files
            </p>
          </Dragger>
        </Form.Item>
      </>
    )
  }
}
