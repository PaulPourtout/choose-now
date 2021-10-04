import {
  Alert,
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Svg, {Circle, G, Text as SVGText, TextPath} from 'react-native-svg';

const WHEEL_COLORS = [
  '#FF4848',
  '#FFF5B7',
  '#C2FFD9',
  '#FF449F',
  '#005F99',
  '#9DDAC6',
  '#FFD371',
  '#FF4848',
  '#FFF5B7',
  '#C2FFD9',
  '#FF449F',
  '#005F99',
  '#9DDAC6',
  '#FFD371',
];

export const WheelView = ({choices}) => {
  const size = 32;
  const center = size / 2;
  const strokeWidth = center;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const circlePercentage = (1 / choices.length) * 100;
  const dash = (circlePercentage * circumference) / 100;
  const convertPercentageToDegrees = (percent: number): number =>
    360 * (percent / 100);
  const [choiceValue, setChoiceValue] = useState(0);

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
      toValue: toValue / 100,
      duration: 5000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  };

  // Set Choice
  const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * 100);
  };

  const getAnswer = () => {
    resetAnimaton();
    setChoiceValue(generateRandomNumber());
    handleAnimation(choiceValue);
    setTimeout(() => {
      const winner = checkWinningChoice(choiceValue);
      Alert.alert(`winner IS`, `winner: ${winner}`);
    });
  };

  const checkWinningChoice = (result: number): string | null => {
    const choiceSize = 100 / choices.length;
    for (let i = 0; i <= choices.length; i++) {
      console.log({
        choice: choices[i],
        result,
        index: choiceSize * i,
        isBigger: result >= choiceSize * i,
        isLower: result <= choiceSize * (i + 1),
        toDegrees: convertPercentageToDegrees(choiceValue),
      });

      if (result >= choiceSize * i && result <= choiceSize * (i + 1)) {
        return choices[i];
      }
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.picker} />
      <TouchableOpacity onPress={getAnswer}>
        <Animated.View
          style={{
            ...styles.svgContainer,
            transform: [{rotate: interpolateRotating}],
          }}>
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

                  <SVGText fill="black" fontSize={2}>
                    <TextPath xlinkHref={`#${id}`} textAnchor="middle">
                      {choice}
                    </TextPath>
                  </SVGText>
                </G>
              );
            })}
          </Svg>
        </Animated.View>
      </TouchableOpacity>
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
    height: 300,
    width: 300,
    backgroundColor: 'transparent',
    borderRadius: 100,
    overflow: 'hidden',
  },
  picker: {
    width: 10,
    height: 50,
    position: 'relative',
    bottom: -50,
    zIndex: 2,
    backgroundColor: '#FFF',
  },
});
