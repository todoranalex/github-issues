import { RouteProp, useRoute, useTheme } from '@react-navigation/native'
import React from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import { NavigationParamList } from '../../../navigation'

type IssuesRouteProps = RouteProp<NavigationParamList, 'IssueDetails'>

/***
 * Component used to display all the details for an individual issue. Disclaimer: Design not yet finished
 */
export default () => {
  const { issue: defaultIssue } = useRoute<IssuesRouteProps>().params
  const theme = useTheme()
  return (
    <ScrollView style={{ flex: 1 }}>
      <Text style={{ ...styles.organizationName, color: theme.colors.text }}>
        {`${defaultIssue.org} / ${defaultIssue.repo} #${defaultIssue.number}`}
      </Text>
      <Text
        style={{
          ...styles.title,
          color: theme.colors.primary,
        }}
      >
        {defaultIssue.title}
      </Text>
      {!defaultIssue ? (
        <ActivityIndicator
          size={24}
          color={theme.colors.primary}
          style={{
            height: 64,
            flex: 1,
            backgroundColor: theme.colors.background,
          }}
        />
      ) : (
        <View style={{ padding: 24 }}>
          {defaultIssue.labels?.map(l => {
            return (
              <Text key={l.id} style={{ color: theme.colors.primary, ...styles.text }}>
                {l?.name}
              </Text>
            )
          })}
          <Text style={{ color: theme.colors.primary, ...styles.text }}>{defaultIssue.state}</Text>
          <Text style={{ color: theme.colors.primary, ...styles.text }}>
            {defaultIssue.updated_at}
          </Text>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  organizationName: {
    marginLeft: 24,
    marginVertical: 8,
  },
  title: {
    paddingHorizontal: 24,
    fontSize: 26,
    fontWeight: '500',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
  },
})
