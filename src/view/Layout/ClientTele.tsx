import { MouseEventHandler } from "react";

declare global {
  interface Window {
    plusSlides: (index: number) => MouseEventHandler<HTMLAnchorElement>;
    currentSlide: (index: number) => MouseEventHandler<HTMLAnchorElement>;
  }
}

export const ClientTeleSection = () => {
  return (
    <>
      <div className="sec-clientele">
        <div className="slideshow-container">
          <div className="commentSlides" style={{ display: "block" }}>
            <q>
              I love you the more in that I believe you had liked me for my own
              sake and for nothing else
            </q>
            <br />
            <img
              className="userCom"
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt=""
            />
            <p className="author">- Nina Hemingway</p>
          </div>

          <div className="commentSlides">
            <q>
              But man is not made for defeat. A man can be destroyed but not
              defeated.
            </q>
            <br />
            <img
              className="userCom"
              src="https://randomuser.me/api/portraits/men/12.jpg"
              alt=""
            />
            <p className="author">- John Keats</p>
          </div>

          <div className="commentSlides">
            <q>
              I have not failed. I've just found 10,000 ways that won't work.
            </q>
            <br />
            <img
              className="userCom"
              src="https://randomuser.me/api/portraits/women/47.jpg"
              alt=""
            />
            <p className="author">- Kristina Angel</p>
          </div>

          <a className="prev" onClick={window["plusSlides"](-1)}>
            &#10094;
          </a>
          <a className="next" onClick={window["plusSlides"](1)}>
            &#10095;
          </a>
        </div>
        <div className="dot-container">
          <span
            className="dot active"
            onClick={window["currentSlide"](1)}
          ></span>
          <span className="dot" onClick={window["currentSlide"](2)}></span>
          <span className="dot" onClick={window["currentSlide"](3)}></span>
        </div>
      </div>
    </>
  );
};
