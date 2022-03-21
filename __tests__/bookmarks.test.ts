import {Issue} from '../src/reducers/issuesReducer';
import bookmarksService from '../src/services/BookmarkService';

describe('Bookmarked Issues', () => {
  test('get bookmarks, initially it should be an empty array', async () => {
    const bookmarks = await bookmarksService.getBookmarks();
    expect(bookmarks).toEqual([]);
  });
  test('add a bookmark, bookmarks list length should be 1', async () => {
    await bookmarksService.handleBookmark(mockIssue);
    const bookmarks = await bookmarksService.getBookmarks();
    expect(bookmarks).toHaveLength(1);
  });
  test('add another 2 bookmarks, bookmarks list length should be 3', async () => {
    await bookmarksService.handleBookmark(mockIssue2);
    await bookmarksService.handleBookmark(mockIssue3);
    const bookmarks = await bookmarksService.getBookmarks();
    expect(bookmarks).toHaveLength(3);
  });
  test('remove the second bookmark, bookmarks list length should be 2', async () => {
    await bookmarksService.handleBookmark(mockIssue2);
    const bookmarks = await bookmarksService.getBookmarks();
    expect(bookmarks).toHaveLength(2);
  });
  test('check bookmarks content match added bookmarks', async () => {
    const bookmarks = await bookmarksService.getBookmarks();
    expect(bookmarks[0]).toMatchObject(mockIssue);
    expect(bookmarks[1]).toMatchObject(mockIssue3);
  });
  test('add a bookmark that already exists, it should be removed', async () => {
    await bookmarksService.handleBookmark(mockIssue);
    const bookmarks = await bookmarksService.getBookmarks();
    expect(bookmarks).toHaveLength(1);
  });
  test('remove all bookmarks, bookmarks list should be empty', async () => {
    await bookmarksService.handleBookmark(mockIssue3);
    const bookmarks = await bookmarksService.getBookmarks();
    expect(bookmarks).toEqual([]);
  });
  test('add a bookmark and then remove it, the bookmarks list should be empty', async () => {
    await bookmarksService.handleBookmark(mockIssue3);
    await bookmarksService.handleBookmark(mockIssue3);
    const bookmarks = await bookmarksService.getBookmarks();
    expect(bookmarks).toEqual([]);
  })
});

const mockIssue: Issue = {
  number: 1,
  title: 'title1',
  state: 'open',
  labels: [],
  updated_at: '10',
  comments: 0,
  repo: 'repo1',
  org: 'org1',
};
const mockIssue2: Issue = {
  number: 2,
  title: 'title2',
  state: 'open',
  labels: [],
  updated_at: '10',
  comments: 0,
  repo: 'repo2',
  org: 'org2',
};
const mockIssue3: Issue = {
  number: 3,
  title: 'title3',
  state: 'open',
  labels: [],
  updated_at: '10',
  comments: 0,
  repo: 'repo3',
  org: 'org3',
};
