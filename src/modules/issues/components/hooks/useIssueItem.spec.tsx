import { renderHook } from '@testing-library/react-hooks'
import { BookmarksReducer } from '../../../bookmarks'
import { initialState } from '../../../bookmarks/state/reducers'
import { StoreProvider } from '../../../generic/state/store'
import { mockIssue1, mockIssue2, mockIssue3 } from '../../mocks'
import useIssueItem from './useIssueItem'
import React from 'react'
import { addBookmark, removeBookmark } from '../../../bookmarks/state/actions'
import { mockedNavigate } from '../../../../../__tests__/setup'

jest.mock('../../../bookmarks/state/actions')

const thunkDispatch = jest.fn()

const bookmarksThunkReducer: BookmarksReducer = [
  {
    ...initialState,
    bookmarks: [mockIssue1, mockIssue3],
  },
  thunkDispatch,
]

const wrapper = ({ children }: { children: any }) => (
  <StoreProvider
    children={children}
    issuesThunkReducer={{} as any}
    bookmarksThunkReducer={bookmarksThunkReducer}
  />
)

describe('#useIssueItem', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should provide if an issue is bookmarked', () => {
    const { result } = renderHook(() => useIssueItem(mockIssue1), {
      wrapper,
    })

    expect(result.current.isBookmarked).toBeTruthy()
  })

  it('should bookmark an issue', () => {
    const { result } = renderHook(() => useIssueItem(mockIssue2), {
      wrapper,
    })

    result.current.onBookmark()

    expect(thunkDispatch).toBeCalledWith(addBookmark(mockIssue2))
  })

  it('should remove bookmark for an issue', () => {
    const { result } = renderHook(() => useIssueItem(mockIssue1), {
      wrapper,
    })

    result.current.onBookmark()

    expect(thunkDispatch).toBeCalledWith(removeBookmark(mockIssue2))
  })

  it('should navigate to IssueDetails page on page click', () => {
    const { result } = renderHook(() => useIssueItem(mockIssue1), {
      wrapper,
    })

    result.current.onPress()

    expect(mockedNavigate).toBeCalledWith('IssueDetails', { issue: mockIssue1 })
  })
})
