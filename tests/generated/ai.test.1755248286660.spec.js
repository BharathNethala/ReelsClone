```javascript
// FILE: __tests__/HomeScreen.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

describe('HomeScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  it('renders without crashing', () => {
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    
    // Check if the header is rendered
    expect(getByText('Explore Reels')).toBeTruthy();
  });
});
```