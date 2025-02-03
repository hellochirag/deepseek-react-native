import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#1D3D47", dark: "#1D3D47" }}
      headerImage={
        <Image
          resizeMode="contain"
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText>
        🚀💬 Welcome to React Native Chat – Deepseek Integration! 🔗🎉
      </ThemedText>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          Step 1: Access Your DeepSeek Account
        </ThemedText>
        <ThemedText>
          Go to the DeepSeek homepage{" "}
          <ThemedText type="defaultSemiBold">
            https://www.deepseek.com/
          </ThemedText>
          If you don’t have an account, create one. This step is necessary to
          obtain your API key, which you’ll use in the following steps.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          Step 2: Get Your DeepSeek API Key
        </ThemedText>
        <ThemedText>
          {`🔹Once inside DeepSeek, select “Access API”.\n🔹In the left sidebar, click on “API Keys“.\n🔹Click the “Create new API Key” button.\n🔹In the pop-up window, optionally assign a name to your key. This will help you identify the key later if you need to manage multiple keys.\n🔹Click “Create API key”.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          Step 3: Enter the API Key in AI Content Labs
        </ThemedText>
        <ThemedText>
          Log in to your AI Content Labs account: app.aicontentlabs.com/. In the
          left menu, select “Set Up API Keys”. Locate the DeepSeek card and
          click “Connect”. Paste the API key you copied into the corresponding
          field. Click “Save”.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 4: Feedback</ThemedText>
        <ThemedText>
          • Share your thoughts and feedback on{" "}
          <ThemedText type="defaultSemiBold">GitHub</ThemedText> or{" "}
          <ThemedText type="defaultSemiBold">LinkedIn</ThemedText>.{"\n"}•
          Connect via email to discuss improvements or questions.
          <ThemedText type="link">(chiragjadav134@gmail.com)</ThemedText>
          {"\n\n"}
          <ThemedText type="defaultSemiBold">
            Let’s build something amazing together! 🚀
          </ThemedText>
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: -10,
    left: 20,
    position: "absolute",
  },
});
