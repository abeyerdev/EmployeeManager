import React, { Component } from 'react';
import { Picker, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Input } from './common';
import { employeeUpdate } from '../actions';

class EmployeeForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input 
            label="Name" 
            placeholder="Adam" 
            value={this.props.name} 
            onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })} 
          />
        </CardSection>
        <CardSection>
          <Input 
            label="Phone" 
            placeholder="555-555-5555" 
            value={this.props.phone} 
            onChangeText={value => this.props.employeeUpdate({ prop: 'phone', value })} 
          />          
        </CardSection>
        <CardSection>
          <Text style={styles.pickerTextStyle}>Shift</Text>
          <Picker 
            selectedValue={this.props.shift} 
            onValueChange={value => this.props.employeeUpdate({ prop: 'shift', value })}
            style={{ flex: 2 }}
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>            
        </CardSection>
      </View>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
    alignSelf: 'center'
  }
};

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};


export default connect(mapStateToProps, employeeUpdate)(EmployeeForm);