import { TouchableOpacity, View, Text, Image } from 'react-native';
import React from 'react';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants';

export const CircleButton = ({ imgUrl, handlePress, ...props }) => {
  const {
    backgroundColor = 'rgba(255,255,255,0.92)',
    tintColor,
    ...styleProps
  } = props;

  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        backgroundColor,
        position: 'absolute',
        borderRadius: SIZES.extraLarge,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.light,
        ...styleProps,
      }}
      onPress={handlePress}
    >
      <Image
        source={imgUrl}
        resizeMode="contain"
        style={{ width: 24, height: 24, tintColor }}
      />
    </TouchableOpacity>
  );
};

export const RectButton = ({ minWidth, fontSize, handlePress, ...props }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.accent,
        borderRadius: SIZES.extraLarge,
        minWidth: minWidth,
        paddingVertical: SIZES.small + 2,
        paddingHorizontal: SIZES.medium,
        ...props,
      }}
      onPress={handlePress}
    >
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: fontSize,
          color: COLORS.primary,
          textAlign: 'center',
        }}
      >
        Place a Bid
      </Text>
    </TouchableOpacity>
  );
};
