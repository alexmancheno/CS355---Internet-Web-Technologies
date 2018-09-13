import React from 'react';
const autoBind = require('auto-bind');

export default class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    navigatorInfo() {
       console.log(navigator);
       return (
           <div>
              <h4><b>Navigator information</b></h4>
              <p>appCodeName: {navigator.appCodeName}</p>
              <p>appName: {navigator.appName}</p>
              <p>appVersion: {navigator.appVersion}</p>
              <p>cookieEnabled: {navigator.cookieEnabled.toString()}</p>
              <p>language: {navigator.language}</p>
              <p>onLine: {navigator.onLine.toString()}</p>
              <p></p>
           </div>
       ); 
    }

    screenInfo() {
        console.log(screen);
        return (
            <div>
                <h4><b>Screen information</b></h4>
                <p>availHeight: {screen.availHeight}</p>
                <p>availWidth: {screen.availWidth}</p>
                <p>colorDepth: {screen.colorDepth}</p>
                <p>height: {screen.height}</p>
                <p>pixelDepth: {screen.pixelDepth}</p>
                <p>width: {screen.width}</p>
            </div>
        ); 
    }

    windowInfo() {
        console.log(window);
        return (
            <div>
                <h4><b>Window information</b></h4>
                <p>innerHeight: {window.innerHeight}</p>
                <p>innerWidth: {window.innerWidth}</p>
                <p>length: {window.length}</p>
                <p>name: {window.name}</p>
                <p>outerHeight: {window.outerHeight}</p>
                <p>outerWidth: {window.outerWidth}</p>
            </div>
        ); 
    }

    render() {
        return (
            <div>
                {this.navigatorInfo()}
                <br/>
                {this.screenInfo()}
                <br/>
                {this.windowInfo()}
            </div>
        )
    }
}