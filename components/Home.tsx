import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {FlatList, Text, View} from 'react-native';
import {useGithubbIssues} from '../hooks';
import GithubIcon from 'react-native-vector-icons/Octicons';

const issueIcons = {
  open: 'issue-opened',
  closed: 'issue-closed',
};

export default () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const {state} = useGithubbIssues(page);
  const {width} = useWindowDimensions();
  const theme = useTheme();

  return state.isLoading && page === 1 ? (
    <ActivityIndicator
      size={24}
      color={'white'}
      style={{flex: 1, backgroundColor: theme.colors.background}}
    />
  ) : (
    <View style={{flex: 1, paddingTop: 48}}>
      <FlatList
        bounces={false}
        onEndReachedThreshold={1}
        ListFooterComponent={() => {
          if (page > 1 && state.isLoading) {
            return (
              <ActivityIndicator
                color="white"
                style={{
                  paddingVertical: 48,
                }}
              />
            );
          } else {
            return <React.Fragment />;
          }
        }}
        onEndReached={() => {
          setPage(page + 1);
        }}
        style={{
          flex: 1,

          backgroundColor: theme.colors.background,
        }}
        data={state.issues}
        keyExtractor={item => `${item.title} - ${item.number}`}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Details');
              }}
              activeOpacity={0.84}
              key={`${item.title} - ${item.number}`}
              style={{
                paddingTop: 24,
              }}>
              <View
                style={{
                  paddingHorizontal: 8,
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <GithubIcon
                  name="issue-opened"
                  size={24}
                  color={'green'}
                  style={{
                    marginRight: 8,
                  }}
                />
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      color: 'white',
                      opacity: 0.5,
                      marginBottom: 8,
                      fontSize: 14,
                      fontWeight: '500',
                    }}>
                    facebook / react-native #{item.number}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: '500',
                    }}>
                    {item.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      marginTop: 8,
                    }}>
                    {item.labels.map((label, i) => {
                      return (
                        <View
                          key={label.id}
                          style={{
                            borderRadius: 50,
                            marginRight: 4,
                            marginBottom: 4,
                            paddingVertical: 2,
                            paddingHorizontal: 8,
                            alignSelf: 'baseline',
                            backgroundColor: `#${label.color}`,
                          }}>
                          <Text style={{color: 'black'}}>{label.name}</Text>
                        </View>
                      );
                    })}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'baseline',
                      alignItems: 'center',
                      backgroundColor: 'black', //TODO: add correct color
                    }}>
                    <GithubIcon name="comment" color={'gray'}></GithubIcon>
                    <Text style={{color: 'gray', marginLeft: 3}}>
                      {item.comments}
                    </Text>
                  </View>
                </View>
                <Text style={{color: 'white', opacity: 0.5}}>
                  {item.updated_at.slice(0, 4)}
                </Text>
              </View>
              <View
                style={{
                  height: 1,
                  opacity: 0.3,
                  backgroundColor: 'gray',
                  width,
                  marginTop: 24,
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
