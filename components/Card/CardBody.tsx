import React from "react";

export default class CardBody extends React.Component<{ children: React.ReactNode }> {
  render() {
    return (
      <div className="card-body">
        {this.props.children}
      </div>
    )
  }
}
