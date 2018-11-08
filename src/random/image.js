import { pick } from './helper';

// 占位图 host，支持 https
let host = 'placehold.it';


// 常见的广告宽高
const adSize = [
  '300x250',
  '250x250',
  '240x400',
  '336x280',
  '180x150',
  '720x300',
  '468x60',
  '234x60',
  '88x31',
  '120x90',
  '120x60',
  '120x240',
  '125x125',
  '728x90',
  '160x600',
  '120x600',
  '300x600',
];

// 常见的屏幕宽高 (暂时没用)
// const screenSize = [
//   '320x200',
//   '320x240',
//   '640x480',
//   '800x480',
//   '800x480',
//   '1024x600',
//   '1024x768',
//   '1280x800',
//   '1440x900',
//   '1920x1200',
//   '2560x1600',
// ];

// 常见的视频宽高 (暂时没用)
// const videoSize = ['720x480', '768x576', '1280x720', '1920x1080'];

/**
 * 设置 host 用于自定义占位图
 *
 * @export
 * @param {any} newHost
 */
export function setImageHost(newHost) {
  host = newHost;
}

/**
 * 生成一个随机的占位图
 *
 * @export
 * @param {string} size
 * @param {string} background
 * @param {string} foreground
 * @param {string} format
 * @param {string} text
 * @returns
 */
export function image(size, background, foreground, format, text) {
  // Random.image( size, background, foreground, text )
  if (arguments.length === 4) {
    text = format;
    format = undefined;
  }
  // Random.image( size, background, text )
  if (arguments.length === 3) {
    text = foreground;
    foreground = undefined;
  }
  // Random.image()
  if (!size) {
    size = pick(adSize);
  }

  return `http://${host}/${size}${background ? `/${background}` : ''}${foreground
    ? `/${foreground}`
    : ''}${format ? `.${format}` : ''}${text ? `&text=${text}` : ''}`;
}
