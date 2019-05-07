import React, { PureComponent } from 'react'

class FieldForm extends PureComponent {

  render() {
    const { typeInput, placeholder, fn, fieldName, val} = this.props
    return (
      <div className="ui field">
        <label>
          { fieldName }
        </label>
        <input type={typeInput} placeholder={placeholder} onChange={(e) => fn(e.target.value)} value={val || ''}/>
      </div>
    )
  }
}

export default FieldForm
