import React from "react";

import Web3 from "web3";
import Vibe from "../contracts/Vibe.json";

import ClassItem from "./subcomponents/ClassItem.jsx";

const web3 = new Web3(window.ethereum);

class Enroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "0x0"
      classes: []
    }

    window.ethereum.enable()
    .then(() => {
      web3.eth.getAccounts()
      .then((accounts) => {
        this.setState({accounts: accounts[0]});
      }).then(() => {
        this.Vibe = new web3.eth.Contract(Vibe.abi, Vibe.address);
        this.Vibe.setProvider(web3.currentProvider);
        this.Vibe.methods.getClassCount(this.state.address).call()
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
              students={Class.students}
              raters={Class.raters}
              lessons={Class.lessons}
              />
            )
            this.setState({classes: this.state.classes});
          })
        }
      })
    })
  }

  render() {
    return(
      <div>
      </div>
    )
  }
}

export default Enroll;
