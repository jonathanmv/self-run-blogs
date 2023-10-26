// https://stackoverflow.com/a/50913569/1128216
export {};

// https://www.totaltypescript.com/how-to-properly-type-window#solution-3-single-module-override
type Helper = {
  dpi: number;
  a4InPixels: {
    width: number;
    height: number;
  };
};

declare const window: {
  helper: Helper;
} & Window;

const getDPI = () => {
  const div = document.createElement("div");
  div.style.width = "1in";
  div.style.height = "1in";
  div.style.position = "absolute";
  div.style.left = "-100%";
  div.style.top = "-100%";
  document.body.appendChild(div);
  const dpi = div.offsetHeight;
  document.body.removeChild(div);
  return dpi;
};

const dpi = getDPI();
const a4InPixels = {
  width: Math.ceil(dpi * 8.27),
  height: Math.ceil(dpi * 11.69),
};

const makeImageFullPage = (image: HTMLImageElement) => {
  const { width, height } = image;
  const ratio = width / height;
  if (ratio > 1) {
    // image.style.width = a4InPixels.width + "px";
    image.style.width = 100 + "%";
    image.style.height = "auto";
    return;
  }
  image.style.width = "auto";
  //   image.style.height = a4InPixels.height + "px";
  image.style.height = 100 + "%";
};

const image = document.querySelector("img");
image && makeImageFullPage(image);
