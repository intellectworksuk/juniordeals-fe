import React, { Component } from "react";
import { render } from "react-dom";

interface AppProps {
  validate: (isValid: boolean) => void;
}

interface AppState {
  enteredVal: string;
}

export class Captcha extends Component<AppProps, AppState> {
  private ref = React.createRef<HTMLCanvasElement>();
  private captcha: string = "";
  state = { enteredVal: "" };
  componentDidMount() {
    this.redraw();
  }

  private drawCaptchaBackground(ctx: CanvasRenderingContext2D) {
    for (let x = 0; x < 15; x++) {
      let p1 = Math.random() * 225;
      let p2 = Math.random() * 30;

      ctx.beginPath();
      let hue = Math.random() * 360;
      ctx.strokeStyle = `hsl(${hue},100%,50%)`;

      ctx.moveTo(p1, p2);
      let s = 5 - Math.random() * 5;
      ctx.lineTo(p1 + s, p2 + s);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      hue = Math.random() * 360;
      ctx.strokeStyle = `hsl(${hue},100%,50%)`;
      ctx.moveTo(p1 - 3, p2 + 3);
      s = 5 - Math.random() * 5;
      ctx.arc(p1, p2, 2, 0, 2 * Math.PI);

      ctx.stroke();
      ctx.closePath();
    }
  }

  private drawCaptchaFace(ctx: CanvasRenderingContext2D) {
    let x = 0;
    let y = 20;
    let str = "";
    for (let i = 0; i < 6; i++) {
      ctx.save();
      x = 8 + i * 36;

      let hue = Math.random() * 360;
      ctx.fillStyle = `hsl(${hue},50%,50%)`;

      let fontSize = 0;
      do {
        fontSize = Math.random() * 24;
      } while (fontSize < 16);
      ctx.font = "bolder " + fontSize + "px Arial bold";

      ctx.translate(x, y);
      let rot = Math.random() * 120;
      ctx.rotate((60 - rot) * (Math.PI / 180));
      ctx.translate(-x, -y);

      let char = 0;
      do {
        char = Math.random() * 122;
      } while (
        // Uppercase
        !(char >= 65 && char <= 90) &&
        // Lowercase
        !(char >= 97 && char <= 122) &&
        // Numeric
        !(char >= 48 && char <= 57)
      );
      let ch = String.fromCharCode(char);
      str += ch;
      ctx.fillText(ch, x, y);

      ctx.restore();
    }
    this.captcha = str;
  }

  private redraw() {
    let ctx = this.ref?.current?.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 225, 30);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 225, 30);
      this.drawCaptchaBackground(ctx);
      this.drawCaptchaFace(ctx);
    }
  }

  public render() {
    return (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "3px",
          padding: "3px",
          width: "233px",
          boxSizing: "border-box",
          border: "1px solid gray",
        }}
      >
        <canvas
          width="225"
          height="30"
          style={{
            borderRadius: "3px",
          }}
          ref={this.ref}
        />
        <div>
          <input
            style={{
              width: "200px",
              outline: "none",
              border: "1px solid rgb(131, 135, 139)",
              borderRadius: "8px",
              fontSize: "16px",
              backgroundColor: "rgb(239, 242, 244)",
              padding: "2px 2px",
              boxSizing: "border-box",
            }}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                e.preventDefault();
                return false;
              }
            }}
            onChange={(e) => {
              this.setState({ enteredVal: e.target.value });

              this.onSubmitClicked(e.target.value);
            }}
            value={this.state.enteredVal}
            type="text"
          />
          <button
            style={{
              width: "25px",
            }}
            onClick={(e) => {
              e.preventDefault();
              this.onResetClicked();
            }}
          >
            &#x21bb;
          </button>
        </div>
        <br />
        {/* <button
          style={{
            width: "100%",
            borderRadius: "10px",
          }}
          onClick={() => {
            this.onSubmitClicked();
          }}
        >
          Continue
        </button> */}
      </div>
    );
  }

  private onSubmitClicked(enteredVal: string) {
    this.props.validate &&
      this.props.validate(
        enteredVal.toUpperCase() == this.captcha.toUpperCase()
      );
  }

  private onResetClicked() {
    this.captcha = "";
    this.setState({ enteredVal: "" });
    this.redraw();
  }

  private getChar() {
    let str: string = "";
    let chap: any[] = [];
    for (let i = 0; i < 8; i++) {
      let item: any = {};
      let a = 0;
      do {
        a = Math.random() * 90;
      } while (a < 65);
      let char = String.fromCharCode(a);
      item.char = char;
      str += char;

      a = 0;
      do {
        a = Math.random() * 20;
      } while (a < 12);
      item.font = a;

      a = Math.random() * 120;
      item.rotation = a - 60;

      a = Math.random() * 360;
      item.hue = a;

      chap.push(
        <span
          style={{
            color: `hsl(${item.hue}deg,100%,50%)`,
            display: "inline-block",
            padding: "4px",
            fontSize: `${item.font}px`,
            transform: `rotate(${item.rotation}deg)`,
          }}
        >
          {item.char}
        </span>
      );
    }
    this.captcha = str;
    return chap;
  }
}
