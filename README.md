# Stadia Controller Flasher

This repository retains an original backup of the Stadia Controller flasher utility sitting at https://stadia.google.com/controller/, the repository aims to have a web-based flasher to be able to revert the Stadia controller to its original Gotham firmware (Wi-Fi enabled).

To run the utility write open up your terminal and install all node modules by typing in `npm install`.

Serve the utility by running `npm run serve` then open the site on https://localhost:5000

The app has been changed to allow the controller to be flashed with Bruce firmware and revert with the latest Gotham build (which has been never released).

Largely work in progress.

Credits to r/stadia community, particularly to:
- /u/ig-88ms
- /u/debianite
- /u/madushan1000
For fetching hidden Firmware files.

- /u/parkerlreed
For the reference packet capture file.
