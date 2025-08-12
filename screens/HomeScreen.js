import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import { Video } from 'expo-av';

const { width } = Dimensions.get('window');

const NUM_COLUMNS = 2;
const SPACING = 10;
const THUMBNAIL_WIDTH = (width - SPACING * (NUM_COLUMNS + 1)) / NUM_COLUMNS;
const THUMBNAIL_HEIGHT = THUMBNAIL_WIDTH * 1.6; // 9:16 aspect ratio

const THUMBNAILS = [
  { id: '1', video: require('../assets/reel1.mp4') },
  { id: '2', video: require('../assets/reel2.mp4') },
  { id: '3', video: require('../assets/reel3.mp4') },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore Reels</Text>
      <FlatList
        data={THUMBNAILS}
        keyExtractor={(item) => item.id}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={styles.grid}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ReelScreen', { startIndex: index })
            }
            activeOpacity={0.85}
            style={styles.thumbnailWrapper}
          >
            <Video
              source={item.video}
              style={styles.thumbnail}
              isMuted
              shouldPlay
              isLooping
              resizeMode="cover"
            />
            <View style={styles.overlay} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  grid: {
    paddingHorizontal: SPACING,
  },
  thumbnailWrapper: {
    width: THUMBNAIL_WIDTH,
    height: THUMBNAIL_HEIGHT,
    margin: SPACING / 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
