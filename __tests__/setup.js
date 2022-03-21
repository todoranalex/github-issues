import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
    useRoute: () => ({
      params: {
        organization: 'facebook',
        repository: 'react-native',
      },
    }),
  };
});
