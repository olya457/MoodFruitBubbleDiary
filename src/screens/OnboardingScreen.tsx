import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  PixelRatio,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';

const { width, height } = Dimensions.get('window');

const THRESHOLD_WIDTH = 375; 

const ORIGINAL_IMAGE_WIDTH = 417;
const ORIGINAL_IMAGE_HEIGHT = 625;
const ORIGINAL_CARD_BOTTOM = 140;
const ORIGINAL_CARD_WIDTH = 422;
const ORIGINAL_CARD_HEIGHT = 197;
const ORIGINAL_CARD_BORDER_RADIUS = 43;
const ORIGINAL_CARD_PADDING_HORIZONTAL = 20;
const ORIGINAL_CARD_PADDING_TOP = 20;
const ORIGINAL_TITLE_FONT_SIZE = 22;
const ORIGINAL_TITLE_MARGIN_BOTTOM = 10;
const ORIGINAL_DESCRIPTION_FONT_SIZE = 15;
const ORIGINAL_DESCRIPTION_LINE_HEIGHT = 20;
const ORIGINAL_BUTTON_WRAPPER_BOTTOM = 40;
const ORIGINAL_BUTTON_IMAGE_WIDTH = 275;
const ORIGINAL_BUTTON_IMAGE_HEIGHT = 78;
const ORIGINAL_CONTAINER_PADDING_TOP_STEP1 = 50;
const ORIGINAL_CONTAINER_PADDING_TOP_OTHER_STEPS = 10;
const ORIGINAL_IMAGE_TRANSLATE_Y_OFFSET = 10;
const ORIGINAL_DESCRIPTION_TRANSLATE_Y_OFFSET = 50;
const ORIGINAL_BUTTON_TRANSLATE_Y_OFFSET = 70;

const getResponsiveValue = (originalValue: number) => {
  if (width <= THRESHOLD_WIDTH) {
    return Math.round(originalValue * (width / THRESHOLD_WIDTH));
  }
  return originalValue;
};

const getResponsiveFontSize = (originalFontSize: number) => {
    if (width <= THRESHOLD_WIDTH) {
        return originalFontSize * (width / THRESHOLD_WIDTH);
    }
    return originalFontSize;
};


