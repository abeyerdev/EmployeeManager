import React from 'react';
import { Modal, Text, View } from 'react-native';
import { Button } from './Button';
import { CardSection } from './CardSection';

const Confirm = ({ children, visible, onYes, onNo }) => {
  const { containerStyle, cardSectionStyle, textStyle } = styles;
  
  return (
    <Modal 
      animationType="slide"    
      onRequestClose={() => {}} // just need something here on android
      transparent
      visible={visible}
    >
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
          <Text style={textStyle}>
            {children}
          </Text>
        </CardSection>
        <CardSection>
          <Button onPress={onYes}>Yes</Button>
          <Button onPress={onNo}>No</Button>
        </CardSection>
      </View>
    </ Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    lineHeight: 40,
    textAlign: 'center'
  }
};

export { Confirm };