import { View, StyleSheet, Image, useColorScheme } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { ThemedButton } from "../ThemedButton";
import { Theme } from "../../constants/Theme";
import { ThemedText } from "../ThemedText";

const Result = ({
  url,
  date,
  onReset,
}: {
  url: string;
  date: {
    success: number;
    user_name: string;
    url_user_image: string;
    message: string;
  };
  onReset: () => void;
}) => {
  const [seconds, setSeconds] = useState(5);
  const colorScheme = useColorScheme();
  const currentColors = Colors[colorScheme ?? "light"];

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      onReset();
    }
  }, [seconds]);

  return (
    <View style={styles.resultContainer}>
      {date.url_user_image && (
        <Image
          source={{ uri: `${url}${date.url_user_image}` }}
          style={[styles.userImage, { borderColor: currentColors.icon }]}
        />
      )}
      <ThemedText
        style={{
          fontWeight: "bold",
          fontSize: Theme.fontSize.lg,
          marginBottom: Theme.spacing.sm,
          color:
            date.success === 1
              ? currentColors.success
              : currentColors.error ?? currentColors.text,
        }}
      >
        {date.success === 1 ? "Liberado" : "Bloqueado"}
      </ThemedText>
      <ThemedText
        style={[
          styles.messageText,
          {
            color: currentColors.text,
          },
        ]}
      >
        {date.message}
      </ThemedText>

      <ThemedText style={[styles.userNameText, { color: currentColors.text }]}>
        {date.user_name}
      </ThemedText>
      <View style={styles.buttonContainer}>
        <ThemedButton title={`Fechar (${seconds}s)`} onPress={onReset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: Theme.spacing.xl,
    margin: Theme.spacing.lg,
  },
  userImage: {
    width: 300,
    height: 300,
    borderWidth: Theme.border.sm,
    borderRadius: Theme.radius.full,
    marginBottom: Theme.spacing.lg,
  },
  messageText: {
    fontWeight: "500",
    textAlign: "center",
    fontSize: Theme.fontSize.md,
    marginBottom: Theme.spacing.sm,
  },
  userNameText: {
    fontSize: Theme.fontSize.md,
    marginBottom: Theme.spacing.sm,
  },
  buttonContainer: {
    marginTop: Theme.spacing.md,
    width: "100%",
  },
});

export default Result;
