import React from 'react';
import autoBind from 'react-autobind';

export default class UserInput extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        let addresses = new Object();
        this.state = {
            classful: true,
            classNameValue: "A",
            numberOfHostsNeeded: 0,
            generatedIPAddress: "ip...",
            addresses: JSON.stringify(addresses)
        }
        localStorage.clear();
    }

    handleclassNameChange(event) {
        this.setState({classNameValue: event.target.value})
    }

    handleclassNameRadioButtonChange(bool) {
        this.setState({classful: bool});
    }

    handleSubmit(event) { 
        event.preventDefault();
        this.generateIPv4Address();
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    generateIPv4Address() {
        console.log(this.state.addresses);
        let map;
        if (localStorage.getItem("addresses") !== null) {
            map = JSON.parse(localStorage.getItem("addresses"));
        } else {
            map = new Object();
        }
        let randomAddress;
        let r = 0;
        do {
            if (this.state.classful) {
                console.log("classful!");
                if (this.state.classNameValue === "A") {
                    r += (this.getRandomInt(128)) << 24;
                } else if (this.state.classNameValue === "B") {
                    r += (this.getRandomInt(64) + 128) << 24;
                    r += (this.getRandomInt(256) << 16);
                } else if (this.state.classNameValue === "C") {
                    r += (this.getRandomInt(32) + 192) << 24;
                    r += (this.getRandomInt(256)) << 16;
                    r += (this.getRandomInt(256)) << 8;
                } else if (this.state.classNameValue === "D")  {
                    r += (this.getRandomInt(16) + 224) << 24;
                    r += (this.getRandomInt(256)) << 16;
                    r += (this.getRandomInt(256)) << 8;
                    r += (this.getRandomInt(256));
                } else if (this.state.classNameValue === "E") {
                    console.log("Cannot assign class E!");
                }
            } else {
                let prefixBits = Math.ceil(Math.log2(this.state.numberOfHostsNeeded));
                r += this.getRandomInt(Math.pow(2, 32 - prefixBits));
                r = r << (prefixBits);
            }
            randomAddress = this.intToIPAddressString(r);
        } while ((randomAddress in map)) ;

        this.setState({generatedIPAddress: randomAddress});
        map[randomAddress] = true;
        localStorage.setItem("addresses", JSON.stringify(map));
        console.log(map)
    }

    intToIPAddressString(ip) {
        let bytes = [4];
        bytes[3] = ip & 0xFF;
        bytes[2] = (ip >> 8) & 0xFF;
        bytes[1] = (ip >> 16) & 0xFF;
        bytes[0] = (ip >> 24) & 0xFF;
        return `${bytes[0]}.${bytes[1]}.${bytes[2]}.${bytes[3]}`; 
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    handleNumberOfHostsChange(event) {
        this.setState({numberOfHostsNeeded: event.target.value});
    }

    getIPv4TabContent() {
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <div className="form-group-row">
                        <legend className="col-form-label">classful or classless?</legend>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    checked={this.state.classful === true}
                                    onChange={e => this.handleclassNameRadioButtonChange(true)} />
                                classful
                            </label>
                        </div>
                    <div className="form-group">
                        <label htmlFor="classNameSelect">Pick addressing className</label>
                        <select className="form-control" id="classNameSelect" value={this.state.classNameValue} onChange={e => this.handleclassNameChange(e)}  disabled={!this.state.classful}>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                            <option>E</option>
                        </select>
                    </div>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    checked={this.state.classful === false}
                                    onChange={e => this.handleclassNameRadioButtonChange(false)} />
                                classless
                            </label>
                        </div>
                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">Number of hosts needed:</span>
                        <input type="number" className="form-control" placeholder="hosts.." aria-describedby="basic-addon1" disabled={this.state.classful} onChange={e=>{this.handleNumberOfHostsChange(e)}}/>
                    </div>
                    <br/>
                    <button type="submit" value="submit" className="btn btn-primary">Assign!</button>
                    </div>
                </form>
            </div>
        )
    }

    getIPAddressesDisplay() {
        return (
            <div>
                <div className="form-group">
                    <label for="exampleFormControlInput1">Your IP address:</label>
                    <input className="form-control" type="text" name="country" value={this.state.generatedIPAddress} readOnly />
                </div>
            </div>
        )
    }

    getIPv6TabContent() {
        return (
            <div>
                hey
            </div>
        )
    }


    render() {
        
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab" href="#IPv4Tab">IPv4</a></li>
                    <li><a data-toggle="tab" href="#IPv6Tab">IPv6</a></li>
                </ul>

                <div className="tab-content">
                    <div id="IPv4Tab" className="tab-pane fade in active">
                        {this.getIPv4TabContent()}
                    </div>
                    <div id="IPv6Tab" className="tab-pane fade">
                        {this.getIPv6TabContent()}
                    </div>
                </div>
                <br></br>
                {this.getIPAddressesDisplay()}
            </div>
        )
    }
}