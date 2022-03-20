import {useEffect, useState} from 'react';
import {Issue} from '../reducers/issuesReducer';
import issueService from '../services/IssueService';

export default function useIssue(defaultIssue: Issue) {
  const [issue, setIssue] = useState<Issue>();

  useEffect(() => {
    const getIssue = async () => {
      const issueResponse = await issueService.getIssue(
        defaultIssue.repo,
        defaultIssue.org,
        defaultIssue.number,
      );
      setIssue(issueResponse);
    };
    getIssue();
  }, [defaultIssue]);

  return issue;
}
