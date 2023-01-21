# Stadia Controller Flasher

This repository retains an original backup of the Stadia Controller flasher utility sitting at https://stadia.google.com/controller/, the repository aims to have a web-based flasher to be able to revert the Stadia controller to its original Gotham firmware (Wi-Fi enabled).

## Disclaimer

This utility can brick your device, keep in mind everything is work in progress and experimental, please use the original flashing utility on the official site: https://stadia.google.com/controller

## Quick start

The utility is automatically built and hosted on github pages at this address https://luigimannoni.github.io/stadia-controller-flasher/

## Run it locally

To run the utility write open up your terminal and install all node modules by typing in `npm install`.

Serve the utility by running `npm run serve` then open the site on https://localhost:5000

The app has been changed to allow the controller to be flashed with Bruce firmware and revert with the latest Gotham build (which has been never released).

Largely work in progress.

## Firmware select

By adding `?device_type=` on the url as query parameter a different firmware type can be flashed onto the device, the query parameter value can be one of:

- `pvt` for Production firmware
- `dvt` for Staging firmware
- `dev` for Dev firmware

## Binary Build

Follow these steps to build for Windows, Max and Linux:
- `npm run pkg`
- then run the binary with ./dist/stadia-controller-flasher-linux

### Triggering a release

1. `npm version <patch|minor|major>`
2. `git push origin <version_branch>`

## Credits

Credits to all contributors, listed on the [Contributor tab](https://github.com/luigimannoni/stadia-controller-flasher/graphs/contributors), and to the [r/stadia](https://reddit.com/r/stadia) community, particularly to:

- /u/ig-88ms
- /u/debianite
- /u/madushan1000
- /u/parkerlreed

For the initial research, fetching all hidden Firmware files and general knowledge.
