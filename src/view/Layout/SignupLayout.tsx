import React, { ReactChild, ReactNode } from 'react'
import { GrInherit } from 'react-icons/gr'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { UserType } from '../../enums'
import {
  PageHeader,
  PageBanner,
  PageFooter,
  NotFound,
  LoginPage,
  SignUpPage,
  JoinUsSection,
} from '../../view'
import { EditProfilePage } from '../User/EditProfile'

const ChildSignupLayout = (props: {
  children: ReactNode | null | undefined
}) => {
  return (
    <>
      <PageHeader
        bannerImage="https://images.unsplash.com/photo-1535572290543-960a8046f5af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        useBannerAsStrip={true}
      />

      <section className="sec-form-controller">
        <div className="gen-form-holder" style={{ height: '1450px' }}>
          <div className="form-block">
            <main>{props.children}</main>
          </div>
          <div
            className="img-block"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1554343594-1c9d305bd51f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1159&q=80')",
            }}
          ></div>
        </div>
      </section>
      <JoinUsSection />
      <PageFooter />
    </>
  )
}

const ParentSignupLayout = (props: {
  children: ReactNode | null | undefined
}) => {
  return (
    <>
      <PageHeader
        bannerImage="https://images.unsplash.com/photo-1537655780520-1e392ead81f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        useBannerAsStrip={true}
      />

      <section className="sec-form-controller">
        <div className="gen-form-holder" style={{ height: '1450px' }}>
          <div className="form-block">
            <main>{props.children}</main>
          </div>
          <div
            className="img-block"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1472739841375-d0ea9f0cb6a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80')",
            }}
          ></div>
        </div>
      </section>
      <JoinUsSection />
      <PageFooter />
    </>
  )
}

const LoginLayout = (props: { children: ReactNode | null | undefined }) => {
  return (
    <>
      <PageHeader
        bannerImage="https://images.unsplash.com/photo-1553158399-3796bdbc82fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        useBannerAsStrip={true}
      />

      <section className="sec-form-controller">
        <div className="gen-form-holder" style={{ height: '550px' }}>
          <div className="form-block">
            <main>{props.children}</main>
          </div>
          <div
            className="img-block"
            style={{
              backgroundImage:
                "url('https://webneel.com/daily/sites/default/files/images/daily/02-2021/14-funny-3d-model-character-will-smith-gabriel-soares.jpg')",
            }}
          ></div>
        </div>
      </section>
      <JoinUsSection />
      <PageFooter />
    </>
  )
}

export const SignupNavigation = () => {
  const location = useLocation()

  return (
    <>
      {location.pathname.endsWith('p-signup') ? (
        <ParentSignupLayout>
          <Routes>
            <Route
              path="/p-signup"
              element={<SignUpPage signupType={UserType.PARENT} />}
            />
          </Routes>
        </ParentSignupLayout>
      ) : location.pathname.endsWith('') ? (
        <ChildSignupLayout>
          <Routes>
            <Route
              path="/c-signup"
              element={<SignUpPage signupType={UserType.CHILD} />}
            />
          </Routes>
        </ChildSignupLayout>
      ) : (
        <Routes>
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      )}
    </>
  )
}

export const LoginNavigation = () => {
  // const { setToken } = useToken();

  return (
    <>
      <LoginLayout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </LoginLayout>
    </>
  )
}
