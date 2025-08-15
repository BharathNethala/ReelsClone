```javascript
// FILE: __tests__/ReelScreen.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ReelScreen from '../screens/ReelScreen';
import ReelItem from '../components/ReelItem';
import { Video } from 'expo-av';

// Mock the ReelItem component
jest.mock('../components/ReelItem', () => React.forwardRef((props, ref) => (
  <Video ref={ref} testID="video" />
)));

describe('ReelScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const setup = (startIndex = 0) => {
    const route = { params: { startIndex } };
    return render(<ReelScreen route={route} navigation={mockNavigation} />);
  };

  it('should assign playerRefs correctly for each video item', () => {
    const { getAllByTestId } = setup();
    
    // Get all video components
    const videoItems = getAllByTestId('video');
    
    // Check that the refs are assigned correctly
    expect(videoItems.length).toBe(3);
    
    // Check if refs are assigned to playerRefs
    videoItems.forEach((videoItem, index) => {
      expect(videoItem).toBeTruthy();
      expect(videoItem).toHaveProp('ref', expect.any(Function));
    });
  });

  it('should play video when it becomes viewable', () => {
    const { getAllByTestId } = setup();
    const videoItems = getAllByTestId('video');

    // Simulate viewable items change
    const viewableItems = [{ index: 0, isViewable: true }];
    fireEvent(viewableItems, 'viewableItemsChanged', { viewableItems });

    // Check if play method is called on the first video
    expect(videoItems[0].play).toHaveBeenCalled();
  });

  it('should pause video when it becomes non-viewable', () => {
    const { getAllByTestId } = setup();
    const videoItems = getAllByTestId('video');

    // Simulate viewable items change
    const viewableItems = [{ index: 0, isViewable: false }];
    fireEvent(viewableItems, 'viewableItemsChanged', { viewableItems });

    // Check if pause method is called on the first video
    expect(videoItems[0].pause).toHaveBeenCalled();
  });
});
```