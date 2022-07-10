import {renderHook} from '@testing-library/react-hooks';
import {mockIssue1, mockIssue3} from '../../../api/issues/mocks';
import {getBookmarks} from '../../../tasks/bookmarks';
import useBookmarks from './useBookmarks';

jest.mock('../../../tasks/bookmarks');

describe('#useBookmarks', () => {
  const getBookmarksMock = getBookmarks as jest.Mock;
  getBookmarksMock.mockReturnValue([mockIssue1, mockIssue3]);

  it('should make use of the useBookmarks hook and retrieve the bookmarks', async () => {
    const {result, waitForNextUpdate} = renderHook(() => useBookmarks());

    await waitForNextUpdate();

    expect(result.current).toStrictEqual([mockIssue1, mockIssue3]);
  });
});
