import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Svg, {Circle, G, Text as SVGText} from 'react-native-svg';
import {PinIcon} from './components/icons/PinIcon';

const WHEEL_COLORS = [
  '#FFD371',
  '#9DDAC6',
  '#F9B208',
  '#FF449F',
  '#005F99',
  '#9DDAC6',
  '#FFD371',
  '#C2FFD9',
  '#F9B208',
  '#FFD371',
  '#FF449F',
  '#005F99',
  '#9DDAC6',
];

interface Props {
  choices: string[];
}

export const WheelView = ({choices}: Props) => {
  const size = 32;
  const center = size / 2;
  const strokeWidth = center - 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const circlePercentage = (1 / choices.length) * 100;
  const dash = (circlePercentage * circumference) / 100;
  const convertPercentageToDegrees = (percent: number): number =>
    360 * (percent / 100);
  const [choiceValue, setChoiceValue] = useState(0);
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(false);

  // Animation
  let rotateAnimation = useRef(new Animated.Value(0));

  let interpolateRotating = rotateAnimation.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });

  const resetAnimaton = () => {
    rotateAnimation.current.setValue(0);
  };

  const handleAnimation = (toValue: number) => {
    Animated.timing(rotateAnimation.current, {
      toValue: toValue / 100 + 15,
      duration: 5000,
      easing: Easing.out(Easing.circle),
      useNativeDriver: true,
    }).start();
  };

  // Set Choice
  const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * 100);
  };

  const handleLaunchLottery = () => {
    resetAnimaton();
    setIsAnimationEnabled(true);
    const newValue = generateRandomNumber();
    handleAnimation(newValue);
    setChoiceValue(newValue);
    setTimeout(() => {
      // const winner = checkWinningChoice(choiceValue);
      setIsAnimationEnabled(false);
    }, 5000);
  };

  // const checkWinningChoice = (result: number): string | null => {
  //   const choiceSize = 100 / choices.length;
  //   for (let i = 0; i <= choices.length; i++) {
  //     if (result >= choiceSize * i && result <= choiceSize * (i + 1)) {
  //       return choices[i];
  //     }
  //   }
  //   return null;
  // };

  return (
    <View style={styles.container}>
      <View style={styles.pinContainer}>
        <PinIcon color="#C2FFD9" size={40} />
      </View>
      <Animated.View
        style={{
          ...styles.svgContainer,
          transform: [{rotate: interpolateRotating}],
        }}>
        <TouchableOpacity
          onPress={handleLaunchLottery}
          disabled={isAnimationEnabled}>
          <Svg viewBox={`0 0 ${size} ${size}`} style={styles.svgRoot}>
            {choices.map((choice: string, index: number) => {
              const id = `${choice}-${index}`;
              return (
                <G
                  key={id}
                  transform={`rotate(${
                    -90 + convertPercentageToDegrees(circlePercentage * index)
                  }, ${center}, ${center})`}>
                  <Circle
                    id={id}
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={WHEEL_COLORS[index]}
                    strokeWidth={strokeWidth}
                    strokeDasharray={[dash, circumference - dash]}
                  />

                  <SVGText
                    fill="#FFF"
                    fontSize={1.5}
                    x={3}
                    transform={`translate(15.75 16.25) rotate(${
                      convertPercentageToDegrees(circlePercentage) / 2
                    })`}
                    fontFamily={Platform.OS === 'ios' ? 'System' : 'monospace'}
                    textAnchor="start"
                    fontWeight="bold"
                    alignmentBaseline="middle">
                    {choice}
                  </SVGText>
                </G>
              );
            })}

            <Circle
              cx={center}
              cy={center}
              r={2}
              strokeWidth={0.5}
              stroke="#f97808"
            />
            <Circle
              cx={center}
              cy={center}
              r={center - 0.5 / 2}
              strokeWidth={0.5}
              stroke="#ff9c32"
            />
          </Svg>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  svgContainer: {
    marginVertical: 30,
  },
  svgRoot: {
    height: 350,
    width: 350,
    backgroundColor: 'transparent',
    borderRadius: 100,
    overflow: 'hidden',
  },
  pinContainer: {
    position: 'relative',
    bottom: -50,
    zIndex: 2,
  },
});
