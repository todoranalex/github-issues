import { getBookmarks, isBookmarkedInStorage, toggleBookmark } from '.'
import { mockIssue1, mockIssue2, mockIssue3 } from '../../issues/mocks'

describe('Bookmarked Issues', () => {
  it('should get bookmarks, initially it should be an empty array', async () => {
    const bookmarks = await getBookmarks()
    expect(bookmarks).toEqual([])
  })

  it('should add a bookmark, bookmarks list length should be 1', async () => {
    await toggleBookmark(mockIssue1)
    const bookmarks = await getBookmarks()
    expect(bookmarks).toHaveLength(1)
  })

  it('should add another 2 bookmarks, bookmarks list length should be 3', async () => {
    await toggleBookmark(mockIssue2)
    await toggleBookmark(mockIssue3)
    const bookmarks = await getBookmarks()
    expect(bookmarks).toHaveLength(3)
  })

  it('should remove the second bookmark, bookmarks list length should be 2', async () => {
    await toggleBookmark(mockIssue2)
    const bookmarks = await getBookmarks()
    expect(bookmarks).toHaveLength(2)
  })

  it('should check bookmarks content match added bookmarks', async () => {
    const bookmarks = await getBookmarks()
    expect(bookmarks[0]).toMatchObject(mockIssue1)
    expect(bookmarks[1]).toMatchObject(mockIssue3)
  })

  it('should add a bookmark that already exists, it should be removed', async () => {
    await toggleBookmark(mockIssue1)
    const bookmarks = await getBookmarks()
    expect(bookmarks).toHaveLength(1)
  })

  it('should remove all bookmarks, bookmarks list should be empty', async () => {
    await toggleBookmark(mockIssue3)
    const bookmarks = await getBookmarks()
    expect(bookmarks).toEqual([])
  })

  it('should add a bookmark and then remove it, the bookmarks list should be empty', async () => {
    await toggleBookmark(mockIssue3)
    await toggleBookmark(mockIssue3)
    const bookmarks = await getBookmarks()
    expect(bookmarks).toEqual([])
  })
  it('should return true if a bookmark is already saved and false otherwise', async () => {
    await toggleBookmark(mockIssue2)
    await toggleBookmark(mockIssue3)
    const isIssue1Bookmarked = await isBookmarkedInStorage(mockIssue1)
    expect(isIssue1Bookmarked).toEqual(false)
    const isIssue2Bookmarked = await isBookmarkedInStorage(mockIssue2)
    expect(isIssue2Bookmarked).toEqual(true)
  })
})
