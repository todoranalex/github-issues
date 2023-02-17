import bookmarksReducer, { initialState } from '.'
import { mockIssue1, mockIssue2, mockIssue3 } from '../../../issues/mocks'

describe('#bookmarksReducer', () => {
  it('should handle get bookmarks', () => {
    expect(
      bookmarksReducer(initialState, {
        type: 'get-bookmarks',
      })
    ).toEqual({
      ...initialState,
      loading: true,
    })
  })

  it('should handle add bookmark', () => {
    expect(
      bookmarksReducer(initialState, {
        type: 'add-bookmark',
      })
    ).toEqual({
      ...initialState,
      loading: true,
    })
  })

  it('should handle remove bookmark', () => {
    expect(
      bookmarksReducer(initialState, {
        type: 'remove-bookmark',
      })
    ).toEqual({
      ...initialState,
      loading: true,
    })
  })

  it('should handle get-bookmarks-success', () => {
    expect(
      bookmarksReducer(initialState, {
        type: 'get-bookmarks-success',
        payload: {
          bookmarks: [mockIssue1, mockIssue2],
        },
      })
    ).toEqual({
      ...initialState,
      loading: false,
      bookmarks: [mockIssue1, mockIssue2],
    })
  })

  it('should handle add-bookmark-success', () => {
    expect(
      bookmarksReducer(initialState, {
        type: 'add-bookmark-success',
        payload: {
          bookmark: mockIssue3,
        },
      })
    ).toEqual({
      ...initialState,
      loading: false,
      bookmarks: [mockIssue3],
    })
  })

  it('should handle remove-bookmark-success', () => {
    expect(
      bookmarksReducer(
        {
          bookmarks: [mockIssue1, mockIssue2],
          loading: true,
        },
        {
          type: 'remove-bookmark-success',
          payload: {
            bookmark: mockIssue1,
          },
        }
      )
    ).toEqual({
      ...initialState,
      loading: false,
      bookmarks: [mockIssue2],
    })
  })
})
