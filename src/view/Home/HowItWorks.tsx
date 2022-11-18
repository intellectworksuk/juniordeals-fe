import howItWorks from "../assets/img/how-it-works.jpg";
import getStarted from "../assets/img/get-started.jpg";
import { useScrollToTop } from "../../hooks/useScrollToTop";

export const HowItWorksPage = () => {
  useScrollToTop();

  return (
    <>
      <div className="company-block">
        {/* <div className="row">
          <div className="col-md-12">
            <h2 className="text-center headingPrimary">
              How the platform works
            </h2>
          </div>
        </div> */}
        <div className="row" style={{ marginTop: "48px" }}>
          <div className="col-lg-6 col-md-6">
            <img className="img-rounded" width="100%" src={howItWorks} />
          </div>
          <div className="col-lg-6 col-md-6">
            <h2 className="headingPrimary">How the platform works</h2>

            <ul>
              <li>
                1. A web-based trading platform targets the UK market for
                children up to teenage and older.
              </li>
              <li>
                3. Children will be able to trade, negotiate, and purchase
                points as trading platform currency (JD Currency)
              </li>
              <li>
                4. Children will be allowed to interact via the app under
                parental supervision.
              </li>
              <li>
                5. Children's items, including toys, computer games, books,
                collectables, artwork, etc., will be bartered.
              </li>
              <li>
                6. Children can explore their requirements by searching for
                products.
              </li>
              <li>
                7. Children can list their goods for sale or trade on the site.
              </li>
              <li>
                8. Parents could deposit JD currency into their children's
                wallets.
              </li>
              <li>
                9. Parents can set up a digital wallet for their children and
                load it with JD currency to enable supervised spending on the JD
                platform.
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <h2 className="headingPrimary">How to get started</h2>
          </div>
        </div>
        <div className="row" style={{ marginTop: "48px" }}>
          <div className="ccol-lg-6 col-md-6">
            <ul>
              <li>1. Activate your account through email verification</li>
              <li>2. Log into your account</li>
              <li>
                3. Finish your profile and buy JD points from Junior Deals{" "}
              </li>
              <li>4. Create the child profile and assign JD points to child</li>
              <li>
                5. Manage your child’s activity profile, wallet spending and
                grant deal approvals.
              </li>
              <li>6. Setup items to selling or for barter.</li>
              <li>
                7. Connect, chat, negotiate and finalize a deal through barter
                or buying/ selling an item.
              </li>
              <li>8. Give and receive feedback on the deal experience!</li>
            </ul>
          </div>
          <div className="col-lg-6 col-md-6">
            <img className="img-rounded" width="100%" src={getStarted} />
          </div>
        </div>
      </div>
    </>
  );
};
