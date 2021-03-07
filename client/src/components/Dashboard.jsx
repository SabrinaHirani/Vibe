import React from "react";

import Web3 from "web3";
import Vibe from "../contracts/Vibe.json";

import ClassItem from "./subcomponents/ClassItem.jsx";
import New from "./subcomponents/New.jsx";
import "../style.css";

const web3 = new Web3(window.ethereum);

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0,
      account: "0x0",
      classes: [
                <ClassItem id={0} name={"Golang Networking"} teacher={"sabrina hirani"} price={6} rating={4} description={"This is description"} />
      ],
      classesStudiedBy:[],
      classesTaughtBy: []
    }

    window.ethereum.enable()
    .then(() => {
      web3.eth.getAccounts()
      .then((accounts) => {
        this.setState({account: accounts[0]});
      }).then(() => {
        this.Vibe = new web3.eth.Contract(Vibe.abi, Vibe.address);
        this.Vibe.setProvider(web3.currentProvider);
        this.Vibe.methods.classesStudiedByCount(this.state.account).call()
        .then((classesStudiedByCount) => {
          for (var i = 0; i < classesStudiedByCount; i++) {
            this.Vibe.methods.getClassesStudiedBy(this.state.count, i).call()
            .then((j) => {
              this.Vibe.methods.getClass(j).call()
              .then((Class) => {
                this.state.classesStudiedBy.push(
                  <ClassItem
                  key={this.state.classes.length}
                  id={Class.id}
                  name={Class.name}
                  teacher={Class.teacher}
                  price={Class.price}
                  rating={Class.rating}
                  description={Class.description}
                  />
                )
                this.setState({classesStudiedBy: this.state.classesStudiedBy});
              })
            })
          }
        }).then(() =>{
          this.Vibe.methods.classesTaughtByCount(this.state.account).call()
          .then((classesTaughtByCount) => {
            for (var i = 0; i < classesTaughtByCount; i++) {
              this.Vibe.methods.getClassesTaughtBy(this.state.count, i).call()
              .then((j) => {
                this.Vibe.methods.getClass(j).call()
                .then((Class) => {
                  this.state.classesTaughtBy.push(
                    <ClassItem
                    key={this.state.classes.length}
                    id={Class.id}
                    name={Class.name}
                    teacher={Class.teacher}
                    price={Class.price}
                    rating={Class.rating}
                    description={Class.description}
                    />
                  )
                  this.setState({classesTaughtBy: this.state.classesTaughtBy});
                })
              })
            }
          })
        }).then(() => {
          this.Vibe.methods.getClassCount().call()
        }).then((classCount) => {
          for (var i = 0; i < classCount; i++) {
            this.Vibe.methods.getClass(i).call()
            .then((Class) => {
              this.state.classes.push(
                <ClassItem
                key={this.state.classes.length}
                id={Class.id}
                name={Class.name}
                teacher={Class.teacher}
                price={Class.price}
                rating={Class.rating}
                description={Class.description}
                />
              )
              this.setState({classes: this.state.classes});
            })
          }
        })
      })
    })
  }

  render() {
    let view;
    if (this.state.view == 0) {
      view = this.state.classes;
    } else if (this.state.view == 1) {
      view  = this.state.classesStudiedBy;
    } else if (this.state.view == 2) {
      view = this.state.classesTaughtBy;
    }

    return(
      <div className="dashboard">
      <span className="heading-main" >Vibe</span>
      <img
      className="logo"
      src={require("../media/logo.png").default}
      alt="" />
      <p className="account-address">{this.state.account}</p>
      <div className="settings">
      <button className="setting-toggle" onClick={()=> {this.setState({view: 0})}}>Enroll</button>
      <button className="setting-toggle" onClick={()=> {this.setState({view: 1})}}>Study</button>
      <button className="setting-toggle" onClick={()=> {this.setState({view: 2})}}>Teach</button>
      </div>
      <div className="view">
      {view}
      </div>
      </div>
    )
  }
}

export default Dashboard;
