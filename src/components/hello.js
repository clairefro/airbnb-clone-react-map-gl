import React from "react";

class Hello extends React.Component {
  render() {
    return (
      <div>
        Hello, {this.props.firstname} {this.props.lastname} from Hello.js!
      </div>
    );
  }
}

export default Hello;
