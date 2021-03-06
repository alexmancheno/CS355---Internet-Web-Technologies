import React from 'react';
import style from './style.css';
import autoBind from 'react-autobind';

export default class UrlTable extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    constructTable() {
        const arr = this.props.url_objects;
        if (arr.length == 0) return <tbody></tbody>

        let rows = arr.map((url, index) =>
            <tr>
                <td>{index}</td>
                <td>{url.href}</td>
                <td>{url.protocol}</td>
                <td>{url.host}</td>
                <td>{url.pathname}</td>
                <td>{url.search}</td>
                <td>{url.hash}</td>
                <td>{url.ipaddress}</td>
            </tr>
        );

        return (
            <tbody>
                {rows}
            </tbody>
        )
    }

    render() {
        let tbody = this.constructTable();
        return (
            <div>
                <h3>Url components</h3>
                <table className={"table table-striped " + style.urlTable}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">href</th>
                            <th scope="col">scheme</th>
                            <th scope="col">authority</th>
                            <th scope="col">path</th>
                            <th scope="col">query</th>
                            <th scope="col">fragment</th>
                            <th scope="col">ip address</th>
                        </tr>
                    </thead>
                    {tbody}
                </table>
            </div>
        )
    }
}