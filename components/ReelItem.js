import React, {
  useImperativeHandle,
  forwardRef,
  useRef,
  useState,
  useCallback,
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

  // Expose play/pause methods to parent via ref
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

  // Memoized toggle function
  const togglePlayback = useCallback(async () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      await videoRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await videoRef.current.playAsync();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={togglePlayback}>
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={video}
            style={styles.video}
            resizeMode="cover"
            shouldPlay={isPlaying}
            isLooping
            volume={1.0}
            onLoadStart={() => setIsBuffering(true)}
            onReadyForDisplay={() => setIsBuffering(false)}
            onBuffer={({ isBuffering: buffering }) =>
              setIsBuffering((prev) => (prev !== buffering ? buffering : prev))
            }
          />

          {/* Loader while buffering */}
          {isBuffering && (
            <ActivityIndicator
              size="large"
              color="#fff"
              style={styles.loader}
            />
          )}

          {/* Center play/pause button */}
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

      {/* Bottom user info */}
      <View style={styles.overlay}>
        <Text style={styles.username}>@{user}</Text>
        <Ionicons name="heart-outline" size={30} color="white" />
      </View>
    </View>
  );
});

// ✅ Memoize to prevent unnecessary re-renders
export default React.memo(ReelItem);

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
  },
  username: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
});
