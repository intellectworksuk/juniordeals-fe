import { useEffect, useState } from "react";
import { useModal } from ".";
import { Form } from "antd";
import { GoogleMapModal } from ".";

const { Item } = Form;

interface GoogleLocationProps {
  formRef: any;
}

export const GoogleLocationInput = (props: GoogleLocationProps) => {
  const { isShown, toggle } = useModal();

  const notifyLocationChange = (location: any) => {
    setPinLocation(location);
  };

  const [{ lat, lng, pinpoint }, setPinLocation] = useState<any>({
    lat: "",
    lng: "",
    pinpoint: "",
  });

  useEffect(() => {
    props.formRef.setFieldsValue({ Address: pinpoint });
    props.formRef.setFieldsValue({ longitude: lng });
    props.formRef.setFieldsValue({ latitude: lat });
  }, [pinpoint]);

  return (
    <>
      <Item
        name="Address"
        rules={[
          {
            required: true,
            message: "Please input your location!",
          },
        ]}
      >
        <input
          onClick={toggle}
          readOnly={true}
          className="inpCtrl"
          placeholder="Click to select location"
        />
      </Item>
      <Item name="longitude" hidden={true}>
        <input></input>
      </Item>
      <Item name="latitude" hidden={true}>
        <input></input>
      </Item>
      <GoogleMapModal
        showModal={isShown}
        onLocationChange={notifyLocationChange}
        width={"100%"}
        height={"400px"}
      ></GoogleMapModal>
    </>
  );
};
