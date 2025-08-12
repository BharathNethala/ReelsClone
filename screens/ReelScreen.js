import React, { useRef, useCallback } from 'react';
import { FlatList, Dimensions } from 'react-native';
import ReelItem from '../components/ReelItem';

const VIDEO_DATA = [
  { id: '1', video: require('../assets/reel1.mp4'), user: 'user1' },
  { id: '2', video: require('../assets/reel2.mp4'), user: 'user2' },
  { id: '3', video: require('../assets/reel3.mp4'), user: 'user3' },
];

const { height } = Dimensions.get('window');

export default function ReelScreen({ route }) {
  const { startIndex = 0 } = route.params || {};
  const playerRefs = useRef([]);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    viewableItems.forEach((item) => {
      const index = item.index;
      if (playerRefs.current[index]) {
        if (item.isViewable) {
          playerRefs.current[index].play();
        } else {
          playerRefs.current[index].pause();
        }
      }
    });
  }, []);

  return (
    <FlatList
      data={VIDEO_DATA}
      renderItem={({ item, index }) => (
        <ReelItem
          ref={(ref) => (playerRefs.current[index] = ref)}
          video={item.video}
          user={item.user}
        />
      )}
      keyExtractor={(item) => item.id}
      pagingEnabled
      decelerationRate="fast"
      snapToAlignment="start"
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged}
      initialScrollIndex={startIndex}
      getItemLayout={(data, index) => ({
        length: height,
        offset: height * index,
        index,
      })}
    
      removeClippedSubviews={true}
      windowSize={3}
      maxToRenderPerBatch={1}
      initialNumToRender={1}
    />
  );
}
