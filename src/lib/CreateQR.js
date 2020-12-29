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
      data: JSON.stringify(input),
      image: appIcon,
      dotsOptions: {
        color: '#7c5af3',
        type: 'square',
      },
      backgroundOptions: {
        color: '#231F36',
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
