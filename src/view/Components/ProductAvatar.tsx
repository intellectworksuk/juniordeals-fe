import { Avatar, Image } from "antd";
import { matchPath, useLocation } from "react-router-dom";
import { ProductImageResponse } from "../../types";
import * as routes from "../../constants/routes";
import Apiconfig from "../../config/Apiconfig";
import noImageIcon from "../assets/img/jd-icon.png";

interface ProductAvatarProps {
  productImage?: ProductImageResponse[];
}

export const ProductAvatar = (props: ProductAvatarProps) => {
  const location = useLocation();

  let imagePath = "404";

  if (props.productImage) {
    if (props.productImage.length > 0) {
      if (props.productImage[0].fileName.length > 0) {
        imagePath = `${Apiconfig.baseURI}${routes.DOWNLOAD_IMAGE}${props.productImage[0].fileName}&type=product`;
      }
    }
  }

  return (
    <>
      {imagePath === "404" ? (
        <Avatar
          shape="square"
          style={{ backgroundColor: "rgb(255,255,255)", width: "128px", height: "64px" }}
        >
          <Image preview={false} src={noImageIcon} />
        </Avatar>
      ) : (
        <Avatar
          size={128}
          shape="square"
          style={{ backgroundColor: "rgb(255,255,255)" }}
        >
          <Image preview={false} src={imagePath} />
        </Avatar>
      )}
    </>
  );
};
