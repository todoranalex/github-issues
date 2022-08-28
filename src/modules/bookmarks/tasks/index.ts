import {Issue} from '../../issues/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = 'BookmarksKey';

export const setBookmarks = async (bookmarks: Issue[]): Promise<void> => {
  await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
};

export const getBookmarks = async (): Promise<Issue[]> => {
  const raw = await AsyncStorage.getItem(BOOKMARKS_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const toggleBookmark = async (bookmark: Issue) => {
  const bookmarks = await getBookmarks();
  const savedBookmark = !!bookmarks.find(
    b => b.number === bookmark.number, // ensure the issue belongs to the repo..
  );
  if (!!savedBookmark) {
    const filtered = bookmarks.filter(b => {
      return b.number !== bookmark.number;
    });
    await setBookmarks(filtered);
  } else {
    bookmarks.push(bookmark);
    await setBookmarks(bookmarks);
  }
};

export const isBookmarkedInStorage = async (bookmark: Issue) => {
  const bookmarks = await getBookmarks();
  return !!bookmarks.find(b => b.number === bookmark.number);
};
