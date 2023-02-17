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
  textInputInfo: {
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    height: 48,
    marginBottom: 16,
    paddingLeft: 8,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: 48,
    marginBottom: 8,
  },
  buttonInnerContainer: { flexDirection: 'row', paddingHorizontal: 48 },
  buttonText: {
    fontSize: 20,
    marginRight: 8,
  },
  separator: {
    height: 1,
    opacity: 0.3,
    backgroundColor: 'gray',
    marginTop: 24,
  },
  navHeaderContainer: {
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navHeaderTitle: {
    color: 'white',
    marginLeft: 16,
    fontSize: 20,
    fontWeight: '700',
  },
})
