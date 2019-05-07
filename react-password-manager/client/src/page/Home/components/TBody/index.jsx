import React, { Fragment, PureComponent } from 'react'

class TBody extends PureComponent {
  render = () => {
    let { fnEdit, fnDel, list } = this.props

    return (
      <Fragment>
      { 
        list.map((valObj, i) =>  (
          <tbody key={i}>
            <tr>
              <td>{i + 1}</td>
              <td>{ valObj['Url site'] }</td>
              <td>{ valObj['Username or email'] }</td>
              <td>{ valObj['Password'] }</td>
              <td>{ new Date(valObj['Created At']).getDate() }-{ new Date(valObj['Created At']).getMonth() + 1 }-{ new Date(valObj['Created At']).getFullYear() }</td>
              <td>{ new Date(valObj['Update At']).getDate() }-{ new Date(valObj['Update At']).getMonth() + 1 }-{ new Date(valObj['Update At']).getFullYear() }</td>
              <td>
                <div className="ui grid centered">
                  <button className="ui mini icon red center floated button" onClick={() => fnDel(i)}>
                    <i className="ui trash icon"></i>
                  </button>
                  <button className="ui mini icon blue center floated button" onClick={() => fnEdit(valObj, i)}>
                    <i className="ui pencil icon"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        ))
      }
      </Fragment>
    )
  }
}

export default TBody
