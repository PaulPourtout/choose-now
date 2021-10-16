import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color?: string;
  size?: number;
}

export const CheckIcon = (props: Props) => {
  return (
    <Svg
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill={props.color ?? '#000'}>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </Svg>
  );
};
