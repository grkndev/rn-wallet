import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SafeScreen({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    // <View style={{ flex: 1, backgroundColor: COLORS.background, paddingTop: insets.top }}>
    //   {children}
    // </View>
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      {children}
    </SafeAreaView>
  )
}