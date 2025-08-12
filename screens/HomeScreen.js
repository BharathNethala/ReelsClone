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
import { Ionicons } from '@expo/vector-icons'; // Importing icon set

const { width } = Dimensions.get('window');

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
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
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

            {/* Like Button Overlay */}
            <View style={styles.likeIconWrapper}>
              <Ionicons name="heart-outline" size={24} color="#fff" />
            </View>
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
  horizontalList: {
    paddingHorizontal: 10,
  },
  thumbnailWrapper: {
    width: 120,
    height: 210,
    marginRight: 10,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  likeIconWrapper: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 6,
    borderRadius: 20,
  },
});
