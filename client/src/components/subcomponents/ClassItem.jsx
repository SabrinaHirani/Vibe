import React from "react";
import { Link } from "react-router-dom";

class ClassItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: this.props.name,
      teacher: this.props.teacher,
      price: this.props.price,
      rating: this.props.rating,
      description: this.props.description
    }
  }

  render() {
    return(
      <div className="class-item">
      <p className="class-item-heading">{this.state.name}</p>
      <p className="class-item-teacher">by <span className="address-style">{this.state.teacher}</span></p>
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
      </div>
    )
  }
}

export default ClassItem;
