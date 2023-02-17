import { Dispatch } from 'react'
import { Issue, IssueFilter } from '../../types'

export const initialState: State = {
  issues: [],
  org: '',
  repo: '',
  filter: 'open',
  filters: ['open', 'closed', 'all'],
  page: 1,
  issuesPerPage: 20,
  isLoading: true,
  error: undefined,
}

export type State = {
  issues: Issue[]
  org: string
  repo: string
  filter: IssueFilter
  filters: IssueFilter[]
  issuesPerPage: number
  page: number
  isLoading: boolean
  error: any
}

export type IssuesDispatch = (action: Action | ((dispatch: Dispatch<Action>) => void)) => void

export type Action =
  | {
      type: 'fetch-issues'
    }
  | {
      type: 'fetch-success'
      payload: {
        issues: Issue[]
      }
    }
  | {
      type: 'fetch-error'
      payload: {
        error: any
      }
    }
  | {
      type: 'set-page'
      payload: {
        page: number
      }
    }
  | {
      type: 'set-repo'
      payload: {
        repo: string
      }
    }
  | {
      type: 'set-org'
      payload: {
        org: string
      }
    }
  | {
      type: 'set-filter'
      payload: {
        filter: IssueFilter
      }
    }

/***
 * Reducer used to handle the state of the Github issues.
 */
const issuesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'fetch-issues': {
      return {
        ...state,
        isLoading: true,
      }
    }
    case 'fetch-success': {
      return {
        ...state,
        isLoading: false,
        error: undefined,
        issues: [...state.issues, ...action.payload.issues],
      }
    }
    case 'fetch-error': {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      }
    }
    case 'set-page': {
      return { ...state, page: action.payload.page }
    }
    case 'set-repo': {
      return { ...state, repo: action.payload.repo }
    }
    case 'set-org': {
      return { ...state, org: action.payload.org }
    }
    case 'set-filter': {
      return { ...state, filter: action.payload.filter, page: 1, issues: [] }
    }
  }
}

export default issuesReducer
