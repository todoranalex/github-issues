import {useEffect, useState} from 'react';
import {Issue} from '../reducers/issuesReducer';
import bookmarksService from '../services/BookmarkService';

/***
 * Hook which allows bookmark manipulation for an issue.
 */
export default function useBookmark(bookmark: Issue): [boolean, () => void] {
  const [isBookmarked, setIsBookmarked] = useState(false);
  useEffect(() => {
    const getStatus = async () => {
      const isSaved = await bookmarksService.isBookmarkedInStorage(bookmark);
      setIsBookmarked(isSaved);
    };
    getStatus();
  }, []);
  const toggleBookmark = async () => {
    await bookmarksService.handleBookmark(bookmark);
    setIsBookmarked(!isBookmarked);
  };
  return [isBookmarked, toggleBookmark];
}
