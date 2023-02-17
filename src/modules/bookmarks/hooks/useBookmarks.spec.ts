import { renderHook } from '../../generic/helpers/testing-library/renderHook'
import { mockIssue1, mockIssue3 } from '../../issues/mocks'
import useBookmarks from './useBookmarks'
import { getBookmarks } from '../state/actions'
jest.mock('../state/actions')

const getBookmarksMock = getBookmarks as jest.Mock

getBookmarksMock.mockImplementation(jest.fn)

describe('#useBookmarks', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should retrieve bookmarks state', () => {
    const { result } = renderHook(useBookmarks)

    expect(result.current.state.bookmarks).toStrictEqual([mockIssue1, mockIssue3])
  })
})
