import { PageHeader } from "../Layout";
import bannerImg from "../../view/assets/img/banner.jpg";
import { useScrollToTop } from "../../hooks/useScrollToTop";

export const ContactUsPage = () => {
  useScrollToTop();

  return (
    <>
      <div className="text-center contact-generic">
        <h2 className="headingPrimary">
          <br />
          <br />
          Contact Us
          <br />
          <small className="subHeading">
            Yes you can directly talk to our team; we are here to assist you
          </small>
        </h2>
        <hr />
        <div className="row">
          <div className="col-lg-4 col-lg-offset-2 col-md-4 col-md-offset-2 text-left">
            <h3 className="headingPrimary">Our London Office</h3>
            <hr />
            <p>
              115 London Road
              <br />
              Morden, England
              <br />
              SM4 5HP
              <br />
              --------------------------------
              <br />
              +44 7448 454910 
              <br />
              www.juniordeals.co.uk
              <br />
            </p>
            <br />
            <br />
          </div>
          <div className="col-lg-4 col-md-4 text-left">
            <h3 className="headingPrimary">Find us on Social Media</h3>
            <hr />
            <a
              href="https://www.facebook.com/people/Junior-Deals/100086375535835/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="mdi mdi-facebook mdi-24px"></i>&emsp;Our Face book
              page
            </a>
            <br />
            <a href="#" target="_blank" rel="noreferrer">
              <i className="mdi mdi-twitter mdi-24px"></i>&emsp;Our Twitter
              Account
            </a>
            <br />
            <a
              href="https://www.instagram.com/junior.deals/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="mdi mdi-instagram mdi-24px"></i>&emsp;Our Instagram
              page
            </a>
            <br />
            <a
              href="https://www.youtube.com/channel/UCHcoWhjaAZGRLKulSCfSD9w"
              target="_blank"
              rel="noreferrer"
            >
              <i className="mdi mdi-youtube mdi-24px"></i>&emsp;Our Youtube
              Channel
            </a>
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2487.835625321984!2d-0.20696327668299125!3d51.42444606915178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487608b5d802ca79%3A0xa523aba7a638941!2sStrawberry%20Strings!5e0!3m2!1sen!2s!4v1654233067967!5m2!1sen!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <hr />
        {/* <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-8">
            <h3 className="headingPrimary">
              Send Message
              <br />
              <small className="subHeading">
                We are open for all kind of queries and suggestions
              </small>
            </h3>
          </div>
        </div> */}
        {/* <form action="">
          <div className="row">
            <div className="col-lg-4 col-lg-offset-2 col-md-4 col-md-offset-2">
              <input type="text" className="inpCtrl" placeholder="First Name" />
            </div>
            <div className="col-lg-4 col-md-4 form-feild-margin">
              <input type="text" className="inpCtrl" placeholder="Last Name" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-lg-offset-2 col-md-4 col-md-offset-2">
              <input
                type="text"
                className="inpCtrl"
                placeholder="Email Address"
              />
            </div>
            <div className="col-lg-4 col-md-4 form-feild-margin">
              <input
                type="text"
                className="inpCtrl"
                placeholder="Contact Number"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2">
              <textarea
                className="inpCtrl"
                placeholder="Your Message"
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2">
              <button className="btn-round-sec" type="button">
                Send Message
              </button>
              <br />
              <br />
            </div>
          </div>
        </form> */}
      </div>
    </>
  );
};
