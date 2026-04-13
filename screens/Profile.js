import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Switch,
} from 'react-native';

import {
  COLORS,
  SIZES,
  FONTS,
  SHADOWS,
  assets,
  PROFILE_TABS,
  PROFILE_SETTINGS,
  formatEthAmount,
} from '../constants';
import { CircleButton, FocusedStatusBar, NFTCard } from '../components';
import { useDemo } from '../context/DemoContext';

const ProfileHero = ({
  selectedProfile,
  isSelf,
  isFollowing,
  onBack,
  onToggleFollow,
}) => (
  <View
    style={{
      backgroundColor: COLORS.primary,
      paddingHorizontal: SIZES.font,
      paddingTop: SIZES.font,
      paddingBottom: SIZES.xxLarge,
    }}
  >
    <CircleButton
      imgUrl={assets.left}
      handlePress={onBack}
      left={SIZES.font}
      top={SIZES.font}
    />
    <View style={{ alignItems: 'center', marginTop: 48 }}>
      <View
        style={{
          width: 96,
          height: 96,
          borderRadius: 48,
          backgroundColor: 'rgba(255,255,255,0.12)',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderColor: 'rgba(255,255,255,0.18)',
        }}
      >
        <Image
          source={selectedProfile.avatar}
          resizeMode="cover"
          style={{ width: 84, height: 84, borderRadius: 42 }}
        />
      </View>
      <Text
        style={{
          marginTop: SIZES.font,
          color: COLORS.white,
          fontFamily: FONTS.bold,
          fontSize: SIZES.extraLarge,
        }}
      >
        {selectedProfile.name}
      </Text>
      <Text
        style={{
          marginTop: 4,
          color: 'rgba(255,255,255,0.72)',
          fontFamily: FONTS.medium,
          fontSize: SIZES.font,
        }}
      >
        {selectedProfile.handle} • {selectedProfile.location}
      </Text>
      <Text
        style={{
          marginTop: SIZES.font,
          color: 'rgba(255,255,255,0.78)',
          fontFamily: FONTS.regular,
          fontSize: SIZES.font,
          lineHeight: 21,
          textAlign: 'center',
          maxWidth: '88%',
        }}
      >
        {selectedProfile.bio}
      </Text>
      <View style={{ flexDirection: 'row', marginTop: SIZES.font }}>
        {(selectedProfile.highlights || []).map((item) => (
          <View
            key={item}
            style={{
              marginHorizontal: 4,
              paddingHorizontal: SIZES.font,
              paddingVertical: SIZES.base,
              borderRadius: SIZES.extraLarge,
              backgroundColor: 'rgba(255,255,255,0.1)',
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTS.medium,
                fontSize: SIZES.small,
              }}
            >
              {item}
            </Text>
          </View>
        ))}
      </View>
      {!isSelf && (
        <TouchableOpacity
          onPress={onToggleFollow}
          style={{
            marginTop: SIZES.extraLarge - 4,
            paddingHorizontal: SIZES.xxLarge,
            paddingVertical: SIZES.font,
            borderRadius: SIZES.extraLarge,
            backgroundColor: isFollowing ? 'rgba(255,255,255,0.14)' : COLORS.accent,
          }}
        >
          <Text
            style={{
              color: isFollowing ? COLORS.white : COLORS.primary,
              fontFamily: FONTS.semiBold,
              fontSize: SIZES.font,
            }}
          >
            {isFollowing ? 'Following' : 'Follow creator'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const Profile = ({ navigation, route }) => {
  const {
    profile,
    nfts,
    favorites,
    activityFeed,
    notificationSettings,
    toggleFavorite,
    placeBid,
    getProfileById,
    getProfileByName,
    toggleFollow,
    toggleNotification,
  } = useDemo();

  const profileId = route.params?.profileId || profile.id;
  const selectedProfile =
    getProfileById(profileId) || getProfileByName(route.params?.name || '') || profile;
  const isSelf = selectedProfile.id === profile.id;
  const availableTabs = isSelf ? PROFILE_TABS.self : PROFILE_TABS.creator;
  const [activeTab, setActiveTab] = useState(availableTabs[0]);

  const listedItems = useMemo(
    () => nfts.filter((item) => item.creator === selectedProfile.name),
    [nfts, selectedProfile.name]
  );
  const collectedItems = useMemo(
    () =>
      nfts.filter((item) =>
        item.bids.some((bid) => bid.name.toLowerCase() === selectedProfile.name.toLowerCase())
      ),
    [nfts, selectedProfile.name]
  );
  const watchlistItems = useMemo(
    () => nfts.filter((item) => favorites.includes(item.id)),
    [nfts, favorites]
  );
  const relevantActivity = useMemo(
    () =>
      activityFeed.filter(
        (entry) =>
          entry.title.toLowerCase().includes(selectedProfile.name.toLowerCase()) ||
          (isSelf && entry.type === 'save')
      ),
    [activityFeed, isSelf, selectedProfile.name]
  );

  const statCards = [
    { label: 'Followers', value: selectedProfile.stats.followers },
    { label: 'Following', value: selectedProfile.stats.following },
    { label: 'Volume', value: selectedProfile.stats.volume },
    {
      label: isSelf ? 'Saved' : 'Items',
      value: isSelf ? watchlistItems.length : selectedProfile.stats.items,
    },
  ];

  const handleQuickBid = (item) => {
    placeBid(item.id, Number(item.highestBid) + 0.25);
  };

  const renderOverview = () => (
    <View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {statCards.map((item) => (
          <View
            key={item.label}
            style={{
              width: '48%',
              marginBottom: SIZES.font,
              padding: SIZES.font + 2,
              borderRadius: SIZES.large,
              backgroundColor: COLORS.card,
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
              {item.label}
            </Text>
            <Text
              style={{
                marginTop: 6,
                color: COLORS.primary,
                fontFamily: FONTS.bold,
                fontSize: SIZES.large,
              }}
            >
              {item.value}
            </Text>
          </View>
        ))}
      </View>

      <View
        style={{
          padding: SIZES.font + 2,
          borderRadius: SIZES.extraLarge,
          backgroundColor: COLORS.card,
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
          {isSelf ? 'Profile controls' : 'Creator snapshot'}
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
          {isSelf
            ? 'Use the toggles below to simulate account preferences and notification flows for your demo.'
            : `Collectors can follow ${selectedProfile.name}, browse listed work, and review recent bidding activity.`}
        </Text>

        {isSelf &&
          PROFILE_SETTINGS.map((item) => (
            <View
              key={item.id}
              style={{
                marginTop: SIZES.font,
                paddingTop: SIZES.font,
                borderTopWidth: 1,
                borderTopColor: 'rgba(20,33,61,0.08)',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ flex: 1, paddingRight: SIZES.font }}>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontFamily: FONTS.semiBold,
                    fontSize: SIZES.small,
                  }}
                >
                  {item.label}
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    color: COLORS.muted,
                    fontFamily: FONTS.regular,
                    fontSize: SIZES.small - 1,
                    lineHeight: 18,
                  }}
                >
                  {item.description}
                </Text>
              </View>
              <Switch
                value={notificationSettings[item.id]}
                onValueChange={() => toggleNotification(item.id)}
                trackColor={{ false: '#D5DCE7', true: '#F9C96E' }}
                thumbColor={notificationSettings[item.id] ? COLORS.accent : '#FFFFFF'}
              />
            </View>
          ))}

        {!isSelf && (
          <View
            style={{
              marginTop: SIZES.font,
              padding: SIZES.font,
              borderRadius: SIZES.large,
              backgroundColor: COLORS.surface,
            }}
          >
            <Text
              style={{
                color: COLORS.primary,
                fontFamily: FONTS.semiBold,
                fontSize: SIZES.small,
              }}
            >
              Featured drop
            </Text>
            <Text
              style={{
                marginTop: 4,
                color: COLORS.muted,
                fontFamily: FONTS.regular,
                fontSize: SIZES.small,
              }}
            >
              Current floor price {formatEthAmount(listedItems[0]?.price || 0)} with{' '}
              {selectedProfile.stats.followers} active followers.
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderNFTList = (items, emptyTitle, emptyText) => (
    <View>
      {items.length ? (
        items.map((item) => (
          <NFTCard
            key={item.id}
            data={item}
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={() => toggleFavorite(item.id)}
            onQuickBid={() => handleQuickBid(item)}
            onCreatorPress={() =>
              navigation.push('Profile', {
                profileId: getProfileByName(item.creator)?.id,
                name: item.creator,
              })
            }
          />
        ))
      ) : (
        <View
          style={{
            padding: SIZES.extraLarge,
            borderRadius: SIZES.extraLarge,
            backgroundColor: COLORS.card,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: COLORS.primary,
              fontFamily: FONTS.bold,
              fontSize: SIZES.large,
            }}
          >
            {emptyTitle}
          </Text>
          <Text
            style={{
              marginTop: 8,
              color: COLORS.muted,
              fontFamily: FONTS.regular,
              fontSize: SIZES.font,
              lineHeight: 20,
              textAlign: 'center',
            }}
          >
            {emptyText}
          </Text>
        </View>
      )}
    </View>
  );

  const renderActivity = () => (
    <View>
      {relevantActivity.length ? (
        relevantActivity.map((entry) => (
          <View
            key={entry.id}
            style={{
              marginBottom: SIZES.font,
              padding: SIZES.font + 2,
              borderRadius: SIZES.large,
              backgroundColor: COLORS.card,
              flexDirection: 'row',
              alignItems: 'center',
              ...SHADOWS.light,
            }}
          >
            <Image
              source={entry.image}
              resizeMode="cover"
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                marginRight: SIZES.font,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontFamily: FONTS.semiBold,
                  fontSize: SIZES.font,
                }}
              >
                {entry.title}
              </Text>
              <Text
                style={{
                  marginTop: 4,
                  color: COLORS.muted,
                  fontFamily: FONTS.regular,
                  fontSize: SIZES.small,
                  lineHeight: 18,
                }}
              >
                {entry.subtitle}
              </Text>
            </View>
            <Text
              style={{
                marginLeft: SIZES.font,
                color: COLORS.muted,
                fontFamily: FONTS.medium,
                fontSize: SIZES.small - 1,
              }}
            >
              {entry.timestamp}
            </Text>
          </View>
        ))
      ) : (
        renderNFTList(
          [],
          'No activity yet',
          'Recent saves, bids, and creator events will appear here during the demo.'
        )
      )}
    </View>
  );

  const renderActiveTab = () => {
    if (activeTab === 'Collection') {
      return renderNFTList(
        listedItems,
        'No listed items',
        'This profile has not listed any collectibles yet.'
      );
    }

    if (activeTab === 'Watchlist') {
      return renderNFTList(
        watchlistItems,
        'Watchlist is empty',
        'Save a few drops from the marketplace to demonstrate a personalized profile experience.'
      );
    }

    if (activeTab === 'Activity') {
      return renderActivity();
    }

    return renderOverview();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <FocusedStatusBar background={COLORS.primary} barStyle="light-content" />
      <FlatList
        data={[{ id: 'profile-content' }]}
        keyExtractor={(item) => item.id}
        renderItem={() => (
          <View style={{ paddingHorizontal: SIZES.font, paddingTop: SIZES.extraLarge }}>
            <View style={{ flexDirection: 'row', marginBottom: SIZES.extraLarge }}>
              {availableTabs.map((tab) => {
                const isActive = tab === activeTab;

                return (
                  <TouchableOpacity
                    key={tab}
                    onPress={() => setActiveTab(tab)}
                    style={{
                      marginRight: 10,
                      paddingHorizontal: SIZES.font,
                      paddingVertical: SIZES.small,
                      borderRadius: SIZES.extraLarge,
                      backgroundColor: isActive ? COLORS.primary : COLORS.card,
                    }}
                  >
                    <Text
                      style={{
                        color: isActive ? COLORS.white : COLORS.primary,
                        fontFamily: FONTS.semiBold,
                        fontSize: SIZES.small,
                      }}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {renderActiveTab()}
          </View>
        )}
        ListHeaderComponent={
          <ProfileHero
            selectedProfile={selectedProfile}
            isSelf={isSelf}
            isFollowing={selectedProfile.isFollowing}
            onBack={() => navigation.goBack()}
            onToggleFollow={() => toggleFollow(selectedProfile.id)}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SIZES.xxLarge }}
      />
    </SafeAreaView>
  );
};

export default Profile;
