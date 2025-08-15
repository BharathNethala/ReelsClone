```javascript
// FILE: __tests__/HomeScreen.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import { Video } from 'expo-av';

jest.mock('expo-av', () => {
  return {
    Video: (props) => <mock-Video {...props} />,
  };
});

describe('HomeScreen', () => {
  it('renders video thumbnails with correct dimensions', () => {
    const { getAllByTestId } = render(<HomeScreen navigation={{ navigate: jest.fn() }} />);

    const thumbnails = getAllByTestId('thumbnail');

    thumbnails.forEach(thumbnail => {
      const { width, height } = thumbnail.props.style;

      expect(width).toBe('100%');
      expect(height).toBe('100%');
    });
  });

  it('renders thumbnail wrapper with correct dimensions', () => {
    const { getAllByTestId } = render(<HomeScreen navigation={{ navigate: jest.fn() }} />);

    const thumbnailWrappers = getAllByTestId('thumbnail-wrapper');

    thumbnailWrappers.forEach(wrapper => {
      expect(wrapper.props.style.width).toBe(120);
      expect(wrapper.props.style.height).toBe(210);
    });
  });
});
```

Make sure to add the `testID` prop to the `Video` and `TouchableOpacity` components in your `HomeScreen.js` file for the tests to work:

```javascript
<Video
  testID="thumbnail"
  source={item.video}
  style={styles.thumbnail}
  isMuted
  shouldPlay
  isLooping
  resizeMode="cover"
/>
```

```javascript
<TouchableOpacity
  testID="thumbnail-wrapper"
  onPress={() =>
    navigation.navigate('ReelScreen', { startIndex: index })
  }
  activeOpacity={0.85}
  style={styles.thumbnailWrapper}
>
```