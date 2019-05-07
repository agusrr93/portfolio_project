import React, { PureComponent } from 'react'

class THead extends PureComponent {
  render = () => {
    let { list }  = this.props
      return (
        <thead>
          <tr>
            {
              list.map((title, i) => (
                <th key={i}>{ title }</th>
              ))
            }
          </tr>
        </thead>
    )
  }
}
 export default THead
