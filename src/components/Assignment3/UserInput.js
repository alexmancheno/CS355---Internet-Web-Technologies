import React from 'react';
import autoBind from 'react-autobind';
import style from './style.css';

export default class UserInput extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        let addresses = new Object();
        this.state = {
            classful: true,
            zeroCompression: false,
            classNameValue: "A",
            numberOfHostsNeeded: 0,
            numberOfNetworksNeeded: 0,
            generatedIPAddress: "",
            ipAddressInBinary: "",
            IPv6AddressInColonHex: "",
            IPv6AddressInBinary: "",
            addresses: JSON.stringify(addresses)
        }
        // localStorage.clear();
    }

    handleclassNameChange(event) {
        this.setState({classNameValue: event.target.value});
    }

    handleNumberOfNetworksChange(event) {
        this.setState({numberOfNetworksNeeded: event.target.value });
    }

    handleNumberOfHostsChange(event) {
        this.setState({numberOfHostsNeeded: event.target.value });
    }

    handleZeroCompressionChange(bool) {
        this.setState({zeroCompression: bool});
    }

    handleclassNameRadioButtonChange(bool) {
        this.setState({classful: bool});
    }

    handleSubmit(event) { 
        event.preventDefault();
        this.generateIPv4Address();
    }

    handleIPv6Submit(event) {
        event.preventDefault();
        this.generateIPv6Address();
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    generateIPv4Address() {
        let map;
        if (localStorage.getItem("IPv4Addresses") !== null) {
            map = JSON.parse(localStorage.getItem("IPv4Addresses"));
        } else {
            map = new Object();
        }
        let randomAddress;
        let binaryString;
        let r = 0;
        let subnetMask = 0;
        do {
            if (this.state.classful) {
                if (this.state.classNameValue === "A") {
                    subnetMask = 24;
                    r = (this.getRandomInt(128)) << subnetMask;
                    binaryString = r.toString(2);
                    while (binaryString.length < 31)
                        binaryString = "0" + binaryString;
                    binaryString = "0" + binaryString;
                    
                } else if (this.state.classNameValue === "B") {
                    subnetMask = 16;
                    r = (this.getRandomInt(16384)) << subnetMask;
                    binaryString = r.toString(2);
                    while (binaryString.length < 30)
                        binaryString = "0" + binaryString;
                    binaryString = "10" + binaryString;
                    
                } else if (this.state.classNameValue === "C") {
                    subnetMask = 8;
                    r = (this.getRandomInt(2097152)) << subnetMask;
                    binaryString = r.toString(2);
                    while (binaryString.length < 29)
                        binaryString = "0" + binaryString;
                    binaryString = "110" + binaryString;
                } else if (this.state.classNameValue === "D")  {
                    r = (this.getRandomInt(268435456));
                    binaryString = r.toString(2);
                    while (binaryString.length < 28)
                        binaryString = "0" + binaryString;
                    binaryString = "1110" + binaryString;
                    
                } else if (this.state.classNameValue === "E") {
                    this.setState({generatedIPAddress: "Cannot assign class E addressses!"});
                    this.setState({ ipAddressInBinary: "Cannot assign class E addressses!"});
                    return;
                }
            } else {
                let numberOfHostsNeeded = this.state.numberOfHostsNeeded;
                if (numberOfHostsNeeded === 0 || numberOfHostsNeeded == "") return;
                let suffixBits = Math.ceil(Math.log2(this.state.numberOfHostsNeeded));
                subnetMask = 32 - suffixBits;
                r = this.getRandomInt(Math.pow(2, subnetMask));
                r = r << (suffixBits);
                binaryString = r.toString(2);
                if (binaryString[0] === '-') binaryString = binaryString.substr(1);
                while (binaryString.length < 32) {
                    binaryString = "0" + binaryString;
                    this.sleep(1000);
                } 
            }
            
        } while (r in map) ;
        
        map[r] = true;
        randomAddress = this.intToIPAddressString(r) + "/" + subnetMask.toString();
        this.setState({generatedIPAddress: randomAddress});
        this.setState({ipAddressInBinary: binaryString});
        
        localStorage.setItem("IPv4Addresses", JSON.stringify(map));
    }

    generateIPv6Address() {
        let numberOfNetworksNeeded = this.state.numberOfNetworksNeeded;
        let zeroCompression = this.state.zeroCompression;

        let map;
        if (localStorage.getItem("IPv6Addresses") !== null) {
            map = JSON.parse(localStorage.getItem("IPv6Addresses"));
        } else {
            map = new Object();
        }

        let networkBits = 16;
        let n = Math.ceil(Math.log2(numberOfNetworksNeeded)) - 16;
        if (n > 0) {
            networkBits += n;
        }

        let suffixBits = 64 - networkBits;
        let randomNumber = 0;
        let result;
        do {
            randomNumber = this.getRandomInt(Math.pow(2, suffixBits));
            for (let i = randomNumber.toString(2).length; i < 64; i++) {
                randomNumber = randomNumber * 2;
            }

            let hexString = randomNumber.toString(16);
            result = "";

            let count = 0;
            for (let i = 0; i < hexString.length; ) {
                if (count === 4) {
                    result += ":";
                    count = 0;
                } else {
                    let c = hexString.charAt(i);
                    result += c;
                    count++;
                    i++;
                }
            }
            result += ":0000:0000:0000:0000";
            
            let array = result.split(":");
            let compressed = "::";
            let foundNonZeroes = false;
            if (zeroCompression) {
                for (let i = array.length - 1; i >= 0; i--) {
                    let s = array[i];
                    if (s !== "0000" || foundNonZeroes) {
                        compressed = ":" + parseInt(s, 16).toString(16) + compressed;
                        foundNonZeroes = true;
                    }
                }

                result = compressed.substr(1);
            }

            result += "/" + (64 - networkBits).toString();
        } while (result in map) ;

        map[result] = true;
        localStorage.setItem("IPv6Addresses", JSON.stringify(map));

        this.setState({IPv6AddressInColonHex: result});
        this.setState({IPv6AddressInBinary: randomNumber.toString(2)});
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
                <br/>
                <div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Your IPv4 address in decimal:</label>
                        <input className={"form-control " + style.courier} type="text" name="country" value={this.state.generatedIPAddress} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Your IPv4 address in binary:</label>
                        <input className={"form-control " + style.courier} type="text" name="country" value={this.state.ipAddressInBinary} readOnly />
                    </div>
                </div>
            </div>
        )
    }

    getIPv6TabContent() {
        return (
            <div>
                <form onSubmit={e => this.handleIPv6Submit(e)}>
                    <div className="form-group-row">
                        <legend className="col-form-label">Zero compression?</legend>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    checked={this.state.zeroCompression === true}
                                    onChange={e => this.handleZeroCompressionChange(true)} />
                                yes
                            </label>
                            <br/>
                            <label>
                                <input type="radio"
                                    checked={this.state.zeroCompression === false}
                                    onChange={e => this.handleZeroCompressionChange(false)} />
                                no
                            </label>
                        </div>
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1">Number of networks needed:</span>
                            <input type="number" className="form-control" placeholder="hosts.." aria-describedby="basic-addon1" onChange={e => { this.handleNumberOfNetworksChange(e) }} />
                        </div>
                        <br/>
                        <button type="submit" value="submit" className="btn btn-primary">Assign!</button>
                    </div>
                </form>
                <br/>
                <div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Your IPv6 address in colon hex:</label>
                        <input className={"form-control " + style.courier} type="text" name="country" value={this.state.IPv6AddressInColonHex} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Your IPv6 address in binary:</label>
                        <input className={"form-control " + style.courier} type="text" name="country" value={this.state.IPv6AddressInBinary} readOnly />
                    </div>
                </div>
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
                <br></br>
                    <div id="IPv4Tab" className="tab-pane fade in active">
                        {this.getIPv4TabContent()}
                    </div>
                    <div id="IPv6Tab" className="tab-pane fade">
                        {this.getIPv6TabContent()}
                    </div>
                </div>
                <br></br>
        
            </div>
        )
    }
}