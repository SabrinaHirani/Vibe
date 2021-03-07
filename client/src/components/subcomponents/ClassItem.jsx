import React from "react";
import { Link } from "react-router-dom";

import Web3 from "web3";
import Vibe from "../../contracts/Vibe.json";

import Rating from "./Rating.jsx";

const web3 = new Web3(window.ethereum);

class ClassItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAccess: 0,
      id: this.props.id,
      name: this.props.name,
      teacher: this.props.teacher,
      price: this.props.price,
      rating: this.props.rating,
      description: this.props.description
    }

    window.ethereum.enable()
    .then(() => {
      web3.eth.getAccounts()
      .then((accounts) => {
        this.setState({account: accounts[0]});
      }).then(() => {
        this.Vibe = new web3.eth.Contract(Vibe.abi, Vibe.address);
        this.Vibe.setProvider(web3.currentProvider);
        this.Vibe.methods.isTeacher(this.state.id).call({ from: this.state.account }).then((r) => {
          if (r) {
            this.setState({hasAccess: 2});
          } else {
            this.Vibe.methods.hasPurchasedClass(this.state.id).call({ from: this.state.account }).then((r) => {
              if (r) {
                this.setState({hasAccess: 1});
              }
            })
          }
        })
      })
    })

    this.purchaseClass = this.purchaseClass.bind(this);
  }

  async purchaseClass() {
    this.Vibe = new web3.eth.Contract(Vibe.abi, Vibe.address);
    this.Vibe.setProvider(web3.currentProvider);
    this.Vibe.methods.isTeacher(this.state.id).call({ from: this.state.account }).then((r) => {
      if (!r){
        this.Vibe.methods.hasPurchasedClass(this.state.id).call({ from: this.state.account }).then((r) => {
          if (!r) {
            this.Vibe.methods.purchaseClass(this.state.id).send({ from: this.state.account, value: this.state.price, gas: 5000000 });
            }
          })
        }
      })
    }

  render() {
    if (this.state.hasAccess == 0) {
      return(
        <div className="class-item">
        <p className="class-item-heading">{this.state.name}</p>
        <p className="class-item-teacher">by <span className="address-style">{this.state.teacher}</span></p>
        <Rating rating={this.state.rating} size={15} />
        <p className="class-item-description">{this.state.description}</p>
        <Link to={{
                              pathname: "/class",
                              state: {
                                id: this.state.id,
                                name: this.state.name,
                                teacher: this.state.teacher,
                                price: this.state.price,
                                rating: this.state.rating,
                                description: this.state.description,
                              },
                            }}><button className="class-item-action">More</button></Link>
      <div>
      <Link to={{
                            pathname: "/class",
                            state: {
                              id: this.state.id,
                              name: this.state.name,
                              teacher: this.state.teacher,
                              price: this.state.price,
                              rating: this.state.rating,
                              description: this.state.description,
                            },
                          }}><button className="class-item-purchase-class-action" onClick={this.purchaseClass} >Purchase for {this.state.price} wei</button></Link>
        </div>
        </div>
      )
    } else if (this.state.hasAccess == 1){
      return(
        <div className="class-item">
        <p className="class-item-heading">{this.state.name}</p>
        <p className="class-item-teacher">by <span className="address-style">{this.state.teacher}</span></p>
        <Rating rating={this.state.rating} size={15} />
        <p className="class-item-description">{this.state.description}</p>
        <Link to={{
                              pathname: "/class",
                              state: {
                                id: this.state.id,
                                name: this.state.name,
                                teacher: this.state.teacher,
                                price: this.state.price,
                                rating: this.state.rating,
                                description: this.state.description,
                              },
                            }}><button className="class-item-action">More</button></Link>
      <div>
      <Link to={{
                            pathname: "/class",
                            state: {
                              id: this.state.id,
                              name: this.state.name,
                              teacher: this.state.teacher,
                              price: this.state.price,
                              rating: this.state.rating,
                              description: this.state.description,
                            },
                          }}><button className="class-item-purchase-class-action" onClick={this.purchaseClass} >Continue Studying</button></Link>
        </div>
        </div>
      )
    } else {
      return(
        <div className="class-item">
        <p className="class-item-heading">{this.state.name}</p>
        <p className="class-item-teacher">by <span className="address-style">{this.state.teacher}</span></p>
        <Rating rating={this.state.rating} size={15} />
        <p className="class-item-description">{this.state.description}</p>
        <Link to={{
                              pathname: "/class",
                              state: {
                                id: this.state.id,
                                name: this.state.name,
                                teacher: this.state.teacher,
                                price: this.state.price,
                                rating: this.state.rating,
                                description: this.state.description,
                              },
                            }}><button className="class-item-action">More</button></Link>
      <div>
      <Link to={{
                            pathname: "/class",
                            state: {
                              id: this.state.id,
                              name: this.state.name,
                              teacher: this.state.teacher,
                              price: this.state.price,
                              rating: this.state.rating,
                              description: this.state.description,
                            },
                          }}><button className="class-item-purchase-class-action" onClick={this.purchaseClass} >Continue Teaching</button></Link>
        </div>
        </div>
      )
    }
  }
}

export default ClassItem;
