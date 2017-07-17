import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import _ from 'lodash';
import { getEmployees } from '../actions';
import EmployeeListItem from './EmployeeListItem';

class EmployeeList extends Component {
  
  componentWillMount() {
    this.props.getEmployees();  
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this comnponent will be rendered with
    // this.props is the old props
    this.createDataSource(nextProps);    
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee) {
    return <EmployeeListItem employee={employee} />;
  }

  render() {    
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  const employees = _.map(state.employees, (employee, uid) => {
    // create an array of objects like this:
    // name:"Alex", phone:"444-452-1222", shift:"Wednesday", uid:"-KoPwv0eAx0mKsyPHmUO"
    return { ...employee, uid }; 
  });

  return { employees };
};

export default connect(mapStateToProps, { getEmployees })(EmployeeList);