import React from 'react';
import {Pie, Bar} from 'react-chartjs-2';
const autoBind = require('auto-bind');

export default class UrlGraphs extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    createSchemeData() {
        const url_objects = this.props.url_objects;
        let schemes = new Object();
        for (let i = 0; i < url_objects.length; i++) {
            const url = url_objects[i];
            const scheme = url.protocol;
            if (schemes.hasOwnProperty(scheme)) {
                schemes[scheme]++;
            } else {
                schemes[scheme] = 1;
            }
        }

        let labels = []; let data = [];
        for (var key in schemes) {
            if (schemes.hasOwnProperty(key)) {
                labels.push(key);
                data.push(schemes[key]);
            }
        }

        const scheme_data = {
            labels: labels,
            datasets: [{
                data: data,
                label: "Schemes",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
            }]
        }

        return scheme_data;
    }

    createTldData() {
        const url_objects = this.props.url_objects;
        let tlds = new Object();
        for (let i = 0; i < url_objects.length; i++) {
            const url = url_objects[i];
            const tld = url.hostname.split('.').slice(-1)[0];
            if (tlds.hasOwnProperty(tld)) {
                tlds[tld]++;
            } else {
                tlds[tld] = 1;
            }
        }

        console.log(JSON.stringify(tlds));
        let labels = []; let data = [];
        for (var key in tlds) {
            if (tlds.hasOwnProperty(key)) {
                labels.push(key);
                data.push(tlds[key]);
            }
        }
        console.log(labels.toString() + "\n" + data.toString());

        const tlds_data = {
            labels: labels,
            datasets: [{
                data: data,
                label: "Top-level domains",
                backgroundColor: 'rgb(255, 199, 13)',
                borderColor: 'rgb(255, 99, 132)',
            }]
        }

        return tlds_data;
    }

    render() {
        const scheme_data = this.createSchemeData();
        const tld_data = this.createTldData();
        const options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
        return (
            <div>
                <h3>Scheme data</h3>
                <Bar data={scheme_data} options={options} />
                <br/>
                <h3>Top-level domains</h3>
                <Bar data={tld_data} options={options} />
            </div>
        )
    }
}