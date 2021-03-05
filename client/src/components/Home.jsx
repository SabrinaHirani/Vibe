import React from "react";
import Navigation from "./Navigation.jsx";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div>
      <Navigation />
      </div>
    )
  }
}

export default Home;
