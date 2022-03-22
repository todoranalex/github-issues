import AsyncStorage from '@react-native-community/async-storage';
import {Issue} from '../reducers/issuesReducer';

const BOOKMARKS_KEY = 'bookmarksKey';

interface IIBookmarksService {
  getBookmarks(): Promise<Issue[]>;
  handleBookmark(bookmark: Issue): void;
  isBookmarkedInStorage(bookmark: Issue): Promise<boolean>;
}

/***
 * Class Service which handles interaction with the Async Storage for bookmarks handling
 * */
class BookmarkService implements IIBookmarksService {
  private setBookmarks = async (bookmarks: Issue[]): Promise<void> => {
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  };

  getBookmarks = async (): Promise<Issue[]> => {
    const raw = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  };

  //It adds the bookmark if it doesn't exist, otherwise removes it
  handleBookmark = async (bookmark: Issue) => {
    const bookmarks = await this.getBookmarks();
    const savedBookmark = !!bookmarks.find(
      b => b.number === bookmark.number, // ensure the issue belongs to the repo..
    );
    if (!!savedBookmark) {
      const filtered = bookmarks.filter(b => {
        return b.number !== bookmark.number;
      });
      await this.setBookmarks(filtered);
    } else {
      bookmarks.push(bookmark);
      await this.setBookmarks(bookmarks);
    }
  };

  isBookmarkedInStorage = async (bookmark: Issue): Promise<boolean> => {
    const bookmarks = await this.getBookmarks();
    return !!bookmarks.find(b => b.number === bookmark.number);
  };
}

const bookmarksService = new BookmarkService();
export default bookmarksService as IIBookmarksService;
