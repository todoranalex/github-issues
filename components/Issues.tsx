import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {FlatList, Text, View} from 'react-native';
import {useGithubbIssues} from '../hooks';
import GithubIcon from 'react-native-vector-icons/Octicons';
import {SafeAreaView} from 'react-native-safe-area-context';

const issueIcons = {
  open: {
    icon: 'issue-opened',
    color: 'green',
  },
  closed: {
    icon: 'issue-closed',
    color: 'purple',
  },
};

export default () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<string>('open');
  const {state} = useGithubbIssues(page);
  const {width} = useWindowDimensions();
  const theme = useTheme();
  const Toolbar = () => {
    return (
      <SafeAreaView
        style={{
          paddingLeft: 8,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <GithubIcon
            onPress={() => {
              navigation.goBack();
            }}
            color={'white'}
            size={24}
            name={'arrow-left'}></GithubIcon>
          <View style={{marginLeft: 16}}>
            <Text style={{color: 'gray'}}>react-native</Text>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: '700',
              }}>
              Issues
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
            left: 8,
          }}>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              paddingHorizontal: 8,
              paddingVertical: 4,
              marginRight: 8,
              backgroundColor: '#212121',
            }}
            onPress={() => {
              setFilter('open');
            }}>
            <Text style={{color: 'white'}}>Open</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              paddingHorizontal: 8,
              paddingVertical: 4,
              marginRight: 8,
              backgroundColor: '#212121',
            }}
            onPress={() => {
              setFilter('closed');
            }}>
            <Text style={{color: 'white'}}>Closed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              backgroundColor: '#212121',
              paddingHorizontal: 8,
              paddingVertical: 4,
            }}
            onPress={() => {
              setFilter('all');
            }}>
            <Text style={{color: 'white'}}>All</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <React.Fragment>
      <Toolbar />
      {state.isLoading && page === 1 ? (
        <ActivityIndicator
          size={24}
          color={'white'}
          style={{flex: 1, backgroundColor: theme.colors.background}}
        />
      ) : (
        <View style={{flex: 1}}>
          {state.issues.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <GithubIcon name={'mark-github'} color={'white'} size={32} />
              <Text
                style={{
                  marginTop: 8,
                  color: 'white',
                  alignSelf: 'center',
                }}>
                Wow, such empty ;(
              </Text>
            </View>
          ) : (
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
                        name={
                          item.state === 'open'
                            ? issueIcons.open.icon
                            : issueIcons.closed.icon
                        }
                        size={24}
                        color={
                          item.state === 'open'
                            ? issueIcons.open.color
                            : issueIcons.closed.color
                        }
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
                                <Text style={{color: 'black'}}>
                                  {label.name}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                        {item.comments > 0 && (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignSelf: 'baseline',
                              alignItems: 'center',
                              borderRadius: 10,
                              paddingVertical: 2,
                              paddingHorizontal: 8,
                              backgroundColor: '#212121', //TODO: add correct color
                            }}>
                            <GithubIcon
                              name="comment"
                              color={'gray'}></GithubIcon>
                            <Text style={{color: 'gray', marginLeft: 3}}>
                              {item.comments}
                            </Text>
                          </View>
                        )}
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
          )}
        </View>
      )}
    </React.Fragment>
  );
};
