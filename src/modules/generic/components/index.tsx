import {useTheme} from '@react-navigation/native';
import React, {FunctionComponent} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles';
import GithubIcon from 'react-native-vector-icons/Octicons';

/***
 * Generic components used in the App.
 */

export const Input: FunctionComponent<{
  label: string;
  value: string;
  placeholder: string;
  testID: string;
  onChangeText(value: string): void;
}> = ({label, value, placeholder, testID, onChangeText}): JSX.Element => {
  const theme = useTheme();
  return (
    <View>
      <Text style={{color: theme.colors.primary, ...styles.textInputInfo}}>
        {label}
      </Text>
      <TextInput
        testID={testID}
        onChangeText={onChangeText}
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
    </View>
  );
};

export const Button: FunctionComponent<{
  text: string;
  icon?: string;
  borderColor?: string;
  testID?: string;
  onPress(): void;
}> = ({text, icon, borderColor, testID, onPress}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      testID={testID}
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

/***
 * Component used to override the default navigation header
 */
export const NavigationHeaderItem: FunctionComponent<{
  title?: string;
  onPress(): void;
}> = ({title, onPress}) => {
  return (
    <View style={styles.navHeaderContainer}>
      <GithubIcon
        onPress={onPress}
        name={'arrow-left'}
        color={'white'}
        size={24}
      />
      {title && <Text style={styles.navHeaderTitle}>{title}</Text>}
    </View>
  );
};
