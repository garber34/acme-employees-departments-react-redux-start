import React from 'react';
import {connect} from 'react-redux'

const Stats = ({ employees })=> {
  return (
    <p>{ employees.length } Total Employees</p>
  );
};

const stateProps = state =>({employees:state.employees})


export default connect(stateProps)(Stats)
