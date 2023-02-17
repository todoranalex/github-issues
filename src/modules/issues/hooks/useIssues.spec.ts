import useIssues from './useIssues'
import { fetchIssues, setFilter, setPage } from '../state/actions'
import { mockIssue1, mockIssue2, mockIssue3 } from '../mocks'
import { renderHook } from '../../generic/helpers/testing-library/renderHook'

jest.mock('../state/actions')

const fetchIssuesMock = fetchIssues as jest.Mock
fetchIssuesMock.mockImplementation(jest.fn)

const setPageMock = setPage as jest.Mock
setPageMock.mockImplementation((page: number) => ({
  type: 'set-page',
  payload: { page },
}))

const setFilterMock = setFilter as jest.Mock
setFilterMock.mockImplementation((filter: string) => ({
  type: 'set-filter',
  payload: { filter },
}))

describe('#useIssues', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should provide issues list', () => {
    const { result } = renderHook(() => useIssues())

    expect(result.current.state.issues).toStrictEqual([mockIssue1, mockIssue2, mockIssue3])
  })

  it('should provide method to activate filter', () => {
    const { result } = renderHook(() => useIssues())

    result.current.onFilterActivated('closed')

    expect(result.current.state.filter).toEqual('closed')
  })

  it('should provide method to load more issues', () => {
    const { result } = renderHook(() => useIssues())

    result.current.onLoadMore()

    expect(result.current.state.page).toEqual(2)
  })
})
