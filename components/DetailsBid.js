import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ETHPrice } from './SubInfo';
import { COLORS, SIZES, FONTS } from '../constants';

const DetailsBid = ({ bid, onPressBidder }) => {
  return (
    <TouchableOpacity
      disabled={!onPressBidder}
      onPress={() => onPressBidder?.(bid.name)}
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: SIZES.base,
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.font,
        backgroundColor: COLORS.card,
        borderRadius: SIZES.large,
      }}
    >
      <Image
        source={bid.image}
        resizeMode="contain"
        style={{ width: 48, height: 48, borderRadius: 24, marginRight: SIZES.font }}
      ></Image>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: SIZES.small,
            color: onPressBidder ? COLORS.accent : COLORS.primary,
          }}
        >
          Bid placed by {bid.name}
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.small - 2,
            color: COLORS.muted,
            marginTop: 3,
          }}
        >
          {bid.date}
        </Text>
      </View>
      <ETHPrice price={bid.price} />
    </TouchableOpacity>
  );
};

export default DetailsBid;
