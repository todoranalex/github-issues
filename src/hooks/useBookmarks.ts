import {useState, useEffect} from 'react';
import {Issue} from '../reducers/issuesReducer';
import bookmarksService from '../services/BookmarkService';

export default function useBookmarks(): Issue[] {
  const [bookmarks, setBookmarks] = useState<Issue[]>([]);
  useEffect(() => {
    const get = async () => {
      const bookmarks = await bookmarksService.getBookmarks();
      setBookmarks(bookmarks);
    };
    get();
  }, []);
  return bookmarks;
}
