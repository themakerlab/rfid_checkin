# MakerLab RFID Checkin Electron/Angu;ar App

Cross  plaform rfid reader system for the makerlab


## Installing on Raspberry Pi

Raspberry Pi software that will control tap flow and pour.

1. Install Raspbian on Raspberry Pi (Using NOOBS is the easiest https://www.raspberrypi.org/documentation/installation/noobs.md)
2. Boot into Raspbian
3. Install nvm (Node Version Manager) https://github.com/creationix/nvm#installation
4. Using nvm install any version of node I would recommend LTS.
5. Install bower globally using `npm install bower -g`
6. Git clone this repo onto Raspberry Pi (I would recommend into Documents but location doesnt matter as long as you remember)
7. Go into project directory and run `npm install` and `bower install`.
8. If project doesnt run correctly and inside web inspector you get something about NODE_VERSION is incorrect. 
Then you need to compile node modules for electron using the following command (http://www.metabase.com/spec/fixtures/test-set-docs/tutorial/using-native-node-modules). `./node_modules/.bin/electron-rebuild`. Everytime you run npm install you must run this as well.
9. Create a filenamed `.env` in the project root. This will contain project specific variables. Look at ENV Sample
10. Run the application using `npm start`.

## ENV Sample

```
# This is the GPIO NUMBER that the relay is connected to.
RELAY_GPIO=17
# This is the GPIO NUMBER that the solenoid is connected to.
SOLENOID_GPIO=21
# (Optional) (NOT CASE SENSITIVE) This will enable console logging.
NODE_ENV=Development
# The client_id used to get application token.
CLIENT_ID=97f3cfc7821367dff16bf9199ac68a88bc8a7716cc54934cb7abae3a2b6e5ce4
# The client_secret used to get application token.
CLIENT_SECRET=67509ad2256cdae46d93611ddde0caf55c54611f0957354b19e02a8c36401efb
# Base url or domain for oauth.
BASE_URL=http://localhost:3000
# Api url used for making api calls.
API_URL=http://localhost:3000/api/v1
```

## Useful Tips

Closing application in fullscreen?<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Mac `command + q`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Raspberry Pi `ctrl + q`

How do I show web inspector? <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Mac `command + option + i`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Raspberry Pi `ctrl + shift + i`
