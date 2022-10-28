import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  StandaloneSearchBox,
  LoadScript,
} from "@react-google-maps/api";
import Geocode from "react-geocode";
import { AnyAction } from "redux";

const GMAPS_API_KEY = "AIzaSyBAwlXYDbl6eeVRb0dlDyQo8Pv7ud6rJrY";

// const mapOptions = {
//   address: "London, United Kingdom",
//   position: {
//     latitude: 51.50853,
//     longitude: -0.12574,
//   },
// };

const initLat = 51.509865;
const initLng = -0.118092;

Geocode.setApiKey(GMAPS_API_KEY);

const containerStyle = {
  width: "100%",
  height: "400px",
};

interface GoogleMapProps {
  showModal: boolean;
  onLocationChange: (location: {
    lat: Number;
    lng: Number;
    pinpoint: string;
  }) => void;
  width: string;
  height: string;
}

export const GoogleMapModal = (props: GoogleMapProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchBox, setSearchBox] = useState<any>(null);
  const [location, setLocation] = useState<any>({
    lat: initLat,
    lng: initLng,
    pinpoint: "United Kingdom",
  });
  const [center, setCenter] = useState<any>({ lat: initLat, lng: initLng });
  const [position, setPosition] = useState<any>({ lat: initLat, lng: initLng });
  const [locationAddress, setLocationAddress] = useState("");
  const [map, setMap] = React.useState<any>(null);

  useEffect(() => {
    setIsModalVisible(props.showModal);
  }, [props.showModal]);

  const showModal = () => {
    props.onLocationChange(location);

    setIsModalVisible(false);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const onSBLoad = (ref: any) => {
    setSearchBox(ref);
  };

  const onMarkerLoad = (marker: any) => {
    // console.log(marker);
  };

  const onPlacesChanged = () => {
    // console.log(searchBox.getPlaces());
    let results: any = searchBox.getPlaces();
    // console.log(results);
    let markerArray: any = [];
    let formattedAddress: any = [];
    // let results = this.searchBox.getPlaces();
    for (let i = 0; i < results.length; i++) {
      let place: any = results[i].geometry.location;
      formattedAddress.push(results[i].formatted_address);
      markerArray.push(place);
    }
    // console.log(markerArray);
    setCenter(markerArray[0]);
    setPosition(markerArray[0]);
    // setLocation({lat:markerArray[0].lat(),lng:markerArray[0].lng(),address:formattedAddress[0]});
    setLocationAddress(formattedAddress[0]);
    setLocation({
      lat: markerArray[0].lat(),
      lng: markerArray[0].lng(),
      pinpoint: formattedAddress[0],
    });

    // closeModal();
    // this.setState({ markers: markerArray });
  };

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const onMarkerDragEnd = (event: any) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setLocation({ lat, lng });
    setCenter({ lat, lng });
    setPosition({ lat, lng });
    // const bounds = new window.google.maps.LatLngBounds(latLng);
    // map.fitBounds(bounds);
    // setMap(map)
    Geocode.fromLatLng(lat, lng).then(
      (response: { results: { formatted_address: any }[] }) => {
        const pinpoint = response.results[0].formatted_address;
        setLocation({ lat, lng, pinpoint });
        setLocationAddress(pinpoint);
      },
      (error: any) => {
        console.error(error);
      }
    );
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalVisible}
        onOk={showModal}
        onCancel={hideModal}
        width={props.width}
        style={{ height: props.height }}
      >
        <LoadScript
          id="google-map-script"
          googleMapsApiKey={GMAPS_API_KEY}
          libraries={["places"]}
        >
          <div id="searchbox">
            <StandaloneSearchBox
              onLoad={onSBLoad}
              onPlacesChanged={onPlacesChanged}
              bounds={position}
            >
              <input
                type="text"
                ref={searchBox}
                placeholder="Search places"
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `240px`,
                  height: `32px`,
                  padding: `0 12px`,
                  borderRadius: `3px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                  position: "absolute",
                  left: "50%",
                  marginLeft: "-120px",
                  zIndex: 999,
                }}
              />
            </StandaloneSearchBox>
          </div>

          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onUnmount={onUnmount}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <Marker
              onLoad={onMarkerLoad}
              position={position}
              draggable={true}
              onDragEnd={(e) => onMarkerDragEnd(e)}
            ></Marker>
          </GoogleMap>
        </LoadScript>
      </Modal>
    </>
  );
};
