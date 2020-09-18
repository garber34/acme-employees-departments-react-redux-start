import {createStore, applyMiddleware,compose} from 'redux';
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios';

///initialstate

const initialState = {employees:[],departments:[]}


/////action types
const INITIALIZE_STORE = 'INITIALIZE_STORE';
const DESTROY_EMPLOYEE = 'DESTROY_EMPLOYEE';
const REMOVE_FROM_DEPARTMENT = 'REMOVE_FROM_DEPARTMENT';

////action creators
function employeeDestroyed(employees){
    return {
    type:DESTROY_EMPLOYEE,
    employees
  }
}

function removeEmployee(employees){
  return{
    type:REMOVE_FROM_DEPARTMENT,
    employees
  }
}

function initializeStore(departments,employees){
  return{
    type:INITIALIZE_STORE,
    departments,
    employees
  }
}

export function fetchData(){
  return async function(dispatch){
    const responses = await Promise.all([
      axios.get('/api/departments'),
      axios.get('/api/employees')
    ]);
    dispatch(initializeStore(responses[0].data,responses[1].data))
  }
}

  export function destroyEmployee(employee){
    return async function(dispatch){
    await axios.delete(`/api/employees/${employee.id}`);
    const employees =await axios.get('/api/employees')
    dispatch(employeeDestroyed(employees.data))
  }
}
  export function  removeFromDepartment(employee){
    console.log("remove")
   return async function(dispatch){
     await axios.put(`/api/employees/${employee.id}`, { departmentId: null}).data;
   const employees =await axios.get('/api/employees')
   dispatch(removeEmployee(employees.data))
  }
}




//////reducers
function reducer(state=initialState,action){
  switch(action.type){
    case INITIALIZE_STORE:
      return {departments:action.departments,employees:action.employees}

    case DESTROY_EMPLOYEE:
      const newEmployees= [...action.employees]
      console.log(newEmployees)
      return {...state,employees:newEmployees}

    case REMOVE_FROM_DEPARTMENT:
      return {...state,employees:[...action.employees]}
    default: return state

  }

}


/////store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares= applyMiddleware(logger,thunkMiddleware)
const store = createStore(reducer,composeEnhancers(middlewares));

export default store;
