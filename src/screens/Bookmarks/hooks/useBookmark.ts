import {useEffect, useState} from 'react';
import {Issue} from '../../../api/issues/types';
import {isBookmarkedInStorage, toggleBookmark} from '../../../tasks/bookmarks';

/***
 * Hook which allows bookmark manipulation for an issue.
 */
const useBookmark = (bookmark: Issue) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const getStatus = async () => {
      const isSaved = await isBookmarkedInStorage(bookmark);
      setIsBookmarked(isSaved);
    };
    getStatus();
  }, []);

  const handleBookmarkToggle = async () => {
    await toggleBookmark(bookmark);
    setIsBookmarked(!isBookmarked);
  };
  return {isBookmarked, setBookmark: handleBookmarkToggle};
};

export default useBookmark;
