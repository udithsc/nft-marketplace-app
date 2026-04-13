import { View, Text, Image, TouchableOpacity } from 'react-native';
import { assets, COLORS, FONTS, SHADOWS, SIZES } from '../constants';

export const NFTTitle = ({
  title,
  subTitle,
  titleSize,
  subTitleSize,
  onPressSubTitle,
}) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: titleSize,
          color: COLORS.primary,
        }}
      >
        {title}
      </Text>
      <TouchableOpacity disabled={!onPressSubTitle} onPress={onPressSubTitle}>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: subTitleSize,
            color: onPressSubTitle ? COLORS.accent : COLORS.muted,
            marginTop: SIZES.base / 2,
          }}
        >
          by {subTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const ETHPrice = ({ price }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={assets.eth}
        resizeMode="contain"
        style={{ width: 20, height: 20, marginRight: 2 }}
      />
      <Text
        style={{
          fontFamily: FONTS.medium,
          fontSize: SIZES.font,
          color: COLORS.primary,
        }}
      >
        {price} ETH
      </Text>
    </View>
  );
};

export const ImageCmp = ({ imgUrl, index }) => {
  return (
    <Image
      source={imgUrl}
      resizeMode="contain"
      style={{
        width: 40,
        height: 40,
        marginLeft: index === 0 ? 0 : -SIZES.font,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.white,
      }}
    />
  );
};

export const People = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[assets.person02, assets.person03, assets.person04].map(
        (imgUrl, index) => (
          <ImageCmp imgUrl={imgUrl} index={index} key={`people-${index}`} />
        )
      )}
    </View>
  );
};
export const EndDate = ({ endingIn }) => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.font + 2,
        paddingVertical: SIZES.base + 2,
        backgroundColor: COLORS.card,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.light,
        elevation: 1,
        maxWidth: '55%',
        borderRadius: SIZES.medium,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: SIZES.small,
          color: COLORS.muted,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
      >
        Ending In
      </Text>
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          fontSize: SIZES.medium,
          color: COLORS.primary,
          marginTop: 2,
        }}
        >
        {endingIn}
      </Text>
    </View>
  );
};
export const SubInfo = ({ endingIn = '12h 30m' }) => {
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: SIZES.font,
        marginTop: -SIZES.extraLarge,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <People />
      <EndDate endingIn={endingIn} />
    </View>
  );
};
