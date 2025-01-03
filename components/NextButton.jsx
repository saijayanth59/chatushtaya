import { Alert, Pressable, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { createReport } from "../backend/utils";
import { useReportContext } from "../context/ReportProvider";
import { useAuthContext } from "../context/AuthProvider";
import { Button } from "react-native-paper";

const NextButton = ({ disabledContidion, onPress, text = "Next" }) => {
  const { formData } = useReportContext();
  const { user } = useAuthContext();

  async function handlePress() {
    try {
      if (text == "Submit") {
        router.push("loading")
        await createReport({
          ...formData,
          userId: user.id,
          username: user.username,
        });
      }
      onPress();
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  return (
    <View className="w-full">
      <Pressable
        android_ripple={{color: "#78A2E5"}}
        className={`py-4 bg-mylavender rounded-xl`}
        onPress={handlePress}
        disabled={disabledContidion}
        style={{ opacity: disabledContidion ? 0.5 : 1 }}
      >
        <Text className="text-center text-lg text-white font-pmedium">
          {text}
        </Text>
      </Pressable>
    </View>
  );
};

export default NextButton;
