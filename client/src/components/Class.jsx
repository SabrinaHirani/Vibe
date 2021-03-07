import React from "react";

import Web3 from "web3";
import Vibe from "../contracts/Vibe.json";

import LessonItem from "./subcomponents/LessonItem.jsx";
import Rating from "./subcomponents/Rating.jsx";

const web3 = new Web3(window.ethereum);

class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAccess: 0,
      id: this.props.location.state.id,
      name: this.props.location.state.name,
      teacher: this.props.location.state.teacher,
      price: this.props.location.state.price,
      rating: this.props.location.state.rating,
      description: this.props.location.state.description,
      lessons: []
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
      }).then(() => {
        this.Vibe.methods.getLessonCount(this.props.location.state.id).call().then((lessonCount) => {
          for (var i = 0; i < lessonCount; i++) {
            this.Vibe.methods.getLesson(this.props.location.state.id, i).call().then((Lesson) => {
              this.state.lessons.push(
                <LessonItem
                key={this.state.lessons.length}
                name={Lesson.name}
                content={Lesson.content}
                description={Lesson.description}
                />
              )
              this.setState({lessons: this.state.lessons});
            })
          }
        })
      })
    })

    this.purchaseClass = this.purchaseClass.bind(this);

  }

  async purchaseClass() {
    alert("Add Lesson")
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
      }).then(() => {
        this.setState({hasAccess: 1});
      })
  }

  render() {
    if (this.state.hasAccess == 0) {
      return(
        <div>
        <p className="class-name">{this.state.name}</p>
        <p className="class-teacher">by <span className="address-style">{this.state.teacher}</span></p>
        <div className="class-rating">
        <Rating rating={this.state.rating} size={24}/>
        </div>
        <p className="class-description">{this.state.description}</p>
        <button className="class-purchase-class-action" onClick={this.purchaseClass} >Purchase for {this.state.price} wei</button>
        <div>
        {this.state.lessons}
        </div>
        </div>
      )
    } else if  (this.state.hasAccess == 1){
      return(
        <div>
        <p className="class-name">{this.state.name}</p>
        <p className="class-teacher">by <span className="address-style">{this.state.teacher}</span></p>
        <div className="class-rating">
        <Rating rating={this.state.rating} size={24}/>
        </div>
        <p className="class-description">{this.state.description}</p>
        <button className="class-purchase-class-action">Chat</button>
        <div>
        {this.state.lessons}
        </div>
        </div>
      )
    } else {
      return(
        <div>
        <p className="class-name">{this.state.name}</p>
        <p className="class-teacher">by <span className="address-style">{this.state.teacher}</span></p>
        <div className="class-rating">
        <Rating rating={this.state.rating} size={24}/>
        </div>
        <p className="class-description">{this.state.description}</p>
        <button className="class-purchase-class-action">New</button>
        <div>
        {this.state.lessons}
        </div>
        </div>
      )
    }
  }
}

export default Class;
