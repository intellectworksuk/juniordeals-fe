import { LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Image, message, Upload } from 'antd'
import React, { useState } from 'react'
import Apiconfig from '../../config/Apiconfig'
import { store } from '../../store'
import { getAuthToken } from '../../util/helper'

const getBase64 = (img: any, callback: any) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: any) => {
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

interface AvatarUploadProps {
  type: string
  buttonSize: number
  userImageType: string
  onImageSelect?: (image: string) => void
}

export const AvatarUpload = (props: AvatarUploadProps) => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()

  const handleChange = (info: any) => {
    let fileList = [...info.fileList]

    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url: any) => {
        setLoading(false)
        setImageUrl(url)
      })

      fileList = fileList.map((file) => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.result
        }
        return file
      })
      if (props.onImageSelect) {
        props.onImageSelect(fileList[0])
      }
    }
    if (info.file.status === 'error') {
      setLoading(false)
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  const uploadButton = (
    <Avatar
      size={props.buttonSize}
      // src={user.image}
      icon={<UserOutlined />}
      className="mb-1"
    />
  )

  const uplprops = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    // className: "avatar-uploader",
    action: `${Apiconfig.baseURI}${Apiconfig.endpoints.file.uploadFile}?type=${props.type}`,
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  }

  const margin = props.userImageType === 'kid' ? { margin: '50px 20px' } : {}

  return (
    <>
      <div style={margin}>
        <Upload
          {...uplprops}
          listType="picture"
          beforeUpload={beforeUpload}
          onChange={handleChange}
          maxCount={1}
        >
          {imageUrl ? (
            <Avatar
              size={props.buttonSize}
              src={
                <Image
                  preview={false}
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: '100%',
                  }}
                />
              }
              icon={<UserOutlined />}
              className="mb-1"
            />
          ) : loading ? (
            <LoadingOutlined />
          ) : (
            uploadButton
          )}
        </Upload>
      </div>
    </>
  )
}
