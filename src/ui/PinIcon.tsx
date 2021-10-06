import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color?: string;
  size?: number;
}

export const PinIcon = (props: Props) => {
  return (
    <Svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24">
      <Path
        fill={props.color ?? '#000'}
        d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
      />
    </Svg>
  );
};
