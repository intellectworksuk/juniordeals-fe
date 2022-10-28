import React from "react";
import { IoLogoGithub, IoLogoLinkedin, IoMdMail } from "react-icons/all";
import { Link } from "react-router-dom";
import jd_black_logo from "../assets/img/jd-black.png";
import * as routes from "../../constants/routes";

export const PageFooter = () => {
  return (
    <>
      <div className="sec-site-footer">
        <div className="footer-desc">
          <div className="logo-head">
            <img
              src={jd_black_logo}
              alt="JuniorDeals-Brand-logo"
              className="logo-dark"
            />
          </div>
          <div className="company-desc">
            Junior Deals (JD) is a technological application that promotes
            financial responsibility and instills a sense of safe barter of
            belongings in children. We aim to target the youth of the UK,
            encouraging them to step up, take responsibility, and understand the
            worth of materialistic things that they own. Parents in the UK are a
            huge market that demands an effective solution to instill a feeling
            of responsible savings and the value of their possessions.
          </div>
          <div className="desc-social">
            <ul className="social-footer">
              <li>
                <a href="">
                  <i className="mdi mdi-youtube mdi-36px"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i className="mdi mdi-instagram mdi-36px"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i className="mdi mdi-facebook mdi-36px"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i className="mdi mdi-twitter mdi-36px"></i>
                </a>
              </li>
              <li>
                <a href="">moreinfo@juniordeals.co.uk</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-nav">
          <ul className="micro-navigation">
            <li>
              <Link to={routes.HOME} className="btn-link">
                Home
              </Link>
            </li>
            <li>
              <Link
                to={routes.FETCH_STORE_PRODUCT}
                state={{ ["product"]: "active" }}
                className="btn-link"
              >
                Barter
              </Link>
            </li>
            <li>
              <Link
                to={routes.FETCH_STORE_PRODUCT}
                state={{ ["barter"]: "active" }}
                className="btn-link"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to={routes.USER_PROFILE}
                state={{ activeTabIndex: "5" }}
                className="btn-link"
              >
                My Wallet
              </Link>
            </li>
            <li>
              <a href="">About Us</a>
            </li>
            <li>
              <a href="">How it works</a>
            </li>
            <li>
              <a href="">Join Us</a>
            </li>
            <li>
              <a href="">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="footer-contact-form">
          <div className="micro-head">Send your suggestions and queries</div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <input
                  type="text"
                  className="footer-input"
                  placeholder="Full Name*"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <input
                  type="text"
                  className="footer-input"
                  placeholder="Email Address*"
                />
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <textarea maxLength={100}
                  className="footer-input"
                  placeholder="Message*"
                ></textarea>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6"></div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <button type="button" className="footer-btn">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sec-site-bottomline">
        <p className="bottomline-text">
          copyrights 2022 @ juniordeals.co.uk - All rights reserved
        </p>
      </div>
    </>
  );
};
