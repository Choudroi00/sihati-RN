import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  BackHandler,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  TextStyle,
  ModalProps as RNModalProps,
} from 'react-native';

type AnimationType = 'slide' | 'fade' | 'scale' ;
type Position = 'bottom' | 'center' | 'top';
type ButtonsVariant = 'default' | 'single' | 'none';

interface ButtonsProps {
  variant?: ButtonsVariant;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmStyle?: ViewStyle;
  cancelStyle?: ViewStyle;
  confirmTextStyle?: TextStyle;
  cancelTextStyle?: TextStyle;
  customButtons?: React.ReactNode;
}

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onClose: () => void;
  showCloseButton?: boolean;
  customHeader?: React.ReactNode;
}

interface XModalProps extends Omit<RNModalProps, 'visible' | 'transparent' | 'onRequestClose' | 'animationType'> {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  
  // Content
  title?: string;
  subtitle?: string;
  
  // Style
  position?: Position;
  width?: number | string;
  height?: number | string;
  backdropOpacity?: number;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  
  // Animation
  animationDuration?: number;
  animationType?: AnimationType;
  
  // Header
  showHeader?: boolean;
  showCloseButton?: boolean;
  customHeader?: React.ReactNode;
  
  // Buttons
  buttonsVariant?: ButtonsVariant;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmStyle?: ViewStyle;
  cancelStyle?: ViewStyle;
  confirmTextStyle?: TextStyle;
  cancelTextStyle?: TextStyle;
  customButtons?: React.ReactNode;
  
  // Behavior
  closeOnBackdropPress?: boolean;
  closeOnHardwareBack?: boolean;
  avoidKeyboard?: boolean;
  
  // Additional
  statusBarTranslucent?: boolean;
  testID?: string;
}

const ANIMATION_DURATION = 300;
const BACKDROP_OPACITY = 0.5;

