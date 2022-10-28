import { useNavigate } from "react-router-dom";
import * as routes from "../../constants/routes";
import { useAppSelector } from "../../hooks/reduxHooks";
import { store } from "../../store";

export const JoinUsSection = () => {
  const navigate = useNavigate();

  const { user } = useAppSelector(state => state.auth);

  return (
    <>
      {!user.userName && <div className="sec-join-us">
        <div className="banner-form">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-9">
                <div className="jsfBody">
                  <br />
                  <b><h3>Join us</h3></b>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                {/* <div className="jsfBody"> */}
                {/* <div className="jsfInp-ctrl"> */}
                {/* <input
                      type="text"
                      className="regUser"
                      placeholder="Sign up with your active email"
                    />*/}
                <button
                  type="button"
                  className="btn-round btn-block"
                  onClick={() => navigate(routes.USER_SIGNUP)}
                >
                  Sign up
                </button>
                {/* </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
};
