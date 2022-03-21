import React from 'react';
import {render} from '@testing-library/react-native';
import Home from '../src/components/Home';
import renderer from 'react-test-renderer';

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
  test('Home snapshot', () => {
    const snap = renderer.create(<Home />).toJSON();
    expect(snap).toMatchSnapshot();
  });
});
