import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES, assets } from '../constants';

const HomeHeader = ({
  onSearch,
  query,
  profile,
  stats,
  tabs,
  activeTab,
  onTabChange,
  onProfilePress,
}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        paddingHorizontal: SIZES.font,
        paddingTop: SIZES.font,
        paddingBottom: SIZES.extraLarge,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Image
          source={assets.logo}
          resizeMode="contain"
          style={{ width: 108, height: 32 }}
        />
        <TouchableOpacity
          onPress={onProfilePress}
          style={{
            width: 54,
            height: 54,
            borderRadius: 27,
            backgroundColor: 'rgba(255,255,255,0.1)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={profile.avatar}
            resizeMode="contain"
            style={{ width: 42, height: 42 }}
          />
          <Image
            source={assets.badge}
            resizeMode="contain"
            style={{
              position: 'absolute',
              width: 18,
              height: 18,
              bottom: 4,
              right: 2,
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: SIZES.extraLarge, marginBottom: SIZES.large }}>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.small,
            color: 'rgba(255,255,255,0.76)',
            letterSpacing: 0.3,
          }}
        >
          Curated drops for today
        </Text>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: SIZES.xxLarge,
            color: COLORS.white,
            marginTop: SIZES.base,
            lineHeight: 38,
          }}
        >
          Discover the next
          {'\n'}
          digital masterpiece
        </Text>
        <Text
          style={{
            marginTop: SIZES.font,
            fontFamily: FONTS.regular,
            fontSize: SIZES.font,
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 21,
            maxWidth: '86%',
          }}
        >
          Welcome back, {profile.name}. Explore trending collections, save your
          favorites, and place demo bids instantly.
        </Text>
      </View>

      <View style={{ marginTop: SIZES.font }}>
        <View
          style={{
            width: '100%',
            borderRadius: SIZES.extraLarge,
            backgroundColor: 'rgba(255,255,255,0.12)',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.font,
            paddingVertical: SIZES.small + 1,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.14)',
          }}
        >
          <Image
            source={assets.search}
            resizeMode="contain"
            style={{
              width: 18,
              height: 18,
              marginRight: SIZES.base,
              tintColor: 'rgba(255,255,255,0.72)',
            }}
          />
          <TextInput
            placeholder="Search collections, creators, or art"
            placeholderTextColor="rgba(255,255,255,0.52)"
            style={{
              flex: 1,
              color: COLORS.white,
              fontFamily: FONTS.medium,
              fontSize: SIZES.font,
            }}
            value={query}
            onChangeText={onSearch}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: SIZES.extraLarge,
        }}
      >
        {stats.map((item) => (
          <View
            key={item.label}
            style={{
              flex: 1,
              marginRight: item.label === stats[stats.length - 1].label ? 0 : 10,
              padding: SIZES.font,
              borderRadius: SIZES.large,
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.1)',
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTS.bold,
                fontSize: SIZES.large,
              }}
            >
              {item.value}
            </Text>
            <Text
              style={{
                marginTop: 4,
                color: 'rgba(255,255,255,0.66)',
                fontFamily: FONTS.regular,
                fontSize: SIZES.small,
              }}
            >
              {item.label}
            </Text>
          </View>
        ))}
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.extraLarge - 4,
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab === activeTab;

          return (
            <TouchableOpacity
              key={tab}
              onPress={() => onTabChange(tab)}
              style={{
                paddingHorizontal: SIZES.font,
                paddingVertical: SIZES.small,
                borderRadius: SIZES.extraLarge,
                marginRight: 10,
                backgroundColor: isActive ? COLORS.accent : 'rgba(255,255,255,0.1)',
              }}
            >
              <Text
                style={{
                  color: isActive ? COLORS.primary : COLORS.white,
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
    </View>
  );
};

export default HomeHeader;
