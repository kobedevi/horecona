/**
 * Create QR code
*/

import appIcon from '../img/icons/appIcon.svg';

const generator = {
  qr: (container, input) => {
    // eslint-disable-next-line no-undef
    const qrCode = new QRCodeStyling({
      width: 250,
      height: 250,
      // if need more data, use objects
      data: input,
      image: appIcon,
      // classic black/white color, scan accuracy was way to low otherwise
      dotsOptions: {
        color: 'black',
        type: 'square',
      },
      backgroundOptions: {
        color: 'white',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 12,
      },
    });
    qrCode.append(container);
  },
};

export default generator;
