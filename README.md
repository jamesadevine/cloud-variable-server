# cloud-variable-rest

This repository provides a local cloud-variable endpoint for testing hub software. In addition it also provides the ability to host a MakeCode/PXT instance.

The node server assumes that a static site is available in `../pxt-microbit/static`.

The aim is to move this from being a local server, to being a remote hosted server that all hubs use to share variable changes.

This node script depends on socket io, and a convenience testing script is provided for pushing variable changes into socket io.

Running the main script: `node server.js`

Running the testing script: `node socket-io-client.js` In this script key presses send a dummy packet, ctrl + c to exit.

