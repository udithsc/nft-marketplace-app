import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ETHPrice, NFTTitle } from './SubInfo';
import { COLORS, SIZES, FONTS } from '../constants';

const DetailsDesc = ({ data, onCreatorPress }) => {
  const [text, setText] = useState(data.description.slice(0, 100));
  const [readMore, setReadMore] = useState(false);

  return (
    <>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <NFTTitle
          title={data.name}
          subTitle={data.creator}
          titleSize={SIZES.extraLarge}
          subTitleSize={SIZES.font}
          onPressSubTitle={onCreatorPress}
        />
        <ETHPrice price={data.price} />
      </View>
      <View
        style={{
          marginTop: SIZES.extraLarge,
          padding: SIZES.font + 2,
          backgroundColor: COLORS.surface,
          borderRadius: SIZES.large,
        }}
      >
        <Text
          style={{
            fontSize: SIZES.font,
            fontFamily: FONTS.semiBold,
            color: COLORS.primary,
          }}
        >
          Description
        </Text>
        <View style={{ marginTop: SIZES.base }}>
          <Text
            style={{
              fontSize: SIZES.small,
              fontFamily: FONTS.regular,
              color: COLORS.secondary,
              lineHeight: 22,
            }}
          >
            {text}
            {!readMore && '...'}
            <Text
              style={{
                fontSize: SIZES.small,
                fontFamily: FONTS.semiBold,
                color: COLORS.accent,
              }}
              onPress={() => {
                if (!readMore) {
                  setText(data.description);
                  setReadMore(true);
                } else {
                  setText(data.description.slice(0, 100));
                  setReadMore(false);
                }
              }}
            >
              {readMore ? ' Show Less' : ' Read More'}
            </Text>
          </Text>
        </View>
      </View>
    </>
  );
};

export default DetailsDesc;
