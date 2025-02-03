import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  SystemMessage,
  IMessage,
} from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios"; // Import Axios for API calls

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const API_KEY = "YOUR_DEEPSEEK_API_KEY"; // Replace with your DeepSeek API key

export default function TabTwoScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState("");
  const insets = useSafeAreaInsets();
  const [replyMessage, setReplyMessage] = useState<IMessage | null>(null);
  const swipeableRowRef = useRef<Swipeable | null>(null);

  useEffect(() => {
    setMessages([
      {
        _id: 0,
        system: true,
        text: "Type your question or share what’s on your mind…",
        createdAt: new Date(),
        user: {
          _id: 0,
          name: "DeepSeek",
          avatar: "https://cdn.deepseek.com/platform/favicon.png",
        },
      },
    ]);
  }, []);

  const sendMessageToDeepSeek = async (userMessage: any) => {
    try {
      const response = await axios.post(
        DEEPSEEK_API_URL,
        {
          model: "deepseek-chat",
          messages: [{ role: "user", content: userMessage }],
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botReply = response.data.choices[0].message.content;

      const newBotMessage = {
        _id: Math.random().toString(36).substring(7),
        text: botReply,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "DeepSeek",
          avatar: "https://cdn.deepseek.com/platform/favicon.png",
        },
      };

      setMessages((prevMessages) => GiftedChat.append(prevMessages, [newBotMessage]));
    } catch (error) {
      console.error("DeepSeek API Error:", error);
    }
  };

  const onSend = useCallback((messages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, messages));
    sendMessageToDeepSeek(messages[0].text); // Send message to DeepSeek API
  }, []);

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={{ backgroundColor: Colors.background }}
    />
  );

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: "#dbffcb" },
        left: { backgroundColor: "#ffffff" },
      }}
    />
  );

  return (
    <ImageBackground
      source={require("@/assets/images/pattern.png")}
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        marginBottom: 90,
        marginTop: insets.top,
      }}
    >
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        onInputTextChanged={setText}
        user={{ _id: 1 }}
        renderSystemMessage={(props) => (
          <SystemMessage {...props} textStyle={{ color: Colors.gray }} />
        )}
        bottomOffset={insets.bottom}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={(props) => (
          <Send {...props}>
            <Ionicons name="send" color={Colors.primary} size={28} />
          </Send>
        )}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  composer: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    paddingHorizontal: 10,
    paddingTop: 8,
    fontSize: 16,
    marginVertical: 4,
  },
});