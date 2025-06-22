// Custom animated loader component using Rick and Morty portal image with scaling, rotation and pulse effects
import { Animated, Easing, View, StyleSheet } from 'react-native';
import { PORTAL } from '@/utils/constants';
import { useEffect, useRef } from 'react';
import React from 'react';

export const Loader = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Continuous rotation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: PORTAL.ROTATION.END_VALUE,
        duration: PORTAL.ROTATION.DURATION,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    // Pulsing effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: PORTAL.PULSE.SCALE_UP,
          duration: PORTAL.PULSE.DURATION_UP,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: PORTAL.PULSE.SCALE_UP,
          duration: PORTAL.PULSE.DURATION_DOWN,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  });

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        source={require('@/resources/images/portal.png')}
        style={[
          styles.image,
          {
            transform: [{ scale: pulseAnim }, { rotate }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  image: {
    height: 100,
    width: 100,
  },
});
