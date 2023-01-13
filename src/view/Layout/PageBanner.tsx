import { Carousel } from "antd";
import bannerImg from "../../view/assets/img/banner.jpg";
import bannerImg2 from "../../view/assets/img/banner2.jpg";
import bannerImg3 from "../../view/assets/img/banner3.jpg";

interface PageBannerProps {
  bannerImage: string;
  useBannerAsStrip: boolean;
}

export const PageBanner = (props: PageBannerProps) => {
  return (
    <>
      {props.useBannerAsStrip ? (
        <div
          className="bannerStrip"
          style={{
            backgroundImage: `url('${props.bannerImage}')`,
          }}
        ></div>
      ) : (
        <Carousel className="jd-slider" autoplay>
          <div className="bannerImg">
            <img className="bi-lg" src={bannerImg2} alt="" />
            <img className="bi-xs" src={bannerImg3} alt="" />
          </div>
          {/* <div className="bannerImg">
            <img src={bannerImg} alt="" />
          </div> */}
        </Carousel>
      )}
    </>
  );
};
