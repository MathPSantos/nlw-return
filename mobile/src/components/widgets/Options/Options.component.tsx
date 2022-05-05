import React from "react";
import { View, Text } from "react-native";
import { feedbackTypes } from "../../../core/utils/feedbackTypes";

import { Copyright } from "../Copyright/Copyright.component";
import { FeedbackType } from "../Feedback/Feedback.component";
import { Option } from "../Option/Option.component";

import { styles } from "./Options.styles";

interface OptionsProps {
  onFeedbackTypeChanged: (feedbackType: FeedbackType) => void;
}

export function Options({ onFeedbackTypeChanged }: OptionsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu Feedback</Text>

      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, feedback]) => (
          <Option
            key={key}
            {...feedback}
            onPress={() => onFeedbackTypeChanged(key as FeedbackType)}
          />
        ))}
      </View>

      <Copyright />
    </View>
  );
}
