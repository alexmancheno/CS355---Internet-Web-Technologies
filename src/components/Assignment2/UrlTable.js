import React from 'react';
const autoBind = require('auto-bind');
const url = require('url');

export default class UrlTable extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.url_components = [];
    }

    constructComponentsArray() {
        const arr = this.props.urls;
        for (let i = 0; i < arr.length; i++) {
            let q = url.parse(arr[i]);
            let xhr = new XMLHttpRequest();
            xhr.open("GET", `https://dns.google.com/resolve?name=${q.hostname}`, false);
            xhr.onload = function() {
                let res = JSON.parse(this.responseText);
                let ip_address = ((res.Answer)[0]).data;
                console.log("Ip address: " + ip_address);
            }
            xhr.send(null);

            this.url_components.push(q);
        }
    }

    constructTable() {
        const arr = this.url_components;
        if (arr.length == 0) return <tbody></tbody>
        let rows = arr.map((url, index)=> 
            <tr>
                <th>{index}</th>
                <td>{url.host}</td>
                <td>{url.pathname}</td>
                <td>{url.query}</td>
            </tr>
        );

        return (
            <tbody>
                {rows}
            </tbody>
        )
    }

    render() {
        this.constructComponentsArray();
        let tbody = this.constructTable();
        return (
            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">1</th>
                            <th scope="col">2</th>
                            <th scope="col">3</th>
                        </tr>
                    </thead>
                    {tbody}
                </table>
            </div>
        )
    }
}