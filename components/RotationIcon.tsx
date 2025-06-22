// Reusable animated icon component with conditional rotation based on active state
import { Image, Animated, Easing, ImageSourcePropType } from 'react-native';
import { useEffect, useRef, FC } from 'react';
import { GEAR_ROTATION } from '@/utils/constants';
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

  // Continuous rotation
  useEffect(() => {
    if (isActive) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: GEAR_ROTATION.END_VALUE,
          duration: GEAR_ROTATION.DURATION,
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