const XModalButtons: React.FC<ButtonsProps> = ({ 
  variant = 'default',
  onConfirm, 
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmStyle,
  cancelStyle,
  confirmTextStyle,
  cancelTextStyle,
  customButtons
}) => {
  if (customButtons) return customButtons;

  switch (variant) {
    case 'single':
      return (
        <TouchableOpacity 
          onPress={onConfirm}
          className="mt-4 bg-blue-500 p-4 rounded-lg"
          style={confirmStyle}
          activeOpacity={0.9}
        >
          <Text className="text-white text-center font-bold" style={confirmTextStyle}>
            {confirmText}
          </Text>
        </TouchableOpacity>
      );
    
    case 'none':
      return null;
      
    default:
      return (
        <View className="flex-row justify-between mt-4 space-x-4">
          <TouchableOpacity 
            activeOpacity={0.9}
            onPress={onCancel}
            className="flex-1 bg-gray-200 p-4 rounded-lg"
            style={cancelStyle}
          >
            <Text className="text-gray-700 text-center font-bold" style={cancelTextStyle}>
              {cancelText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={0.9}
            onPress={onConfirm}
            className="flex-1 bg-blue-500 p-4 rounded-lg"
            style={confirmStyle}
          >
            <Text className="text-white text-center font-bold" style={confirmTextStyle}>
              {confirmText}
            </Text>
          </TouchableOpacity>
        </View>
      );
  }
};

const ModalHeader: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onClose,
  showCloseButton = true,
  customHeader
}) => {
  if (customHeader) return customHeader;
  
  return (
    <View className="border-b border-gray-200 pb-4">
      {showCloseButton && (
        <TouchableOpacity 
        activeOpacity={0.9}
          onPress={onClose}
          className="absolute right-0 top-0 p-2 z-10"
        >
          <Text className="text-2xl">×</Text>
        </TouchableOpacity>
      )}
      {title && (
        <Text className="text-xl font-bold text-center">
          {title}
        </Text>
      )}
      {subtitle && (
        <Text className="text-sm text-gray-600 text-center mt-1">
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const XModal: React.FC<XModalProps> = ({
  visible,
  onClose,
  children,
  title,
  subtitle,
  position = 'bottom',
  width = '100%',
  height,
  backdropOpacity = BACKDROP_OPACITY,
  style,
  contentContainerStyle,
  animationDuration = ANIMATION_DURATION,
  animationType = 'slide',
  showHeader = true,
  showCloseButton = true,
  customHeader,
  buttonsVariant = 'default',
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  confirmStyle,
  cancelStyle,
  confirmTextStyle,
  cancelTextStyle,
  customButtons,
  closeOnBackdropPress = true,
  closeOnHardwareBack = true,
  avoidKeyboard = true,
  statusBarTranslucent = true,
  testID,
  ...modalProps
}) => {
  const [showModal, setShowModal] = useState(visible);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

  useEffect(() => {
    handleVisibilityChange(visible);
  }, [visible]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );
    return () => backHandler.remove();
  }, [visible, closeOnHardwareBack]);

  const handleBackPress = () => {
    if (visible && closeOnHardwareBack) {
      onClose();
      return true;
    }
    return false;
  };

  const handleVisibilityChange = (isVisible: boolean) => {
    if (isVisible) {
      setShowModal(true);
      startAnimation(1);
    } else {
      startAnimation(0, () => setShowModal(false));
    }
  };

  const startAnimation = (toValue: number, callback?: Animated.EndCallback) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  const getAnimationStyle = (): ViewStyle => {
    const animations: Record<AnimationType, ViewStyle> = {
      slide: {
        transform: [{
          translateY: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [screenHeight, 0],
          }),
        }],
      },
      fade: {
        opacity: slideAnim,
      },
      scale: {
        transform: [{
          scale: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 1],
          }),
        }],
      },
    };

    return animations[animationType] || animations.slide;
  };

  const getPositionStyle = (): string => {
    const positions: Record<Position, string> = {
      center: 'justify-center items-center',
      top: 'justify-start items-center',
      bottom: 'justify-end items-center',
    };
    return positions[position];
  };

  if (!showModal) return null;

  const Container = avoidKeyboard ? KeyboardAvoidingView : View;
  const containerProps : {behavior: "position" | "padding" | "height" | undefined} = avoidKeyboard ? {
    behavior: Platform.OS === 'ios' ? 'padding' : 'height'
  } : {behavior: undefined};

  return (
    <Modal
      transparent
      visible={showModal}
      onRequestClose={handleBackPress}
      statusBarTranslucent={statusBarTranslucent}
      testID={testID}
      {...modalProps}
    >
      <Container 
        className={`flex-1 ${getPositionStyle()}`}
        {...containerProps}
      >
        <TouchableWithoutFeedback 
          onPress={() => closeOnBackdropPress && onClose()}
        >
          <Animated.View 
            className="absolute inset-0 bg-black"
            style={{ 
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, backdropOpacity]
              })
            }}
          />
        </TouchableWithoutFeedback>

        <Animated.View 
          className="bg-white rounded-t-3xl overflow-hidden"
          style={[
            { width: parseInt(width.toString()) },
            height ? { height: parseInt(height.toString()) }: {},
            getAnimationStyle(),
            style
          ]}
        >
          <View 
            className="p-4"
            style={contentContainerStyle}
          >
            {showHeader && (
              <ModalHeader
                title={title}
                subtitle={subtitle}
                onClose={onClose}
                showCloseButton={showCloseButton}
                customHeader={customHeader}
              />
            )}
            
            <View className="mt-4">
              {children}
            </View>

            <XModalButtons
              variant={buttonsVariant}
              onConfirm={onConfirm}
              onCancel={onCancel}
              confirmText={confirmText}
              cancelText={cancelText}
              confirmStyle={confirmStyle}
              cancelStyle={cancelStyle}
              confirmTextStyle={confirmTextStyle}
              cancelTextStyle={cancelTextStyle}
              customButtons={customButtons}
            />
          </View>
        </Animated.View>
      </Container>
    </Modal>
  );
};

export default XModal;