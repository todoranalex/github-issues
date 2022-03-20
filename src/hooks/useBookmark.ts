import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {Issue} from '../reducers/issuesReducer';
import issueService from '../services/IssueService';

export default function useBookmark(bookmark: Issue): [boolean, () => void] {
  const [isBookmarked, setIsBookmarked] = useState(false);
  useEffect(() => {
    const getStatus = async () => {
      const isSaved = await issueService.isBookmarkedInStorage(bookmark);
      setIsBookmarked(isSaved);
    };
    getStatus();
  }, []);
  const toggleBookmark = async () => {
    await issueService.handleBookmark(bookmark);
    setIsBookmarked(!isBookmarked);
  };
  return [isBookmarked, toggleBookmark];
}

export function useBookmarks(): Issue[] {
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
