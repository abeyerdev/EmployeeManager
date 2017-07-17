import React from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';
import EditEmployee from './components/EditEmployee';

// wrapping Scenes to restrict built in back/forward buttons to employee management and not auth
const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Please Login" />        
      </Scene>
      <Scene key="main">
        <Scene 
          key="employees" 
          component={EmployeeList} 
          title="Employees" 
          rightTitle="Add"
          onRight={() => Actions.createEmployee()}
          initial 
        />
        <Scene key="createEmployee" component={CreateEmployee} title="Create Employee" />
        <Scene key="editEmployee" component={EditEmployee} title="Edit Employee" />
      </Scene>
    </Router>  
  );
};

export default RouterComponent;