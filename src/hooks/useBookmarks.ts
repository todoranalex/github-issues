import {useState, useEffect} from 'react';
import {Issue} from '../reducers/issuesReducer';
import issueService from '../services/IssueService';

export default function useBookmarks(): Issue[] {
  const [bookmarks, setBookmarks] = useState<Issue[]>([]);
  useEffect(() => {
    const get = async () => {
      const bookmarks = await issueService.getBookmarks();
      setBookmarks(bookmarks);
    };
    get();
  }, []);
  return bookmarks;
}
