```javascript
// FILE: __tests__/HomeScreen.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

describe('HomeScreen', () => {
  it('renders the header text "Explore Reels" correctly', () => {
    const { getByText } = render(<HomeScreen navigation={{}} />);
    
    const headerText = getByText('Explore Reels');
    expect(headerText).toBeTruthy();
  });
});
```