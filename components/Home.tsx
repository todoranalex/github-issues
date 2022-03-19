import {useNavigation, useTheme} from '@react-navigation/native';
import React, {FunctionComponent, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import GithubIcon from 'react-native-vector-icons/Octicons';

export default () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const {height, width} = useWindowDimensions();
  const [githubDetails, setGithubDetails] = useState<{
    repository: string;
    organization: string;
  }>({
    repository: '',
    organization: '',
  });

  return (
    // <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'}>
    // <ScrollView>
    <View style={styles.container}>
      <GithubIcon name="mark-github" color={theme.colors.primary} size={128} />
      <Text style={{color: theme.colors.primary, ...styles.subtitle}}>
        Your GitHub issues fetcher app
      </Text>
      <View style={{width: width - 128}}>
        <Input
          label={'Organization'}
          value={githubDetails.organization}
          placeholder={'Insert organization here'}
          onChangeText={organization => {
            setGithubDetails(state => {
              return {...state, organization};
            });
          }}
        />
        <Input
          label={'Repository'}
          value={githubDetails.repository}
          placeholder={'Insert repository here'}
          onChangeText={repository => {
            setGithubDetails(state => {
              return {...state, repository};
            });
          }}
        />

        <Button
          text={'Fetch Issues'}
          icon={'rocket'}
          onPress={() => {
            const {repository, organization} = githubDetails;
            if (repository.length > 0 && organization.length > 0) {
              navigation.navigate('Issues', {
                organization: organization.toLowerCase(),
                repository: repository.toLowerCase(),
              });
            } else {
              Alert.alert(
                'Error',
                'Please input an organization and a repository',
              );
            }
          }}
        />
        <Button
          text={'Bookmarks'}
          icon={'bookmark'}
          onPress={() => {
            navigation.navigate('Bookmarks', {});
          }}
        />
      </View>
    </View>
    // </ScrollView>
    // </KeyboardAvoidingView>
  );
};

const Input: FunctionComponent<{
  label: string;
  value: string;
  placeholder: string;
  onChangeText(value: string): void;
}> = ({label, value, placeholder, onChangeText}): JSX.Element => {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Text style={{color: theme.colors.primary, ...styles.textInputInfo}}>
        {label}
      </Text>
      <TextInput
        onChangeText={text => {
          onChangeText(text);
        }}
        keyboardAppearance="dark"
        style={{
          ...styles.textInput,
          borderColor: theme.colors.primary,
          color: theme.colors.primary,
        }}
        placeholderTextColor={theme.colors.text}
        placeholder={placeholder}
        value={value}
      />
    </React.Fragment>
  );
};

export const Button: FunctionComponent<{
  text: string;
  icon?: string;
  borderColor?: string;
  onPress(): void;
}> = ({text, icon, borderColor, onPress}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.button,
        borderColor: borderColor ?? theme.colors.primary,
      }}>
      <View style={styles.buttonInnerContainer}>
        <Text style={{...styles.buttonText, color: theme.colors.primary}}>
          {text}
        </Text>
        {icon && (
          <GithubIcon name={icon} size={24} color={theme.colors.primary} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    marginTop: 24,
    marginBottom: 16,
  },
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
  buttonInnerContainer: {flexDirection: 'row', paddingHorizontal: 48},
  buttonText: {
    fontSize: 20,
    marginRight: 8,
  },
});
