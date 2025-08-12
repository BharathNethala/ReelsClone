import React, {
  useImperativeHandle,
  forwardRef,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

const ReelItem = forwardRef(({ video, user }, ref) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [liked, setLiked] = useState(false); // Like state

  // Expose play/pause methods to parent component
  useImperativeHandle(ref, () => ({
    play: async () => {
      if (videoRef.current) {
        setIsPlaying(true);
        await videoRef.current.playAsync();
      }
    },
    pause: async () => {
      if (videoRef.current) {
        setIsPlaying(false);
        await videoRef.current.pauseAsync();
      }
    },
  }));

  const togglePlayback = async () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      await videoRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await videoRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={togglePlayback}>
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={video}
            style={styles.video}
            resizeMode="cover"
            shouldPlay
            isLooping
            volume={1.0}
            onLoadStart={() => setIsBuffering(true)}
            onReadyForDisplay={() => setIsBuffering(false)}
            onBuffer={({ isBuffering }) => setIsBuffering(isBuffering)}
          />

          {isBuffering && (
            <ActivityIndicator
              size="large"
              color="#fff"
              style={styles.loader}
            />
          )}

          {/* Center play/pause icon */}
          <TouchableOpacity
            onPress={togglePlayback}
            activeOpacity={0.7}
            style={styles.centerButton}
          >
            <Ionicons
              name={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
              size={72}
              color="rgba(255,255,255,0.6)"
            />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>

      {/* Bottom overlay UI */}
      <View style={styles.overlay}>
        <Text style={styles.username}>@{user}</Text>

        {/* Like button + count */}
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={toggleLike} style={styles.likeButton}>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={30}
              color={liked ? 'red' : 'white'}
            />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 12 }}>
            {liked ? '1' : '0'} likes
          </Text>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: 'black',
    position: 'relative',
  },
  videoContainer: {
    flex: 1,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -15,
    marginTop: -15,
  },
  centerButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -36 }, { translateY: -36 }],
    zIndex: 10,
  },
  overlay: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width - 40,
  },
  username: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  likeButton: {
    padding: 10,
  },
});

export default ReelItem;
