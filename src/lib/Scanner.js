/* eslint-disable max-len */
/*
* get business
*/

import 'regenerator-runtime/runtime';

// thanks to Emiel De Vleeschouwer
const Scanner = {

  scanner: () => {
    // This method will trigger user permissions
    // eslint-disable-next-line no-undef
    Html5Qrcode.getCameras().then((devices) => {
      if (devices && devices.length) {
        const cameraId = devices[0].id; // <-- Select first camera in the list
        // eslint-disable-next-line no-undef
        const html5QrCode = new Html5Qrcode('reader'); // <-- reader-div element id

        // const aspectRatio = window.screen.width / window.screen.height;
        // to avoid weird ratios
        const aspectRatio = 10.7 / 16;

        // Start the scanner
        html5QrCode.start(
          cameraId,
          {
            fps: 10, // higher fps = faster scanning
            aspectRatio, // <-- container width / container height. Depends on how you want to display the reader
          },
          (qrCodeMessage) => {
            // Stop the scanner, then handle response
            html5QrCode.stop().then(() => {
              // print the response
              const text = document.getElementById('text');
              text.innerHTML = qrCodeMessage;
            }).catch(() => {
              // <-- error when stop has failed
            });
          },
        )

          .catch((err) => {
            console.log(err); // <-- error when startup has failed
          });
      }
    }).catch((err) => {
      console.log(err); // <-- error when there are no devices
    });
  },
};

export default Scanner;
