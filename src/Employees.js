import React from 'react';
import Employee from './Employee';
import {connect} from 'react-redux'

const Employees = ({ department, employees})=> {
  return (
      <ul>
        {
          employees.filter( employee => employee.departmentId === (department ? department.id : null )).map( employee => <Employee
            employee={ employee }
            key={ employee.id }/>)
        }
      </ul>
  );
};

const stateProps = (state,ownProps) =>({employees:state.employees})
export default connect(stateProps)(Employees);
