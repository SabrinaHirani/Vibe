import React from "react";
import { Link } from "react-router-dom";

class LessonItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      content: this.props.content,
      description: this.props.description
    }
  }

  render() {
    return (
      <div>
      <Link to={{
                            pathname: "/lesson",
                            state: {
                              name: this.state.id,
                              content: this.state.name,
                              description: this.state.teacher
                            },
                          }}><p>{this.state.name}</p></Link>
      <p>{this.state.description}</p>
      </div>
    )
    }
  }

export default LessonItem;
