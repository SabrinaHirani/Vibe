import React from "react";
import { Star } from "react-feather";

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating,
      stars: [
        <Star color="#e3e3e3" />,
        <Star color="#e3e3e3" />,
        <Star color="#e3e3e3" />,
        <Star color="#e3e3e3" />,
        <Star color="#e3e3e3" />
      ]
    }
  }

  render() {
    for (var i = 0; i < this.state.rating; i++) {
      this.state.stars[i] = <Star color="#ff9d70" />;
    }
    return(
      <div>
      {this.state.stars}
      </div>
    )
  }
}

export default Rating;
