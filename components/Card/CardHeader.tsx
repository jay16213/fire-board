import React from "react";

export default class CardHeader extends React.Component<{ children: React.ReactNode }> {
  render() {
    return (
      <div className="card-header">
        {this.props.children}
      </div>
    )
  }
}
