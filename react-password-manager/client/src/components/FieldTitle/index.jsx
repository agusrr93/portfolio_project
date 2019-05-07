import React, { PureComponent } from 'react'

export class FieldTitle extends PureComponent {

  labelMaker = () => {
    switch (this.props.labelSize) {
      case 'h2':
        return (
          <label>
            <h2>
              {this.props.labelName}
            </h2>
          </label>
        )
      
      case 'h3':
        return (
          <label>
            <h3>
              {this.props.labelName}
            </h3>
          </label>
        )

      case 'h4':
        return (
          <label>
            <h4>
              {this.props.labelName}
            </h4>
          </label>
        )
  
      default:
        return (
          <label>
            <h1>
              {this.props.labelName}
            </h1>
          </label>
        )
    }
  }

  render() {
    return (
      <div className="ui field">
        <div className="ui dividing header">
          {this.labelMaker()}
        </div>
      </div>
    )
  }
}

export default FieldTitle
