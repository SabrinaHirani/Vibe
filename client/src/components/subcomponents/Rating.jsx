import React from "react";
import { Star } from "react-feather";

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating,
      size: this.props.size,
      stars: [
        <Star color="#e3e3e3" size={this.props.size} />,
        <Star color="#e3e3e3" size={this.props.size} />,
        <Star color="#e3e3e3" size={this.props.size} />,
        <Star color="#e3e3e3" size={this.props.size} />,
        <Star color="#e3e3e3" size={this.props.size} />
      ]
    }
  }

  render() {
    for (var i = 0; i < this.state.rating; i++) {
      this.state.stars[i] = <Star color="#ff9d70" size={this.props.size} />;
    }
    return(
      <div>
      {this.state.stars}
      </div>
    )
  }
}

export default Rating;
