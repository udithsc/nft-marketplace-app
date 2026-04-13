import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { COLORS, SIZES, SHADOWS, FONTS, assets, formatEthAmount } from '../constants';
import { CircleButton, RectButton } from './Button';
import { SubInfo, NFTTitle, ETHPrice } from './SubInfo';

const NFTCard = ({
  data,
  isFavorite,
  onToggleFavorite,
  onQuickBid,
  onCreatorPress,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.96}
      onPress={() => navigation.navigate('Details', { id: data.id })}
      style={{
        backgroundColor: COLORS.card,
        borderRadius: SIZES.extraLarge,
        marginBottom: SIZES.extraLarge - 4,
        marginHorizontal: SIZES.font,
        ...SHADOWS.dark,
        overflow: 'hidden',
      }}
    >
      <View style={{ width: '100%', height: 250 }}>
        <Image
          source={data.image}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            borderTopLeftRadius: SIZES.extraLarge,
            borderTopRightRadius: SIZES.extraLarge,
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 96,
            backgroundColor: COLORS.overlay,
          }}
        />
        <CircleButton
          imgUrl={assets.heart}
          right={10}
          top={10}
          backgroundColor={isFavorite ? COLORS.accent : 'rgba(255,255,255,0.92)'}
          tintColor={isFavorite ? COLORS.primary : undefined}
          handlePress={onToggleFavorite}
        />
        <View
          style={{
            position: 'absolute',
            left: SIZES.font,
            bottom: SIZES.font,
            backgroundColor: 'rgba(255,255,255,0.92)',
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.base,
            borderRadius: SIZES.large,
          }}
        >
          <Text
            style={{
              color: COLORS.primary,
              fontSize: SIZES.small,
              fontFamily: FONTS.semiBold,
            }}
          >
            {data.category}
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            right: SIZES.font,
            bottom: SIZES.font,
            backgroundColor: 'rgba(20,33,61,0.72)',
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.base,
            borderRadius: SIZES.large,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.small,
              fontFamily: FONTS.semiBold,
            }}
          >
            {data.likes} likes
          </Text>
        </View>
      </View>
      <SubInfo endingIn={data.endingIn} />

      <View style={{ width: '100%', padding: SIZES.font + 2 }}>
        <NFTTitle
          title={data.name}
          subTitle={data.creator}
          titleSize={SIZES.large + 2}
          subTitleSize={SIZES.small}
          onPressSubTitle={onCreatorPress}
        />
        <Text
          numberOfLines={2}
          style={{
            marginTop: SIZES.base,
            color: COLORS.muted,
            fontSize: SIZES.small,
            lineHeight: 18,
            fontFamily: FONTS.regular,
          }}
        >
          {data.description}
        </Text>
        <View
          style={{
            marginTop: SIZES.font,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.surface,
              paddingHorizontal: SIZES.font,
              paddingVertical: SIZES.base,
              borderRadius: SIZES.large,
              marginRight: 10,
            }}
          >
            <Text
              style={{
                color: COLORS.primary,
                fontFamily: FONTS.semiBold,
                fontSize: SIZES.small,
              }}
            >
              {data.views} views
            </Text>
          </View>
          <View
            style={{
              backgroundColor: COLORS.accentSoft,
              paddingHorizontal: SIZES.font,
              paddingVertical: SIZES.base,
              borderRadius: SIZES.large,
            }}
          >
            <Text
              style={{
                color: COLORS.primary,
                fontFamily: FONTS.semiBold,
                fontSize: SIZES.small,
              }}
            >
              Top bid {formatEthAmount(data.highestBid)}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: SIZES.font,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <ETHPrice price={data.price} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={onQuickBid}
              style={{
                marginRight: 10,
                paddingHorizontal: SIZES.font,
                paddingVertical: SIZES.small,
                borderRadius: SIZES.extraLarge,
                backgroundColor: COLORS.surfaceDark,
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: FONTS.semiBold,
                  fontSize: SIZES.small,
                }}
              >
                Quick bid
              </Text>
            </TouchableOpacity>
            <RectButton
              minWidth={120}
              fontSize={SIZES.font}
              handlePress={() => navigation.navigate('Details', { id: data.id })}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NFTCard;
