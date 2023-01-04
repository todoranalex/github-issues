import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyScreenText: {marginTop: 8, color: 'white', alignSelf: 'center'},
  organizationName: {
    marginLeft: 24,
    marginBottom: 8,
  },
  filtersContainer: {
    flexDirection: 'row',
    marginLeft: 24,
  },
  issueItemContainer: {
    paddingTop: 24,
  },
  issueItemInner: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  issueItemIcon: {
    marginRight: 8,
  },
  issueItemHeaderText: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  issueItemTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  labelsContainer: {flexDirection: 'row', flexWrap: 'wrap', marginTop: 8},
  label: {
    borderRadius: 50,
    marginRight: 4,
    marginBottom: 4,
    paddingVertical: 2,
    paddingHorizontal: 8,
    alignSelf: 'baseline',
  },
  comment: {
    flexDirection: 'row',
    alignSelf: 'baseline',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: '#212121',
  },
  separator: {
    height: 1,
    opacity: 0.3,
    backgroundColor: 'gray',
    marginTop: 24,
  },
  filterItem: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    backgroundColor: '#778899',
    flexDirection: 'row',
  },
});
