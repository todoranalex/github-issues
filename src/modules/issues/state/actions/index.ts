import getIssues from '../../api/getIssues'
import { Action } from '../reducers/issuesReducer'
import { IssueFilter } from '../../types'

export const fetchIssues =
  (repo: string, org: string, issuesPerPage: number, filter: IssueFilter, page: number) =>
  async (dispatch: React.Dispatch<Action>) => {
    dispatch({
      type: 'fetch-issues',
    })
    try {
      const issues = await getIssues(repo, org, issuesPerPage, filter, page)
      dispatch({
        type: 'fetch-success',
        payload: { issues },
      })
    } catch (e) {
      dispatch({
        type: 'fetch-error',
        payload: { error: e },
      })
    }
  }

export const setFilter = (filter: IssueFilter): Action => {
  return {
    type: 'set-filter',
    payload: {
      filter,
    },
  }
}

export const setPage = (page: number): Action => {
  return {
    type: 'set-page',
    payload: {
      page,
    },
  }
}

export const setOrg = (org: string): Action => {
  return {
    type: 'set-org',
    payload: {
      org,
    },
  }
}

export const setRepo = (repo: string): Action => {
  return {
    type: 'set-repo',
    payload: {
      repo,
    },
  }
}
