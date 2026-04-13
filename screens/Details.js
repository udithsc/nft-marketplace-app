import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  COLORS,
  SIZES,
  SHADOWS,
  FONTS,
  assets,
  DEMO_BID_STEPS,
  formatEthAmount,
  getNextBidAmount,
} from '../constants';
import {
  CircleButton,
  RectButton,
  SubInfo,
  FocusedStatusBar,
  DetailsDesc,
  DetailsBid,
} from '../components';
import { useDemo } from '../context/DemoContext';

const DetailsHeader = ({ data, navigation, isFavorite, onToggleFavorite }) => (
  <View style={{ width: '100%', height: 373 }}>
    <Image
      source={data.image}
      resizeMode="cover"
      style={{ width: '100%', height: '100%' }}
    />
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 120,
        backgroundColor: COLORS.overlay,
      }}
    />
    <CircleButton
      imgUrl={assets.left}
      handlePress={() => navigation.goBack()}
      left={15}
      top={(StatusBar.currentHeight || 0) + 10}
    />
    <CircleButton
      imgUrl={assets.heart}
      right={15}
      top={(StatusBar.currentHeight || 0) + 10}
      handlePress={onToggleFavorite}
      backgroundColor={isFavorite ? COLORS.accent : 'rgba(255,255,255,0.92)'}
      tintColor={isFavorite ? COLORS.primary : undefined}
    />
    <View
      style={{
        position: 'absolute',
        left: SIZES.font,
        right: SIZES.font,
        bottom: SIZES.font + 4,
      }}
    >
      <Text
        style={{
          color: 'rgba(255,255,255,0.76)',
          fontSize: SIZES.small,
          fontFamily: FONTS.medium,
          marginBottom: 4,
        }}
      >
        {data.category} showcase
      </Text>
      <Text
        style={{
          color: COLORS.white,
          fontSize: SIZES.extraLarge,
          fontFamily: FONTS.bold,
        }}
      >
        {data.name}
      </Text>
    </View>
  </View>
);

