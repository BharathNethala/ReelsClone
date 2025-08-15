```javascript
// FILE: __tests__/HomeScreen.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

describe('HomeScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    expect(getByText('Explore Reels')).toBeTruthy();
  });

  it('renders the correct number of thumbnails', () => {
    const { getAllByTestId } = render(<HomeScreen navigation={mockNavigation} />);
    const thumbnails = getAllByTestId('thumbnail-wrapper');
    expect(thumbnails.length).toBe(3); // Check if there are 3 thumbnails
  });

  it('navigates to ReelScreen with correct index when thumbnail is pressed', () => {
    const { getAllByTestId } = render(<HomeScreen navigation={mockNavigation} />);
    const thumbnails = getAllByTestId('thumbnail-wrapper');

    fireEvent.press(thumbnails[1]); // Press the second thumbnail
    expect(mockNavigation.navigate).toHaveBeenCalledWith('ReelScreen', { startIndex: 1 });
  });
});

// FILE: __tests__/ReelScreen.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import ReelScreen from '../screens/ReelScreen';

describe('ReelScreen', () => {
  const mockRoute = {
    params: {
      startIndex: 0,
    },
  };

  it('renders correctly with initial index', () => {
    const { getByTestId } = render(<ReelScreen route={mockRoute} />);
    expect(getByTestId('reel-item-0')).toBeTruthy(); // Check if the first reel item is rendered
  });

  it('renders the correct number of video items', () => {
    const { getAllByTestId } = render(<ReelScreen route={mockRoute} />);
    const videoItems = getAllByTestId('reel-item');
    expect(videoItems.length).toBe(3); // Check if there are 3 video items
  });
});
```

Make sure to add `testID` attributes to the components in your `HomeScreen` and `ReelScreen` files for the tests to work correctly. For example:

In `HomeScreen.js`, add `testID` to the `TouchableOpacity`:

```javascript
<TouchableOpacity
  testID="thumbnail-wrapper" // Add this line
  onPress={() =>
    navigation.navigate('ReelScreen', { startIndex: index })
  }
  ...
>
```

In `ReelScreen.js`, add `testID` to the `ReelItem`:

```javascript
<ReelItem
  testID={`reel-item-${index}`} // Add this line
  ref={(ref) => (playerRefs.current[index] = ref)}
  video={item.video}
  user={item.user}
/>
```