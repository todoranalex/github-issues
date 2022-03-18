import { Octokit } from "@octokit/rest";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Endpoints } from "@octokit/types";
import { useGithubbIssues } from "../hooks";

export default () => {
  const { state } = useGithubbIssues(1);
  const { width, height } = useWindowDimensions();
  const theme = useTheme();

  return state.isLoading ? (
    <ActivityIndicator
      color={"white"}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
    />
  ) : (
    <View style={{ flex: 1, paddingBottom: 48, paddingTop: 48 }}>
      <FlatList
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
        data={state.data.data}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                paddingTop: 24,
                paddingHorizontal: 16,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ color: "white", opacity: 0.5, marginBottom: 8 }}
                  >
                    facebook / react-native #{item.number}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{ color: "white", marginBottom: 8 }}
                  >
                    {item.title}
                  </Text>
                </View>
                <Text style={{ color: "white", opacity: 0.5 }}>2d</Text>
              </View>
              <View
                style={{ height: 1, backgroundColor: "gray", width }}
              ></View>
            </View>
          );
        }}
      />
    </View>
  );
};
