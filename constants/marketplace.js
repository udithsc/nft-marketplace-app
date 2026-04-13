export const MARKET_TABS = ['Discover', 'Trending', 'Watchlist'];
export const SORT_OPTIONS = ['Featured', 'Price', 'Ending Soon'];
export const CATEGORY_OPTIONS = ['All', 'Art', 'Collectible', 'Premium'];
export const DEMO_BID_STEPS = [0.25, 0.5, 1];

const ENDING_IN_VALUES = ['12h 30m', '8h 10m', '1d 2h', '3h 45m'];
const NFT_CATEGORIES = ['Trending', 'Art', 'Collectible', 'Premium'];

export const formatEthAmount = (value) => `${Number(value).toFixed(2)} ETH`;

export const parseEndingInToMinutes = (value) => {
  const days = Number(value.match(/(\d+)d/)?.[1] || 0);
  const hours = Number(value.match(/(\d+)h/)?.[1] || 0);
  const minutes = Number(value.match(/(\d+)m/)?.[1] || 0);

  return days * 24 * 60 + hours * 60 + minutes;
};

export const enrichNFTs = (items) =>
  items.map((item, index) => ({
    ...item,
    category: item.category || NFT_CATEGORIES[index % NFT_CATEGORIES.length],
    likes: item.likes ?? 120 + index * 37,
    views: item.views ?? 900 + index * 145,
    endingIn: item.endingIn || ENDING_IN_VALUES[index % ENDING_IN_VALUES.length],
    highestBid:
      item.highestBid ??
      Math.max(Number(item.price), ...item.bids.map((bid) => Number(bid.price || 0))),
  }));

export const buildMarketplaceStats = (nfts, favorites) => [
  { label: 'Live drops', value: `${nfts.length}+` },
  { label: 'Saved', value: `${favorites.length}` },
  {
    label: 'Demo bids',
    value: `${nfts.reduce((sum, item) => sum + item.bids.length, 0)}`,
  },
];

export const getFilteredNFTs = ({
  nfts,
  query,
  activeTab,
  activeSort,
  activeCategory,
  favorites,
}) => {
  let filteredData = [...nfts];

  if (query.trim().length) {
    const normalized = query.toLowerCase();

    filteredData = filteredData.filter(
      (item) =>
        item.name.toLowerCase().includes(normalized) ||
        item.creator.toLowerCase().includes(normalized) ||
        item.category.toLowerCase().includes(normalized)
    );
  }

  if (activeTab === 'Trending') {
    filteredData = filteredData.filter(
      (item) => item.category === 'Trending' || item.likes > 200
    );
  }

  if (activeTab === 'Watchlist') {
    filteredData = filteredData.filter((item) => favorites.includes(item.id));
  }

  if (activeCategory !== 'All') {
    filteredData = filteredData.filter((item) => item.category === activeCategory);
  }

  if (activeSort === 'Price') {
    filteredData.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (activeSort === 'Ending Soon') {
    filteredData.sort(
      (a, b) => parseEndingInToMinutes(a.endingIn) - parseEndingInToMinutes(b.endingIn)
    );
  } else {
    filteredData.sort((a, b) => b.likes - a.likes);
  }

  return filteredData;
};

export const getNextBidAmount = (highestBid, increment) =>
  (Number(highestBid) + Number(increment)).toFixed(2);
