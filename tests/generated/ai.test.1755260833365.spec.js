```javascript
// FILE: screens/__tests__/HomeScreen.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';

describe('HomeScreen', () => {
  it('renders the correct number of items based on the THUMBNAILS array length', () => {
    const { getAllByTestId } = render(<HomeScreen navigation={{ navigate: jest.fn() }} />);
    
    // Since we have 3 items in the THUMBNAILS array
    const thumbnails = getAllByTestId('thumbnail');
    
    expect(thumbnails.length).toBe(3);
  });
});
```

Make sure to add the `testID` prop to the `TouchableOpacity` in the `HomeScreen` component for the test to work:

```javascript
<TouchableOpacity
  testID="thumbnail" // Add this line
  onPress={() =>
    navigation.navigate('ReelScreen', { startIndex: index })
  }
  activeOpacity={0.85}
  style={styles.thumbnailWrapper}
>
```