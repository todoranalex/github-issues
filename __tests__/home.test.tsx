import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Home from '../src/components/Home';
import {Button} from '../src/components/Generic';

describe('Home Components', () => {
  test('test org input mount', () => {
    const {getByTestId} = render(<Home />);
    expect(getByTestId('orgInputTestID')).toBeDefined();
  });
  test('test repo input mount', () => {
    const {getByTestId} = render(<Home />);
    expect(getByTestId('repoInputTestID')).toBeDefined();
  });
  test('test fetch issues button mount', () => {
    const {getByTestId} = render(<Home />);
    expect(getByTestId('fetchIssuesButtonTestID')).toBeDefined();
  });
  test('test bookmarks button  mount', () => {
    const {getByTestId} = render(<Home />);
    expect(getByTestId('bookmarksButtonTestID')).toBeDefined();
  });

  test('fetch issues button press', () => {
    const mockFn = jest.fn();
    const {getByTestId} = render(
      <Button
        testID="fetchIssuesButtonTestID"
        onPress={mockFn}
        text={'Go To Issues'}
      />,
    );
    fireEvent.press(getByTestId('fetchIssuesButtonTestID'));
    expect(mockFn).toBeCalled();
  });
});
