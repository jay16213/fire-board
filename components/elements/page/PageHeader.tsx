import React, { Component } from 'react'
import Link from 'next/link'

export default class PageHeader extends Component<{ children: React.ReactNode, preTitle: string, title: string }> {
  render() {
    return (
      <div className="page-header">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              {/* Page pre-title */}
              <div className="page-pretitle">
                {this.props.preTitle}
              </div>
              <h2 className="page-title">
                {this.props.title}
              </h2>
            </div>
            {/* Page title actions */}
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
