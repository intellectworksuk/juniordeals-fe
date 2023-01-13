import { PageHeader } from "../Layout";
import bannerImg from "../../view/assets/img/banner.jpg";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import { Typography } from "antd";

const { Title, Paragraph, Text, Link } = Typography;

export const CookiePolicyPage = () => {
  useScrollToTop();

  return (
    <>
      <div className="text-center">
        <h2 className="headingPrimary">
          COOKIES POLICY
          <br />
          <small className="subHeading">Review cookie policy</small>
          <br />
        </h2>
      </div>
      <hr />
      <div className="row" style={{ padding: "30px" }}>
        <p style={{ textAlign: "justify" }}>
          Please read this cookie policy carefully as it contains important
          information on who we are and how we use cookies in our Services. This
          policy should be read together with our Privacy Policy which sets out
          who we are, how to contact us, what data is collected, how and why we
          collect, store, use and share personal information generally, as well
          as your rights in relation to your personal information and details of
          how to contact us and supervisory authorities if you have a complaint.
        </p>

        <h4>1 COOKIES</h4>

        <p style={{ textAlign: "justify" }}>
          A cookie is a small text file that is placed onto your device (e.g.
          your smartphone or other electronic devices) when you use our
          Services. When we use cookies in our Services, you will always be
          informed by a pop-up within the Services&nbsp;.
        </p>

        <p style={{ textAlign: "justify" }}>
          Cookies help us to recognize you and your device and allow us to store
          some information about your preferences or past actions, including,
          where allowed by law, your location data (for more information, please
          see our Privacy Policy).
        </p>

        <p style={{ textAlign: "justify" }}>
          For example, we may monitor how many times you use our Services, which
          parts of the Services you go to, etc. This information helps us to
          understand the use of the Services by our users. Some of this data
          will be aggregated or statistical, which means that we will not be
          able to identify you individually.
        </p>

        <p style={{ textAlign: "justify" }}>
          For further information on our use of cookies, including a detailed
          list of your information which we and others may collect through
          cookies, please see below.
        </p>

        <p style={{ textAlign: "justify" }}>
          For further information on cookies generally, including how to control
          and manage them, visit the guidance on cookies published by the UK
          Information Commissioner&rsquo;s Office,{" "}
          <a href="http://www.aboutcookies.org">www.aboutcookies.org</a> or{" "}
          <a href="http://www.allaboutcookies.org">www.allaboutcookies.org</a>.
        </p>

        <h4>2 CONSENT TO USE COOKIES </h4>

        <p style={{ textAlign: "justify" }}>
          We will ask for your consent to place cookies or other similar
          technologies on your device, except where they are essential for us to
          provide you with a service that you have requested (e.g. to allow you
          to remain logged-in to the Services as you navigate within the
          Services and use the Services functionalities).
        </p>

        <p style={{ textAlign: "justify" }}>
          You can withdraw any consent to the use of cookies or manage any other
          cookie preferences by using the tool made available to you within the
          Services itself. You can then adjust sliders or untick boxes as
          appropriate to reflect your choice. It may be necessary to refresh or
          restart the Services for the updated settings to take effect.
        </p>

        <h4>3 OUR USE OF COOKIES</h4>

        <p style={{ textAlign: "justify" }}>
          The table below provides more information about the cookies we use and
          why:
        </p>

        <table
          style={{
            border: "1px solid rgb(126,126,126)",
            alignSelf: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <thead>
            <tr>
              <th
                style={{ padding: "3px", border: "1px solid rgb(126,126,126)" }}
              >
                <p style={{ textAlign: "justify" }}>
                  <strong>The cookies we use</strong>
                </p>
              </th>
              <th
                style={{ padding: "3px", border: "1px solid rgb(126,126,126)" }}
              >
                <p style={{ textAlign: "justify" }}>
                  <strong>Name</strong>
                </p>
              </th>
              <th
                style={{ padding: "3px", border: "1px solid rgb(126,126,126)" }}
              >
                <p style={{ textAlign: "justify" }}>
                  <strong>Purpose</strong>
                </p>
              </th>
              <th
                style={{ padding: "3px", border: "1px solid rgb(126,126,126)" }}
              >
                <p style={{ textAlign: "justify" }}>
                  <strong>
                    Whether cookie is essential for us to provide you with a
                    service that you have requested and whether we will seek
                    your consent before we place the cookie
                  </strong>
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{ padding: "3px", border: "1px solid rgb(126,126,126)" }}
              >
                <p style={{ textAlign: "justify" }}>
                  <em>[Google Analytics&rsquo;]</em>
                </p>
              </td>
              <td
                style={{ padding: "3px", border: "1px solid rgb(126,126,126)" }}
              >
                <p style={{ textAlign: "justify" }}>
                  <em>[Name, Age, Gender, Email]</em>
                </p>
              </td>
              <td
                style={{ padding: "3px", border: "1px solid rgb(126,126,126)" }}
              >
                <p style={{ textAlign: "justify" }}>
                  <em>
                    Google Analytics uses a set of cookies to collect
                    information and report site usage statistics without
                    personally identifying individual visitors to Google.
                  </em>
                </p>
              </td>
              <td
                style={{ padding: "3px", border: "1px solid rgb(126,126,126)" }}
              >
                <p style={{ textAlign: "justify" }}>
                  <em>[IYes, essential]</em>
                </p>
              </td>
            </tr>
            <tr>
              <td
                style={{ padding: "3px", border: "1px solid rgb(126,126,126)" }}
              >
                <p style={{ textAlign: "justify" }}>
                  <em>[Facebook Pixel]</em>
                </p>
              </td>
              <td
                style={{ padding: "3px", border: "1px solid rgb(126,126,126)" }}
              >
                <p style={{ textAlign: "justify" }}>
                  <em>[Name, Age, Gender, Email]</em>
                </p>
              </td>
              <td
                style={{ padding: "3px", border: "1px solid rgb(126,126,126)" }}
              >
                <p style={{ textAlign: "justify" }}>
                  <em>
                    [Facebook Pixel tracks all hits from the add to website
                    and&nbsp; you can retarget ads to show them only to your
                    website visitors by creating Audiences and using that
                    Audience in an Ad]
                  </em>
                </p>
              </td>
              <td
                style={{ padding: "3px", border: "1px solid rgb(126,126,126)" }}
              >
                <p style={{ textAlign: "justify" }}>
                  <em>[IYes, essential]</em>
                </p>
              </td>
            </tr>
            <tr>
              <td
                style={{ padding: "3px", border: "1px solid rgb(126,126,126)" }}
              ></td>
              <td
                style={{ padding: "3px", border: "1px solid rgb(126,126,126)" }}
              ></td>
              <td
                style={{ padding: "3px", border: "1px solid rgb(126,126,126)" }}
              >
                and using that Audience in an Ad]
              </td>
              <td
                style={{ padding: "3px", border: "1px solid rgb(126,126,126)" }}
              ></td>
            </tr>
          </tbody>
        </table>

        <br />
        <h4>4 HOW TO TURN OFF ALL COOKIES AND CONSEQUENCES OF DOING SO</h4>

        <p style={{ textAlign: "justify" }}>
          If you do not want to accept any cookies, you may be able to change
          your device settings so that cookies (including those which are
          essential to the services requested) are not accepted. If you do this,
          please be aware that you may lose some of the functionality of our
          Services and of other services you use on your device. For further
          information about cookies and how to disable them please go to the
          guidance on cookies published by the UK Information
          Commissioner&rsquo;s Office,{" "}
          <a href="http://www.aboutcookies.org">www.aboutcookies.org</a> or{" "}
          <a href="http://www.allaboutcookies.org">www.allaboutcookies.org</a>.
        </p>

        <h4>5 CHANGES TO THIS POLICY</h4>

        <p style={{ textAlign: "justify" }}>
          This policy was published on 20 October 2022. We may change this
          cookie policy from time to time, when we do we will inform you via the
          Services or by sending an email to the email address you provided when
          you signed up to the Services.
        </p>
      </div>
    </>
  );
};