const OnboardingScreen = () => {
  const [step, setStep] = useState(1);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const imageAnimatedValue = useRef(new Animated.Value(0)).current;
  const titleAnimatedValue = useRef(new Animated.Value(0)).current;
  const descriptionAnimatedValue = useRef(new Animated.Value(0)).current;
  const buttonAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(imageAnimatedValue, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(imageAnimatedValue, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [imageAnimatedValue]);

  useEffect(() => {
    titleAnimatedValue.setValue(0);
    descriptionAnimatedValue.setValue(0);
    buttonAnimatedValue.setValue(0);

    Animated.timing(titleAnimatedValue, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    Animated.timing(descriptionAnimatedValue, {
      toValue: 1,
      duration: 1000,
      delay: 200,
      easing: Easing.out(Easing.back(1)),
      useNativeDriver: true,
    }).start();

    Animated.timing(buttonAnimatedValue, {
      toValue: 1,
      duration: 1000,
      delay: 400,
      easing: Easing.out(Easing.back(1)),
      useNativeDriver: true,
    }).start();
  }, [step, titleAnimatedValue, descriptionAnimatedValue, buttonAnimatedValue]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigation.navigate('Home');
    }
  };

  const steps = [
    {
      image: require('../assets/strawberry_bulbavke.png'),
      title: 'Your mood is your fruit',
      description: `Choose the fruit\nthat matches your mood today.\nGet advice for the day\nand record your state with one touch.`,
      button: require('../assets/next.png'),
    },
    {
      image: require('../assets/tree_pink.png'),
      title: 'Garden of emotions in the\ncalendar',
      description: `See how your mood changed\nover the month.\nEvery day is a new bubble,\neach bubble is a story.`,
      button: require('../assets/continues.png'),
    },
    {
      image: require('../assets/six-wheelers_picture.png'),
      title: 'Make your mood beautiful',
      description: `Choose your style,\nreview the app or change settings.\nMood Bubbles are your personal\nspace of emotions.`,
      button: require('../assets/start.png'),
    },
  ];

  const current = steps[step - 1];

  const containerPaddingTop = step === 1
    ? getResponsiveValue(ORIGINAL_CONTAINER_PADDING_TOP_STEP1)
    : getResponsiveValue(ORIGINAL_CONTAINER_PADDING_TOP_OTHER_STEPS);

  const imageTranslateY = imageAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      -getResponsiveValue(ORIGINAL_IMAGE_TRANSLATE_Y_OFFSET),
      getResponsiveValue(ORIGINAL_IMAGE_TRANSLATE_Y_OFFSET)
    ],
  });

  const titleScale = titleAnimatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.8, 1.1, 1],
    extrapolate: 'clamp',
  });

  const titleOpacity = titleAnimatedValue.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0, 1, 1],
    extrapolate: 'clamp',
  });

  const descriptionTranslateY = descriptionAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [getResponsiveValue(ORIGINAL_DESCRIPTION_TRANSLATE_Y_OFFSET), 0],
    extrapolate: 'clamp',
  });

  const descriptionOpacity = descriptionAnimatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  const buttonTranslateY = buttonAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [getResponsiveValue(ORIGINAL_BUTTON_TRANSLATE_Y_OFFSET), 0],
    extrapolate: 'clamp',
  });

  const buttonOpacity = buttonAnimatedValue.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  return (
    <ImageBackground
      source={require('../assets/background_loading.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={[styles.container, { paddingTop: containerPaddingTop }]}>
        <Animated.View style={{ transform: [{ translateY: imageTranslateY }] }}>
          <Image source={current.image} style={styles.image} resizeMode="contain" />
        </Animated.View>

        <View style={styles.card}>
          <Animated.Text
            style={[
              styles.title,
              {
                opacity: titleOpacity,
                transform: [{ scale: titleScale }],
              },
            ]}
          >
            {current.title}
          </Animated.Text>

          <Animated.Text
            style={[
              styles.description,
              {
                opacity: descriptionOpacity,
                transform: [{ translateY: descriptionTranslateY }],
              },
            ]}
          >
            {current.description}
          </Animated.Text>
        </View>

        <Animated.View
          style={[
            styles.buttonWrapper,
            {
              opacity: buttonOpacity,
              transform: [{ translateY: buttonTranslateY }],
            },
          ]}
        >
          <TouchableOpacity activeOpacity={0.8} onPress={handleNext}>
            <Image source={current.button} style={styles.buttonImage} resizeMode="contain" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: getResponsiveValue(ORIGINAL_IMAGE_WIDTH),
    height: getResponsiveValue(ORIGINAL_IMAGE_HEIGHT),
    maxHeight: height * 0.7, 
    maxWidth: width * 0.95, 
  },
  card: {
    position: 'absolute',
    bottom: getResponsiveValue(ORIGINAL_CARD_BOTTOM),
    width: getResponsiveValue(ORIGINAL_CARD_WIDTH), 
    height: getResponsiveValue(ORIGINAL_CARD_HEIGHT), 
    minHeight: getResponsiveValue(150), 
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: getResponsiveValue(ORIGINAL_CARD_BORDER_RADIUS),
    paddingHorizontal: getResponsiveValue(ORIGINAL_CARD_PADDING_HORIZONTAL),
    paddingTop: getResponsiveValue(ORIGINAL_CARD_PADDING_TOP),
    alignItems: 'center',
    justifyContent: 'center', 
    maxWidth: width * 0.9, 
  },
  title: {
    fontSize: getResponsiveFontSize(ORIGINAL_TITLE_FONT_SIZE),
    fontWeight: '600',
    color: '#E4297F',
    textAlign: 'center',
    marginBottom: getResponsiveValue(ORIGINAL_TITLE_MARGIN_BOTTOM),
  },
  description: {
    fontSize: getResponsiveFontSize(ORIGINAL_DESCRIPTION_FONT_SIZE),
    color: '#333',
    textAlign: 'center',
    lineHeight: getResponsiveFontSize(ORIGINAL_DESCRIPTION_LINE_HEIGHT),
    paddingHorizontal: getResponsiveValue(5), 
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: getResponsiveValue(ORIGINAL_BUTTON_WRAPPER_BOTTOM),
    width: '100%',
    alignItems: 'center',
  },
  buttonImage: {
    width: getResponsiveValue(ORIGINAL_BUTTON_IMAGE_WIDTH),
    height: getResponsiveValue(ORIGINAL_BUTTON_IMAGE_HEIGHT),
    maxWidth: width * 0.75, 
    maxHeight: height * 0.1, 
  },
});