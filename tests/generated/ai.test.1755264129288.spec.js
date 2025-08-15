```javascript
// FILE: __tests__/HomeScreen.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import { Video } from 'expo-av';

jest.mock('expo-av', () => {
  return {
    Video: jest.fn(() => null),
  };
});

describe('HomeScreen', () => {
  it('should render Video component with correct props', () => {
    const { getByTestId } = render(<HomeScreen navigation={{ navigate: jest.fn() }} />);

    const videoComponents = getByTestId('video-component');

    expect(videoComponents).toHaveLength(3); // Check if three videos are rendered

    videoComponents.forEach(video => {
      expect(video).toHaveProp('isMuted', true);
      expect(video).toHaveProp('isLooping', true);
      expect(video).toHaveProp('resizeMode', 'cover');
    });
  });
});
```

Make sure to add `testID` prop to the `Video` component in your `HomeScreen.js` for the test to work:

```javascript
<Video
  testID="video-component"
  source={item.video}
  style={styles.thumbnail}
  isMuted
  shouldPlay
  isLooping
  resizeMode="cover"
/>
```