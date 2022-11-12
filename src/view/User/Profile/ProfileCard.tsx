import { EditOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Divider, Image, Tag, Typography, Upload } from 'antd'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import Apiconfig from '../../../config/Apiconfig'
import { UserType } from '../../../enums'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { User } from '../../../types'
import { AvatarUpload } from '../../Components'
import * as routes from '../../../constants/routes'
import { matchPath, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const { Paragraph, Text, Title } = Typography

export const ProfileMainCard = () => {
  const navigate = useNavigate()

  const { user } = useAppSelector((state) => state.auth)
  const [profileImage, setProfileImage] = useState<string>('')

  return (
    <Card className="profile-main">
      <div className="profile-main__avatar">
        <button
          style={{
            marginTop: '10px',
            marginRight: '10px',
            position: 'absolute',
            top: 0,
            right: 0
          }}
          className="btn btn-warning btn-md"
          onClick={() =>
            navigate(routes.USER_UPDATE, { state: { userLoc: user } })
          }
        >
          Edit
        </button>
        {user.image ? (
          <Avatar
            size={150}
            src={
              <Image
                preview={false}
                src={`${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${user.image}&type=user`}
              />
            }
            icon={<UserOutlined />}
            className="mb-1"
          />
        ) : (
          <AvatarUpload
            type="user"
            buttonSize={150}
            userImageType="parent"
            onImageSelect={setProfileImage}
          />
        )}
        <Title level={5} className="text--primary">
          {user.fullName}
        </Title>
        <Paragraph>
          <Tag
            icon={<AiOutlineCheckCircle />}
            color={`${
              user?.userType === UserType.PARENT ? 'geekblue' : 'cyan'
            }`}
          >
            &nbsp;{' '}
            {
              Object.keys(UserType)[
                Object.values(UserType).indexOf(user.userType!)
              ]
            }
          </Tag>
        </Paragraph>
      </div>
      <Divider orientation="left">
        <Text strong>Details</Text>
      </Divider>
      <div className="profile-main__details">
        <Paragraph>
          👉 Full Name : <Text>{user.fullName} </Text>
        </Paragraph>
        <Paragraph>
          👉 Contact : <a href={`emailto: ${user.userName}`}>{user.userName}</a>
        </Paragraph>
        <Paragraph>
          👉 Address : <Text>{user.address}</Text>
        </Paragraph>
        <Paragraph>
          👉 Phone Number : <Text>{user.phoneNumber}</Text>
        </Paragraph>
      </div>
    </Card>
  )
}
