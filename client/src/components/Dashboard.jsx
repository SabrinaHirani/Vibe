import React from "react";

import Web3 from "web3";
import Vibe from "../contracts/Vibe.json";

import Navigation from "./Navigation.jsx";
import ClassItem from "./subcomponents/ClassItem.jsx";
import Study from "./subcomponents/Study.jsx";
import Teach from "./subcomponents/Teach.jsx";
import New from "./subcomponents/New.jsx";

const web3 = new Web3(window.ethereum);

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: true,
      account: "0x0",
      bio: "I am a great person who likes learning. That's all you need to know for now.",
      classesTaughtBy: [],
      classesStudiedBy:[]
    }

    window.ethereum.enable()
    .then(() => {
      web3.eth.getAccounts()
      .then((accounts) => {
        this.setState({account: accounts[0]});
      }).then(() => {
        this.Vibe = new web3.eth.Contract(Vibe.abi, Vibe.address);
        this.Vibe.setProvider(web3.currentProvider);
        this.Vibe.methods.classesTaughtByCount(this.state.account).call()
        .then((t)=>{
          for (var i = 0; i < t; i++) {
            this.Vibe.methods.getClassesTaughtBy(this.state.count, i).call()
            .then((j)=> {
              this.Vibe.methods.getClass(j)
            }).then((Class) => {
              this.state.classesTaughtBy.push(
                <ClassItem
                key={this.state.classesTaughtBy.length}
                name={Class.name}
                teacher={Class.teacher}
                price={Class.price}
                rating={Class.rating}
                description={Class.description}
                />
              )
              this.setState({classesTaughtBy: this.state.classesTaughtBy});
            })
          }
        })
        this.Vibe.methods.classesStudiedByCount(this.state.account).call()
        .then((t)=>{
          for (var i = 0; i < t; i++) {
            this.Vibe.methods.getClassesStudiedBy(this.state.count, i).call()
            .then((j)=> {
              this.Vibe.methods.getClass(j)
            }).then((Class) => {
              this.state.classesStudiedBy.push(
                <ClassItem
                key={this.state.classesStudiedBy.length}
                name={Class.name}
                teacher={Class.teacher}
                price={Class.price}
                rating={Class.rating}
                description={Class.description}
                />
              )
              this.setState({classesStudiedBy: this.state.classesStudiedBy});
            })
          }
        })
      })
    })
  }

  render() {
    let view;
    if (this.state.view) {
      view  = <Study classesStudiedBy={this.state.classesStudiedBy} />;
    } else {
      view = <Teach classesTaughtBy={this.state.classesTaughtBy}/>;
    }

    return(
      <div className="dashboard">
      <Navigation />
      <div className="bio">
      <button onClick={()=> {this.setState({view: true})}}>Study</button>
      <button onClick={()=> {this.setState({view: false})}}>Teach</button>
      </div>
      <div className="view">
      {view}
      </div>
      </div>
    )
  }
}

export default Dashboard;
