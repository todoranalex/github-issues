import {act, renderHook} from '@testing-library/react-hooks';
import {mockIssue1} from '../../../api/issues/mocks';
import {isBookmarkedInStorage} from '../../../tasks/bookmarks';
import useBookmark from './useBookmark';

jest.mock('../../../tasks/bookmarks');

describe('#useBookmark', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const isBookmarkedInStorageMock = isBookmarkedInStorage as jest.Mock;
  isBookmarkedInStorageMock
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(false);

  it('should correctly retrieve from the storage if an issue is bookmarked ', async () => {
    const {result, waitForNextUpdate} = renderHook(() =>
      useBookmark(mockIssue1),
    );
    await waitForNextUpdate();
    expect(result.current.isBookmarked).toEqual(true);
  });

  it('should correctly retrieve from the storage if an issue is NOT bookmarked ', async () => {
    const {result} = renderHook(() => useBookmark(mockIssue1));
    expect(result.current.isBookmarked).toEqual(false);
  });

  it('should allow toggling bookmark for an issue', async () => {
    const {result} = renderHook(() => useBookmark(mockIssue1));

    expect(result.current.isBookmarked).toEqual(false);

    await act(async () => {
      result.current.setBookmark();
    });
    expect(result.current.isBookmarked).toEqual(true);

    await act(async () => {
      result.current.setBookmark();
    });
    expect(result.current.isBookmarked).toEqual(false);
  });
});
