import {useEffect, useState} from 'react';
import getIssue from '../api/issues/getIssue';
import {Issue} from '../api/issues/types';

/***
 * Hook used to fetch a issue from Github API
 */
export default function useIssue(defaultIssue: Issue) {
  const [issue, setIssue] = useState<Issue>();

  useEffect(() => {
    const fetchtIssue = async () => {
      const issueResponse = await getIssue(
        defaultIssue.repo,
        defaultIssue.org,
        defaultIssue.number,
      );
      setIssue(issueResponse);
    };
    fetchtIssue();
  }, [defaultIssue]);

  return issue;
}
