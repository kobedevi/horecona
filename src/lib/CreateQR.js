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
      data: `${window.location.protocol}//${window.location.host}/${input}`,
      image: appIcon,
      dotsOptions: {
        color: '#7C5AF3',
        type: 'square',
      },
      backgroundOptions: {
        color: '#231F36',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 20,
      },
    });
    qrCode.append(container);
  },
};

export default generator;
