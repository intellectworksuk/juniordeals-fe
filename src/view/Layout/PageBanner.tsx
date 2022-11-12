import { Carousel } from "antd";
import bannerImg from "../../view/assets/img/banner.jpg";
import bannerImg2 from "../../view/assets/img/banner2.jpg";

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
        <Carousel autoplay>
          <div className="bannerImg">
            <img src={bannerImg2} alt="" />
          </div>
          {/* <div className="bannerImg">
            <img src={bannerImg} alt="" />
          </div> */}
        </Carousel>
      )}
    </>
  );
};
