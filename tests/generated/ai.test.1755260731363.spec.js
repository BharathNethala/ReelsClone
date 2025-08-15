```javascript
// FILE: __tests__/HomeScreen.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';

describe('HomeScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <NavigationContainer>
        <HomeScreen navigation={mockNavigation} />
      </NavigationContainer>
    );
  };

  it('navigates to ReelScreen with the correct startIndex when a thumbnail is tapped', () => {
    const { getByTestId } = renderComponent();

    // Assuming that the thumbnails have a testID for easier querying
    const firstThumbnail = getByTestId('thumbnail-1');
    const secondThumbnail = getByTestId('thumbnail-2');
    const thirdThumbnail = getByTestId('thumbnail-3');

    // Tap the first thumbnail
    fireEvent.press(firstThumbnail);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('ReelScreen', { startIndex: 0 });

    // Tap the second thumbnail
    fireEvent.press(secondThumbnail);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('ReelScreen', { startIndex: 1 });

    // Tap the third thumbnail
    fireEvent.press(thirdThumbnail);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('ReelScreen', { startIndex: 2 });
  });
});
```

**Note:** In the `HomeScreen` component, you should add `testID` props to the `TouchableOpacity` components for the thumbnails to make them easily selectable in the tests. Here's how you can modify the `renderItem` method:

```javascript
<TouchableOpacity
  testID={`thumbnail-${item.id}`} // Add this line
  onPress={() =>
    navigation.navigate('ReelScreen', { startIndex: index })
  }
  activeOpacity={0.85}
  style={styles.thumbnailWrapper}
>
```

This will allow the test to correctly reference each thumbnail.