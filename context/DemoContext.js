import React, { createContext, useContext, useMemo, useState } from 'react';

import { NFTData, assets, enrichNFTs } from '../constants';

const DemoContext = createContext(null);

const profileAvatarMap = {
  'Ava Carter': assets.person01,
  'Putri Intan': assets.person01,
  'Siti Nurhaliza': assets.person04,
  'Elisabeth aho': assets.person03,
  'David doe': assets.person02,
  'Leo Messi': assets.person02,
  'Victor de la Cruz': assets.person03,
  'Jessica Tan': assets.person02,
  'Jennifer Sia': assets.person03,
  'Rosie Wong': assets.person04,
  'Vincent Swift': assets.person01,
  'Kaitlyn Lee': assets.person04,
};

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const createHandle = (name) => `@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;

const defaultBio = (name, role) =>
  role === 'creator'
    ? `${name} creates bold digital collectibles with a focus on expressive color, motion, and rarity-driven storytelling.`
    : `${name} is an active collector following premium drops, rising creators, and live bidding opportunities.`;

const buildProfiles = (nfts, currentUser, followState, notificationSettings) => {
  const registry = new Map();

  registry.set(currentUser.id, {
    ...currentUser,
    role: 'collector',
    verified: true,
    stats: {
      followers: 1240,
      following: 218,
      volume: '28.4 ETH',
      items: 6,
    },
    highlights: ['Curated watchlist', 'Premium drops', 'Top collector'],
    notifications: notificationSettings,
  });

  const ensureProfile = (name, role, image) => {
    const id = `profile-${slugify(name)}`;

    if (!registry.has(id)) {
      registry.set(id, {
        id,
        name,
        handle: createHandle(name),
        avatar: image || profileAvatarMap[name] || assets.person02,
        role,
        verified: role === 'creator',
        location: role === 'creator' ? 'Kuala Lumpur' : 'Singapore',
        bio: defaultBio(name, role),
        stats: {
          followers: 320 + name.length * 14,
          following: 70 + name.length * 3,
          volume: `${(name.length * 1.35).toFixed(1)} ETH`,
          items: 0,
        },
        highlights:
          role === 'creator'
            ? ['Verified creator', 'Limited editions', 'Live auctions']
            : ['Active bidder', 'Top watcher', 'Marketplace member'],
      });
    }

    return registry.get(id);
  };

  nfts.forEach((item) => {
    const creatorProfile = ensureProfile(item.creator, 'creator', profileAvatarMap[item.creator]);
    creatorProfile.stats.items += 1;
    creatorProfile.stats.followers += Math.round(item.likes / 3);

    item.bids.forEach((bid) => {
      const bidderProfile = ensureProfile(bid.name, 'collector', bid.image);
      bidderProfile.stats.items += 1;
      bidderProfile.stats.followers += 4;
    });
  });

  return Array.from(registry.values()).map((profile) => ({
    ...profile,
    isFollowing:
      profile.id === currentUser.id ? false : Boolean(followState[profile.id]),
  }));
};

const buildActivity = (nfts, currentUser, favorites) => {
  const favoriteSet = new Set(favorites);
  const entries = [];

  nfts.forEach((item) => {
    if (favoriteSet.has(item.id)) {
      entries.push({
        id: `saved-${item.id}`,
        type: 'save',
        title: `Saved ${item.name}`,
        subtitle: `Added to watchlist by ${currentUser.name}`,
        timestamp: 'Today',
        image: item.image,
      });
    }

    item.bids.slice(0, 2).forEach((bid) => {
      entries.push({
        id: `bid-${bid.id}`,
        type: 'bid',
        title: `${bid.name} placed ${bid.price} ETH`,
        subtitle: `On ${item.name}`,
        timestamp: bid.date,
        image: bid.image,
      });
    });
  });

  return entries.slice(0, 12);
};

export const DemoProvider = ({ children }) => {
  const currentUser = {
    id: 'profile-ava-carter',
    name: 'Ava Carter',
    handle: '@avacurates',
    avatar: assets.person01,
    location: 'Kuala Lumpur',
    bio: 'Collector, curator, and demo account owner exploring premium NFT drops and creator-led communities.',
  };

  const [nfts, setNfts] = useState(() => enrichNFTs(NFTData));
  const [favorites, setFavorites] = useState(['NFT-02', 'NFT-04']);
  const [followState, setFollowState] = useState({
    'profile-putri-intan': true,
    'profile-victor-de-la-cruz': true,
  });
  const [notificationSettings, setNotificationSettings] = useState({
    'instant-alerts': true,
    'curation-digest': true,
    'profile-visible': false,
  });

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    );
  };

  const placeBid = (id, amount) => {
    const bidAmount = Number(amount);

    if (!Number.isFinite(bidAmount)) {
      return null;
    }

    let createdBid = null;

    setNfts((current) =>
      current.map((item) => {
        if (item.id !== id) return item;

        createdBid = {
          id: `BID-${Date.now()}`,
          name: currentUser.name,
          price: bidAmount.toFixed(2),
          image: currentUser.avatar,
          date: new Date().toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          }),
        };

        return {
          ...item,
          bids: [createdBid, ...item.bids],
          price: bidAmount.toFixed(2),
          highestBid: Math.max(Number(item.highestBid || 0), bidAmount),
          likes: item.likes + 3,
        };
      })
    );

    return createdBid;
  };

  const profiles = useMemo(
    () => buildProfiles(nfts, currentUser, followState, notificationSettings),
    [nfts, followState, notificationSettings]
  );

  const activityFeed = useMemo(
    () => buildActivity(nfts, currentUser, favorites),
    [nfts, favorites]
  );

  const getNFTById = (id) => nfts.find((item) => item.id === id);
  const getProfileById = (id) => profiles.find((profile) => profile.id === id);
  const getProfileByName = (name) =>
    profiles.find((profile) => profile.name.toLowerCase() === name.toLowerCase());

  const toggleFollow = (id) => {
    if (id === currentUser.id) return;

    setFollowState((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  const toggleNotification = (id) => {
    setNotificationSettings((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  return (
    <DemoContext.Provider
      value={{
        nfts,
        favorites,
        profile: currentUser,
        profiles,
        activityFeed,
        notificationSettings,
        toggleFavorite,
        placeBid,
        getNFTById,
        getProfileById,
        getProfileByName,
        toggleFollow,
        toggleNotification,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);

  if (!context) {
    throw new Error('useDemo must be used inside DemoProvider');
  }

  return context;
};
