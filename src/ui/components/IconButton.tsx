import React from 'react';
import {TouchablePlatform} from './TouchablePlatform';

interface Props {
  onPress: () => void;
  icon: React.ReactElement;
}

export const IconButton = ({onPress, icon}: Props) => (
  <TouchablePlatform
    style={{
      width: 42,
      height: 42,
      padding: 12,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}>
    {icon}
  </TouchablePlatform>
);