const Details = ({ route, navigation }) => {
  const { id } = route.params;
  const {
    getNFTById,
    favorites,
    toggleFavorite,
    placeBid,
    getProfileByName,
  } = useDemo();
  const [selectedStep, setSelectedStep] = useState(0.25);

  const data = getNFTById(id);

  if (!data) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: SIZES.extraLarge,
          }}
        >
          <Text
            style={{
              color: COLORS.primary,
              fontFamily: FONTS.bold,
              fontSize: SIZES.large,
            }}
          >
            Artwork not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const isFavorite = favorites.includes(data.id);
  const nextBid = getNextBidAmount(data.highestBid, selectedStep);

  const handleDemoBid = () => {
    placeBid(data.id, nextBid);
    Alert.alert('Demo bid placed', `Your mock bid of ${nextBid} ETH is now leading.`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <FocusedStatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          paddingHorizontal: SIZES.font,
          paddingVertical: SIZES.font,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(244,247,251,0.96)',
          zIndex: 1,
          borderTopWidth: 1,
          borderTopColor: 'rgba(20, 33, 61, 0.08)',
        }}
      >
        <RectButton
          minWidth={220}
          fontSize={SIZES.large}
          handlePress={handleDemoBid}
          {...SHADOWS.dark}
        />
        <Text
          style={{
            marginTop: 8,
            color: COLORS.muted,
            fontFamily: FONTS.regular,
            fontSize: SIZES.small,
          }}
        >
          Demo bid amount: {nextBid} ETH
        </Text>
      </View>
      <FlatList
        data={data.bids}
        renderItem={({ item }) => (
          <DetailsBid
            bid={item}
            onPressBidder={(name) =>
              navigation.navigate('Profile', {
                profileId: getProfileByName(name)?.id,
                name,
              })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: SIZES.xxLarge * 3,
        }}
        ListHeaderComponent={() => (
          <React.Fragment>
            <DetailsHeader
              data={data}
              navigation={navigation}
              isFavorite={isFavorite}
              onToggleFavorite={() => toggleFavorite(data.id)}
            />
            <SubInfo endingIn={data.endingIn} />
            <View style={{ padding: SIZES.font + 2 }}>
              <DetailsDesc
                data={data}
                onCreatorPress={() =>
                  navigation.navigate('Profile', {
                    profileId: getProfileByName(data.creator)?.id,
                    name: data.creator,
                  })
                }
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: SIZES.extraLarge,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    marginRight: 10,
                    backgroundColor: COLORS.card,
                    borderRadius: SIZES.large,
                    padding: SIZES.font,
                    ...SHADOWS.light,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.muted,
                      fontFamily: FONTS.regular,
                      fontSize: SIZES.small,
                    }}
                  >
                    Watchers
                  </Text>
                  <Text
                    style={{
                      marginTop: 6,
                      color: COLORS.primary,
                      fontFamily: FONTS.bold,
                      fontSize: SIZES.large,
                    }}
                  >
                    {data.likes}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: COLORS.card,
                    borderRadius: SIZES.large,
                    padding: SIZES.font,
                    ...SHADOWS.light,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.muted,
                      fontFamily: FONTS.regular,
                      fontSize: SIZES.small,
                    }}
                  >
                    Highest bid
                  </Text>
                  <Text
                    style={{
                      marginTop: 6,
                      color: COLORS.primary,
                      fontFamily: FONTS.bold,
                      fontSize: SIZES.large,
                    }}
                  >
                    {formatEthAmount(data.highestBid)}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: COLORS.card,
                  borderRadius: SIZES.extraLarge,
                  padding: SIZES.font + 2,
                  marginBottom: SIZES.extraLarge,
                  ...SHADOWS.light,
                }}
              >
                <Text
                  style={{
                    color: COLORS.primary,
                    fontFamily: FONTS.semiBold,
                    fontSize: SIZES.font,
                  }}
                >
                  Demo actions
                </Text>
                <Text
                  style={{
                    marginTop: 6,
                    color: COLORS.muted,
                    fontFamily: FONTS.regular,
                    fontSize: SIZES.small,
                    lineHeight: 20,
                  }}
                >
                  Adjust the bid increment, save this item to your watchlist,
                  and test a realistic bidding flow without any backend.
                </Text>

                <View style={{ flexDirection: 'row', marginTop: SIZES.font }}>
                  {DEMO_BID_STEPS.map((step) => {
                    const isActive = step === selectedStep;

                    return (
                      <TouchableOpacity
                        key={step}
                        onPress={() => setSelectedStep(step)}
                        style={{
                          marginRight: 10,
                          paddingHorizontal: SIZES.font,
                          paddingVertical: SIZES.small,
                          borderRadius: SIZES.extraLarge,
                          backgroundColor: isActive
                            ? COLORS.accentSoft
                            : COLORS.surface,
                        }}
                      >
                        <Text
                          style={{
                            color: COLORS.primary,
                            fontFamily: FONTS.semiBold,
                            fontSize: SIZES.small,
                          }}
                        >
                          +{step} ETH
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <View style={{ flexDirection: 'row', marginTop: SIZES.font }}>
                  <TouchableOpacity
                    onPress={() => toggleFavorite(data.id)}
                    style={{
                      flex: 1,
                      marginRight: 10,
                      paddingVertical: SIZES.font,
                      borderRadius: SIZES.extraLarge,
                      backgroundColor: COLORS.surfaceDark,
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.white,
                        fontFamily: FONTS.semiBold,
                        fontSize: SIZES.small,
                      }}
                    >
                      {isFavorite ? 'Saved to watchlist' : 'Save to watchlist'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleDemoBid}
                    style={{
                      flex: 1,
                      paddingVertical: SIZES.font,
                      borderRadius: SIZES.extraLarge,
                      backgroundColor: COLORS.accent,
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.primary,
                        fontFamily: FONTS.semiBold,
                        fontSize: SIZES.small,
                      }}
                    >
                      Bid {nextBid} ETH
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {data.bids.length > 0 && (
                <Text
                  style={{
                    marginBottom: SIZES.base,
                    fontSize: SIZES.font,
                    fontFamily: FONTS.semiBold,
                    color: COLORS.primary,
                  }}
                >
                  Bid activity
                </Text>
              )}
              {data.bids.length === 0 && (
                <View
                  style={{
                    marginTop: SIZES.large,
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
                    No bids yet
                  </Text>
                  <Text
                    style={{
                      marginTop: SIZES.base / 2,
                      fontSize: SIZES.small,
                      fontFamily: FONTS.regular,
                      color: COLORS.muted,
                      lineHeight: 20,
                    }}
                  >
                    Be the first collector to place a demo bid on this piece.
                  </Text>
                </View>
              )}
            </View>
          </React.Fragment>
        )}
      />
    </SafeAreaView>
  );
};

export default Details;
