import {useState, useEffect} from 'react';
import {Issue} from '../../../api/issues/types';
import {getBookmarks} from '../../../tasks/bookmarks';

/***
 * Hook used to fetch a list of issues from the Async Storage.
 */
export default function useBookmarks(): Issue[] {
  const [bookmarks, setBookmarks] = useState<Issue[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const savedBookmarks = await getBookmarks();
      setBookmarks(savedBookmarks);
    };
    fetch();
  }, []);
  return bookmarks;
}
