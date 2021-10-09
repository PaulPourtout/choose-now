import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  onPress: () => void;
  icon: React.ReactElement;
}

export const IconButton = ({onPress, icon}: Props) => {
  const handlePress = () => {
    console.log('PRESSED ICON BUTTON');

    onPress();
  };

  return (
    <TouchableOpacity
      style={{
        width: 42,
        height: 42,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={handlePress}>
      {icon}
    </TouchableOpacity>
  );
};
