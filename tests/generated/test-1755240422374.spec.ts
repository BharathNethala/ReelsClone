```javascript
// FILE: __tests__/HomeScreen.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

describe('HomeScreen', () => {
  it('should display the header text "Explore Reels"', () => {
    const { getByText } = render(<HomeScreen navigation={{}} />);
    
    const headerText = getByText('Explore Reels');
    expect(headerText).toBeTruthy();
  });
});
```