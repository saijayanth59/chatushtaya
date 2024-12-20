import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Markdown from "react-native-markdown-display";

// Get current date and time for display
const date = new Date();
const API_KEY = "AIzaSyARK_lneNnX5svCRRpjqG9pHD3YmRvP90s";
const genAI = new GoogleGenerativeAI(API_KEY);

// Define list of irrelevant keywords/phrases
const irrelevantKeywords = [
  "generate code",
  "write program",
  "help with homework",
  "teach programming",
  "math problem",
  "generate solution",
  "technical help",
  "AI models",
  "science query",
  "technology",
  "write some code",
  "write code",
  "help me with homework",
];

const PROMPT =
  'If user question is related to any of this "generate code", "write program", "help with homework","teach programming","math problem","generate solution","technical help","AI models","science query","technology","write some code", "write code","help me with homework", give me output "yes" or else "no" only oneword, the user question is: ';

export default function Response(props) {
  const [generatedText, setGeneratedText] = useState("");
  const [userPrompt, setUserPrompt] = useState(props.prompt); // capture user prompt

  const isRelevantPrompt = async (prompt) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(PROMPT + prompt);
    const response = await result.response;
    const text = await response.text();
    console.log(text, text == "yes");
    return text;
  };

  useEffect(() => {
    const fetchData = async () => {
      // Check if the user's prompt is relevant
      if ((await isRelevantPrompt(userPrompt)).trim() === "yes") {
        // If the prompt is irrelevant, show a generic message
        console.log("I am working");
        setGeneratedText(
          "Sorry, I can't help with that. I'm here to provide emotional support. How are you feeling?"
        );
        return;
      }

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = userPrompt;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      setGeneratedText(text);
    };

    fetchData();
  }, [userPrompt]); // Re-run effect whenever the userPrompt changes

  return (
    <View style={styles.response}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Image
            source={require("../assets/icons/robot.png")}
            style={styles.icon}
          />
          <Text style={{ fontWeight: 600 }} className="font-pregular">
            Naira
          </Text>
        </View>
        <Text style={{ fontSize: 10, fontWeight: "600" }}>
          {date.getHours()}:{date.getMinutes()}
        </Text>
      </View>
      <Markdown>{generatedText}</Markdown>
    </View>
  );
}

const styles = StyleSheet.create({
  response: {
    flexDirection: "column",
    gap: 8,
    backgroundColor: "#fafafa",
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
  },
  icon: {
    width: 28,
    height: 28,
  },
});
