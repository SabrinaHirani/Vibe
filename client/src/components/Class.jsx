import React from "react";

import Web3 from "web3";
import Vibe from "../contracts/Vibe.json";

import Rating from "./subcomponents/Rating.jsx";

const web3 = new Web3(window.ethereum);

class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAccess: false,
      id: this.props.location.state.id,
      name: this.props.location.state.name,
      teacher: this.props.location.state.teacher,
      price: this.props.location.state.price,
      rating: this.props.location.state.rating,
      description: this.props.location.state.description
    }

    window.ethereum.enable()
    .then(() => {
      web3.eth.getAccounts()
      .then((accounts) => {
        this.setState({account: accounts[0]});
      }).then(() => {
        this.Vibe = new web3.eth.Contract(Vibe.abi, Vibe.address);
        this.Vibe.setProvider(web3.currentProvider);
        this.Vibe.methods.isTeacher(this.state.id).call({ from: this.account }).then((r) => {
          if (r) {
            this.setState({hasAccess: true});
          } else {
            this.Vibe.methods.hasPurchasedClass(this.state.id).call({ from: this.account }).then((r) => {
              if (r) {
                this.setState({hasAccess: true});
              }
            })
          }
        })
      })
    })

    this.purchaseClass = this.purchaseClass.bind(this);

  }

  purchaseClass() {
    this.Vibe = new web3.eth.Contract(Vibe.abi, Vibe.address);
    this.Vibe.setProvider(web3.currentProvider);
    this.Vibe.methods.isTeacher(this.state.id).call({ from: this.account }).then((r) => {
      if (!r){
        this.Vibe.methods.hasPurchasedClass(this.state.id).call({ from: this.account }).then((r) => {
          if (!r) {
            this.Vibe.methods.purchaseClass(this.state.id).send({ from: this.account, value: this.state.price, gas: 5000000 });
            }
          })
        }
      }).then(() => {
        this.setState({hasAccess: true});
      })
  }

  render() {
    return(
      <div>
      <p className="class-name">{this.state.name}</p>
      <p className="class-teacher">by <span className="address-style">{this.state.teacher}</span></p>
      <div className="class-rating">
      <Rating rating={this.state.rating} />
      </div>
      <p className="class-description">{this.state.description}</p>
      <div className="locked-view">
      <button className="class-purchase-class-action" onClick={this.purchaseClass()} >Purchase for {this.state.price} wei</button>
      </div>
      </div>
    )
  }
}

export default Class;
