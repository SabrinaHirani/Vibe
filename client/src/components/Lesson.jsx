import React from "react";

class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.location.state.name,
      content: "ipfs.infura.io/" + this.props.location.state.content,
      description: this.props.location.state.description,
    }
  }

  render() {
    return(
      <div>
      <p>{this.state.name}</p>
      <video src={this.state.evidence} />
      <p>{this.state.description}</p>
      </div>
    )
  }
}

export default Lesson;
