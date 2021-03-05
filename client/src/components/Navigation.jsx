import React from "react";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div className="navigation">
      <a href="/home"><img
        className="logo"
        //src={require("../media/logo.png").default}  //TODO add logo
        alt=""
      /></a>
      <div className="nav-items">
      <a href="/commence-operation-learn" className="nav-item">Enroll</a>
      <a href="/mission-control" className="nav-item">Dashboard</a>
      </div>
      </div>
    )
  }
}

export default Navigation;
