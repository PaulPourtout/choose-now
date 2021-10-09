import React from 'react';
import Svg, {Rect, G, Polygon} from 'react-native-svg';

interface Props {
  color?: string;
  size?: number;
}

export const BackIcon = (props: Props) => {
  return (
    <Svg
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill={props.color ?? '#000'}>
      <Rect fill="none" height="24" width="24" />
      <G>
        <Polygon points="17.77,3.77 16,2 6,12 16,22 17.77,20.23 9.54,12" />
      </G>
    </Svg>
  );
};
