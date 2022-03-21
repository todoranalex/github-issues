import {useState, useEffect} from 'react';
import {Issue} from '../reducers/issuesReducer';
import bookmarksService from '../services/BookmarkService';

/***
 * Hook used to fetch a  list of issues from the Async Storage.
 */
export default function useBookmarks(): Issue[] {
  const [bookmarks, setBookmarks] = useState<Issue[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const bookmarks = await bookmarksService.getBookmarks();
      setBookmarks(bookmarks);
    };
    fetch();
  }, []);
  return bookmarks;
}
