import { Helmet } from "react-helmet-async";
import { PageHeader } from "../Layout";
import maintenance from "../assets/img/maintenance.jpg";
import ucp from "../assets/img/ucp.png";

export const MaintenancePage = () => {
  return (
    <>
      <Helmet>
        <title>Junior Deals</title>
      </Helmet>
      <div className="ucp">
        <img className="bi-lg" src={ucp} alt="" />
      </div>
    </>
  );
};
