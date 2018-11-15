import React from 'react';
import autoBind from 'react-autobind';
import style from './style.css';

export default class IPv6Tab extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            zeroCompression: false,
            numberOfNetworksNeeded: 0,
            IPv6AddressInColonHex: "",
            IPv6AddressInBinary: "",
        }
    }

    handleNumberOfNetworksChange(event) {
        this.setState({numberOfNetworksNeeded: event.target.value });
    }

    handleZeroCompressionChange(bool) {
        this.setState({zeroCompression: bool});
    }

    handleclassNameRadioButtonChange(bool) {
        this.setState({classful: bool});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.generateIPv6Address();
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
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

    render() {
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
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
}