import { ClerkProvider } from '@clerk/clerk-expo'
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function RootLayout() {
  return (
    <React.Fragment>
     <SafeAreaView
      style={{ flex: 1 }}
     >
      <StatusBar style="dark" />
      <ClerkProvider tokenCache={tokenCache}>
        <Slot screenOptions={{ headerShown: false }} />
      </ClerkProvider>
     </SafeAreaView>
    </React.Fragment>
  );
}
