import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Animated,
  Dimensions,
} from 'react-native';
import {
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';

const { width, height } = Dimensions.get('window');

const bubblesConfig = [
  { id: 1, size: 200, top: 100, left: 40, delay: 0 },
  { id: 2, size: 90, top: -40, left: -10, delay: 1000 },
  { id: 3, size: 90, top: -140, left: width - 100, delay: 2000 },
  { id: 4, size: 70, top: height - 200, left: 30, delay: 3000 },
  { id: 5, size: 120, top: height - 150, left: width / 2 - 60, delay: 1500 },
];

const animatedImages = [
  require('../assets/bubbles1.png'),
  require('../assets/bubbles2.png'),
  require('../assets/bubbles3.png'),
  require('../assets/bubbles4.png'),
  require('../assets/bubbles5.png'),
  require('../assets/bubbles6.png'),
  require('../assets/bubbles7.png'),
];

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [index, setIndex] = useState(0);
  const [activeLayer, setActiveLayer] = useState<'A' | 'B'>('A');

  const opacityA = useRef(new Animated.Value(1)).current;
  const opacityB = useRef(new Animated.Value(0)).current;

  const animatedValues = useRef<Animated.Value[]>(
    bubblesConfig.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    bubblesConfig.forEach((bubble, i) => {
      const animate = () => {
        Animated.sequence([
          Animated.timing(animatedValues[i], {
            toValue: -20,
            duration: 2000,
            delay: bubble.delay,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValues[i], {
            toValue: 20,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]).start(() => animate());
      };
      animate();
    });
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    let currentLayer: 'A' | 'B' = 'A';

    const runTransition = () => {
      if (currentIndex >= animatedImages.length - 1) {
        setTimeout(() => navigation.navigate('Onboarding'), 800);
        return;
      }

      const fadeOut = currentLayer === 'A' ? opacityA : opacityB;
      const fadeIn = currentLayer === 'A' ? opacityB : opacityA;

      fadeIn.setValue(0);

      Animated.parallel([
        Animated.timing(fadeOut, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(fadeIn, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start(() => {
        currentIndex += 1;
        currentLayer = currentLayer === 'A' ? 'B' : 'A';
        setIndex(currentIndex);
        setActiveLayer(currentLayer);
        setTimeout(runTransition, 1200);
      });
    };

    runTransition();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/background_loading.png')}
      style={styles.container}
      resizeMode="cover"
    >
      {}
      {bubblesConfig.map((bubble, i) => (
        <Animated.View
          key={bubble.id}
          style={[
            styles.bubble,
            {
              width: bubble.size,
              height: bubble.size,
              top: bubble.top,
              left: bubble.left,
              transform: [{ translateY: animatedValues[i] }],
            },
          ]}
        >
          <View style={styles.bubbleGlow} />
          <View style={styles.bubbleInner1} />
          <View style={styles.bubbleInner2} />
        </Animated.View>
      ))}

      {}
      <View style={styles.centerImageContainer}>
        <Animated.Image
          source={animatedImages[index]}
          style={[styles.centerImage, { opacity: activeLayer === 'A' ? opacityA : opacityB }]}
          resizeMode="contain"
        />
        {index + 1 < animatedImages.length && (
          <Animated.Image
            source={animatedImages[index + 1]}
            style={[
              styles.centerImage,
              styles.imageOverlay,
              { opacity: activeLayer === 'A' ? opacityB : opacityA },
            ]}
            resizeMode="contain"
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerImageContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerImage: {
    width: 190,
    height: 250,
  },
  imageOverlay: {
    position: 'absolute',
  },
  bubble: {
    position: 'absolute',
    borderRadius: 100,
    overflow: 'hidden',
  },
  bubbleGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: '#0fb4ff',
    opacity: 0.3,
  },
  bubbleInner1: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 100,
    borderLeftWidth: 10,
    borderLeftColor: '#ff4484',
    opacity: 0.3,
  },
  bubbleInner2: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 100,
    borderTopWidth: 10,
    borderTopColor: '#ffeb3b',
    opacity: 0.3,
  },
});
