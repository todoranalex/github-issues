import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {Issue} from '../reducers/issuesReducer';

const BOOKMARKS_KEY = 'bookmarksKey';

const getBookmarks = async (): Promise<Issue[]> => {
  const raw = await AsyncStorage.getItem(BOOKMARKS_KEY);
  return raw ? JSON.parse(raw) : [];
};

const setBookmarks = async (bookmarks: Issue[]): Promise<void> => {
  await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
};

const handleBookmark = async (bookmark: Issue) => {
  const bookmarks = await getBookmarks();
  const savedBookmark = !!bookmarks.find(
    b => b.number === bookmark.number, // ensure the issue belongs to the repo..
  );
  if (!!savedBookmark) {
    console.log('bookmark will be removed!', savedBookmark);
    const filtered = bookmarks.filter(b => {
      return b.number !== bookmark.number;
    });
    await setBookmarks(filtered);

    console.log('bookmark removed, array is', filtered);
  } else {
    bookmarks.push(bookmark);
    await setBookmarks(bookmarks);
    console.log('bookmark added array is', bookmarks);
  }
};

const isBookmarkedInStorage = async (bookmark: Issue): Promise<boolean> => {
  const bookmarks = await getBookmarks();
  return !!bookmarks.find(b => b.number === bookmark.number);
};

export default function useBookmark(bookmark: Issue): [boolean, () => void] {
  const [isBookmarked, setIsBookmarked] = useState(false);
  useEffect(() => {
    const getStatus = async () => {
      const isSaved = await isBookmarkedInStorage(bookmark);
      setIsBookmarked(isSaved);
    };
    getStatus();
  }, []);
  const toggleBookmark = async () => {
    await handleBookmark(bookmark);
    setIsBookmarked(!isBookmarked);
  };
  return [isBookmarked, toggleBookmark];
}

export function useBookmarks(): Issue[] {
  const [bookmarks, setBookmarks] = useState<Issue[]>([]);
  useEffect(() => {
    const get = async () => {
      const bookmarks = await getBookmarks();
      console.log('bookmark list', bookmarks);
      setBookmarks(bookmarks);
    };
    get();
  }, []);
  return bookmarks;
}
