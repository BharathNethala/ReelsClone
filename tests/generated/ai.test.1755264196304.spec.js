```javascript
// FILE: screens/__tests__/HomeScreen.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import { Ionicons } from '@expo/vector-icons';

jest.mock('expo-av', () => {
  return {
    Video: () => <></>,
  };
});

describe('HomeScreen', () => {
  it('should display the like icon on each thumbnail', () => {
    const { getAllByTestId } = render(<HomeScreen navigation={{ navigate: jest.fn() }} />);

    // Check if the like icons are present
    const likeIcons = getAllByTestId('like-icon');
    expect(likeIcons.length).toBe(3); // There are 3 thumbnails
  });
});
```

Make sure to add the `testID` prop to the `Ionicons` component in the `HomeScreen.js` file for the test to work:

```javascript
<Ionicons name="heart-outline" size={24} color="#fff" testID="like-icon" />
```