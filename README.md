## Current Weather App

### Assumptions

There is no requirement regarding browser support, so I have assumed only 'modern' browsers.

Units used are metric, with no facility to change to imperial, although it is possible to get imperial measurements from the API.

### Dev Environment

Chrome 63.0.3213.0, 64 bit, on Mac 10.10.

### Running the App

The simplest way to obtain the code is to download a zipped version from the button above, labelled 'Clone or download'.  Unzip the code to a clean directory.

The app can be run from the local file system without a web server.  Simply open the index.html file in a browser.

However, if you wish to serve it from a local server you can obtain a simple static server.  I use the cross-platform [node.js](https://nodejs.org/en/download/) ['static-server'](https://github.com/nbluis/static-server).  Please see directions in the link.  To run static-server just open a command line and go to the directory with the app source code and type `static-server`.  The output will tell you the address and port on which the server is running.  Enter this in your browser's address bar and you should see the app.
