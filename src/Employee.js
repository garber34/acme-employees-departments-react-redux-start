import React from 'react';
import { destroyEmployee, removeFromDepartment } from './store';
import {connect} from 'react-redux'

const Employee = ({ employee, destroyEmployee, removeFromDepartment })=> {

  return (
    <li key={ employee.id }>
      { employee.name }
      <button onClick={ ()=> destroyEmployee(employee)}>x</button>
      {
        !!removeFromDepartment && (
          <button onClick={ ()=> removeFromDepartment(employee)}>Remove From Department</button>
        )
      }
    </li>
  );
};

const dispatchProps = dispatch => ({destroyEmployee:(employee)=>dispatch(destroyEmployee(employee)),
                                    removeFromDepartment:(employee)=>dispatch(removeFromDepartment(employee))
                                  })
export default connect(null,dispatchProps)(Employee);
