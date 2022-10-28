import bannerImg from "../../view/assets/img/banner.jpg";

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
        <div className="bannerImg">
          <img src={bannerImg} alt="" />
        </div>
      )}
    </>
  );
};
