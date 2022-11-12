import { Helmet } from "react-helmet-async";
import { PageHeader } from "../Layout";
import maintenance from "../assets/img/maintenance.jpg";

export const MaintenancePage = () => {
  return (
    <>
      <Helmet>
        <title>Junior Deals</title>
      </Helmet>

      <div className="row">
        <div className="col-lg-12">
          <img src={maintenance} style={{ marginLeft: 35 }} />
        </div>
      </div>
    </>
  );
};
