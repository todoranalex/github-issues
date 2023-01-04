import {addBookmark, getBookmarks, removeBookmark} from '.';
import {mockIssue1, mockIssue2, mockIssue3} from '../../../issues/mocks';
import {getBookmarks as getBookmarksTask, toggleBookmark} from '../../tasks';

jest.mock('../../tasks');

const bookmarkedIssues = [mockIssue1, mockIssue3];

const getBookmarksTaskMock = getBookmarksTask as jest.Mock;

const dispatch = jest.fn();

describe('bookmarks actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should getBookmarks', async () => {
    getBookmarksTaskMock.mockReturnValue(bookmarkedIssues);

    getBookmarks()(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, {type: 'get-bookmarks'});

    await expect(getBookmarksTaskMock()).toBe(bookmarkedIssues);

    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: 'get-bookmarks-success',
      payload: {
        bookmarks: bookmarkedIssues,
      },
    });
  });

  it('should addBookmark', async () => {
    addBookmark(mockIssue2)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, {type: 'add-bookmark'});

    await toggleBookmark(mockIssue2);

    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: 'add-bookmark-success',
      payload: {
        bookmark: mockIssue2,
      },
    });
  });

  it('should removeBookmark', async () => {
    removeBookmark(mockIssue2)(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, {type: 'remove-bookmark'});

    await toggleBookmark(mockIssue2);

    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: 'remove-bookmark-success',
      payload: {
        bookmark: mockIssue2,
      },
    });
  });
});
