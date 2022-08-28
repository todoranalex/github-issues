import {renderHook} from '@testing-library/react-hooks';
import {mockIssue1, mockIssue3} from '../../issues/mocks';
import {getBookmarks} from '../tasks';
import useBookmarks from './useBookmarksReducer';

jest.mock('../tasks');

describe('#useBookmarks', () => {
  const getBookmarksMock = getBookmarks as jest.Mock;
  getBookmarksMock.mockReturnValue([mockIssue1, mockIssue3]);

  it('should make use of the useBookmarks hook and retrieve the bookmarks', async () => {
    const {result, waitForNextUpdate} = renderHook(() => useBookmarks());

    await waitForNextUpdate();

    expect(result.current).toStrictEqual([mockIssue1, mockIssue3]);
  });
});
