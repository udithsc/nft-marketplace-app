import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  COLORS,
  SIZES,
  FONTS,
  MARKET_TABS,
  SORT_OPTIONS,
  CATEGORY_OPTIONS,
  buildMarketplaceStats,
  getFilteredNFTs,
  getNextBidAmount,
} from '../constants';
import { NFTCard, HomeHeader, FocusedStatusBar } from '../components';
import { useDemo } from '../context/DemoContext';

const Home = () => {
  const navigation = useNavigation();
  const { nfts, favorites, profile, toggleFavorite, placeBid, getProfileByName } =
    useDemo();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Discover');
  const [activeSort, setActiveSort] = useState('Featured');
  const [activeCategory, setActiveCategory] = useState('All');

  const stats = buildMarketplaceStats(nfts, favorites);
  const filteredData = getFilteredNFTs({
    nfts,
    query,
    activeTab,
    activeSort,
    activeCategory,
    favorites,
  });

  const handleQuickBid = (item) => {
    placeBid(item.id, getNextBidAmount(item.highestBid, 0.25));
  };

  const renderNFTCard = (item) => (
    <NFTCard
      key={item.id}
      data={item}
      isFavorite={favorites.includes(item.id)}
      onToggleFavorite={() => toggleFavorite(item.id)}
      onQuickBid={() => handleQuickBid(item)}
      onCreatorPress={() =>
        navigation.navigate('Profile', {
          profileId: getProfileByName(item.creator)?.id,
          name: item.creator,
        })
      }
    />
  );

  const renderEmptyState = () => (
    <View
      style={{
        marginTop: SIZES.xxLarge,
        marginHorizontal: SIZES.font,
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
        No items matched this view
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
        Try another search, switch categories, or open the watchlist after saving
        a few pieces.
      </Text>
    </View>
  );

  const renderSectionHeader = () => (
    <View>
      <HomeHeader
        onSearch={setQuery}
        query={query}
        profile={profile}
        stats={stats}
        tabs={MARKET_TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onProfilePress={() =>
          navigation.navigate('Profile', {
            profileId: profile.id,
          })
        }
      />

      <View style={{ paddingHorizontal: SIZES.font, paddingTop: SIZES.extraLarge }}>
        <Text
          style={{
            color: COLORS.primary,
            fontFamily: FONTS.bold,
            fontSize: SIZES.extraLarge,
          }}
        >
          Explore marketplace
        </Text>
        <Text
          style={{
            marginTop: 6,
            color: COLORS.muted,
            fontFamily: FONTS.regular,
            fontSize: SIZES.font,
            lineHeight: 20,
          }}
        >
          Browse collections, build a watchlist, and simulate bidding flows for
          your product demo.
        </Text>
      </View>

      <View style={{ paddingHorizontal: SIZES.font, paddingTop: SIZES.font }}>
        <Text
          style={{
            marginBottom: 10,
            color: COLORS.primary,
            fontFamily: FONTS.semiBold,
            fontSize: SIZES.font,
          }}
        >
          Categories
        </Text>
        <FlatList
          horizontal
          data={CATEGORY_OPTIONS}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const isActive = item === activeCategory;

            return (
              <TouchableOpacity
                onPress={() => setActiveCategory(item)}
                style={{
                  marginRight: 10,
                  paddingHorizontal: SIZES.font,
                  paddingVertical: SIZES.small,
                  borderRadius: SIZES.extraLarge,
                  backgroundColor: isActive ? COLORS.primary : COLORS.card,
                  borderWidth: 1,
                  borderColor: isActive ? COLORS.primary : 'rgba(20, 33, 61, 0.08)',
                }}
              >
                <Text
                  style={{
                    color: isActive ? COLORS.white : COLORS.primary,
                    fontFamily: FONTS.semiBold,
                    fontSize: SIZES.small,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={{ paddingHorizontal: SIZES.font, paddingTop: SIZES.font }}>
        <Text
          style={{
            marginBottom: 10,
            color: COLORS.primary,
            fontFamily: FONTS.semiBold,
            fontSize: SIZES.font,
          }}
        >
          Sort by
        </Text>
        <View style={{ flexDirection: 'row' }}>
          {SORT_OPTIONS.map((item) => {
            const isActive = item === activeSort;

            return (
              <TouchableOpacity
                key={item}
                onPress={() => setActiveSort(item)}
                style={{
                  marginRight: 10,
                  paddingHorizontal: SIZES.font,
                  paddingVertical: SIZES.small,
                  borderRadius: SIZES.extraLarge,
                  backgroundColor: isActive ? COLORS.accentSoft : COLORS.surface,
                }}
              >
                <Text
                  style={{
                    color: COLORS.primary,
                    fontFamily: FONTS.semiBold,
                    fontSize: SIZES.small,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <FocusedStatusBar background={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, zIndex: 0 }}>
          {Platform.OS === 'web' ? (
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ paddingBottom: SIZES.xxLarge }}
              showsVerticalScrollIndicator={false}
            >
              {renderSectionHeader()}
              {filteredData.length ? filteredData.map(renderNFTCard) : renderEmptyState()}
            </ScrollView>
          ) : (
            <FlatList
              style={{ flex: 1 }}
              data={filteredData}
              renderItem={({ item }) => renderNFTCard(item)}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: SIZES.xxLarge,
              }}
              ListHeaderComponent={renderSectionHeader}
              ListEmptyComponent={renderEmptyState}
            />
          )}
        </View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: -1,
          }}
        >
          <View style={{ height: 520, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.background }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
