import React from 'react';
import UrlTable from './UrlTable';
import UrlGraphs from './UrlGraphs';
import autoBind from 'react-autobind';

export default class UrlVisualizer extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    constructUrlObjects() {
        const arr = this.props.urls;
        let url_objects = [];

        for (let i = 0; i < arr.length; i++) {
            let q = new URL(arr[i]);
            let xhr = new XMLHttpRequest();
            let ipaddress;
            xhr.open("GET", `https://dns.google.com/resolve?name=${q.hostname}`, false);
            xhr.onload = function () {
                let res = JSON.parse(this.responseText);
                ipaddress = ((res.Answer)[0]).data;
            }
            xhr.send(null);
            q.ipaddress = ipaddress;
            url_objects.push(q);
        }

        return url_objects;
    }

    render() {
        let url_objects = this.constructUrlObjects();

        return (
            <div>
                <h4>Displaying information for {this.props.urls.length} Url's</h4>
                <UrlTable url_objects={url_objects} />
                <br />
                <UrlGraphs url_objects={url_objects} />
            </div>
        )
    }
}