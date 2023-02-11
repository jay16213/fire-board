import React, { Component } from 'react'

export default class PageWrapper extends Component<{ children: React.ReactNode }> {
  render() {
    return (
      <div className="page-wrapper">
        {this.props.children}
      </div>
    )
  }
}
