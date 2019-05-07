import React, {PureComponent} from 'react'

class FieldNotifValidator extends PureComponent {
  render = () => {
      let { message, iconColor } = this.props
      let attr = `ui ${iconColor} icon`
    return (
      <div className="ui field">
        <i className={attr}></i>
        { message }
      </div>
    )
  }
}

export default FieldNotifValidator
