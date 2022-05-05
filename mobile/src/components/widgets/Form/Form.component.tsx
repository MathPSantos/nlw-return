import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { captureScreen } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";

import { ArrowLeftIcon } from "../../../core/shared/icons";
import { feedbackTypes } from "../../../core/utils/feedbackTypes";
import { theme } from "../../../theme";
import { FeedbackType } from "../Feedback/Feedback.component";
import { ScreenshotButton } from "../ScreenshotButton/ScreenshotButton.component";
import { Button } from "../Button/Button.component";

import { styles } from "./Form.styles";
import { api } from "../../../libs/api";

interface FormProps {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSent,
}: FormProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleTakeScreenshot() {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    })
      .then((uri) => setScreenshot(uri))
      .catch((error) => console.log(error));
  }

  function handleRemoveScreenshot() {
    setScreenshot(null);
  }

  async function handleSubmit() {
    if (isSendingFeedback) {
      return;
    }

    setIsSendingFeedback(true);

    const screenshotBase64 =
      screenshot &&
      (await FileSystem.readAsStringAsync(screenshot, { encoding: "base64" }));

    try {
      await api.post("/feedbacks", {
        type: feedbackType,
        screenshot: `data:image/png;base64,${screenshotBase64}`,
        comment,
      });

      onFeedbackSent();
    } catch (err) {
      console.log(err);
    } finally {
      setIsSendingFeedback(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeftIcon
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.title}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>

      <TextInput
        style={styles.input}
        multiline
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        value={comment}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeScreenshot={handleTakeScreenshot}
          onRemoveScreenshot={handleRemoveScreenshot}
          screenshot={screenshot}
        />
        <Button
          disabled={!comment || isSendingFeedback}
          isLoading={isSendingFeedback}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}
