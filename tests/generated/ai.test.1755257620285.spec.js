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
  it('should render video component with correct props', () => {
    const { getAllByType } = render(<HomeScreen navigation={{ navigate: jest.fn() }} />);
    
    const videoComponents = getAllByType(Video);
    
    expect(videoComponents).toHaveLength(3); // Check if there are 3 video components

    videoComponents.forEach(video => {
      expect(video.props.isMuted).toBe(true);
      expect(video.props.isLooping).toBe(true);
      expect(video.props.resizeMode).toBe('cover');
    });
  });
});
```