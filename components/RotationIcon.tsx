import { Image, Animated, Easing, ImageSourcePropType } from 'react-native';
import { useEffect, useRef, FC } from 'react';
import React from 'react';

interface RotatingIconProps {
  source: ImageSourcePropType;
  size: number;
  isActive: boolean;
}

export const RotatingIcon: FC<RotatingIconProps> = ({
  source,
  size,
  isActive,
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      rotateAnim.setValue(0);
    }
  }, [isActive]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <Image
        source={source}
        style={{
          width: size,
          height: size,
        }}
        resizeMode="contain"
      />
    </Animated.View>
  );
};
