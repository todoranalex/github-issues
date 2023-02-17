import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyScreenText: { marginTop: 8, color: 'white', alignSelf: 'center' },
  organizationName: {
    marginLeft: 24,
    marginVertical: 8,
  },
  filtersContainer: {
    flexDirection: 'row',
    marginLeft: 24,
  },
})
