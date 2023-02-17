import { Dispatch } from 'react'
import issuesReducer, { State, Action } from './reducers/issuesReducer'

// state & action & dispatch type
export type {
  State as IssuesState,
  Action as IssuesAction,
  IssuesDispatch,
} from './reducers/issuesReducer'

// reducer type
export type IssuesReducer = [
  State,
  (action: Action | ((dispatch: Dispatch<Action>) => void)) => void
]

//reducer initial state
export { initialState as issuesInitialState } from './reducers/issuesReducer'

// reducer
export { issuesReducer }
