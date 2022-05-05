import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import successImg from "../../../assets/success.png";
import { Copyright } from "../Copyright/Copyright.component";

import { styles } from "./Success.styles";

interface SuccessProps {
  onSendAnotherFeedback: () => void;
}

export function Success({ onSendAnotherFeedback }: SuccessProps) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={successImg} />

      <Text style={styles.title}>Agradecemos o feedback</Text>

      <TouchableOpacity style={styles.button} onPress={onSendAnotherFeedback}>
        <Text style={styles.buttonTitle}>Quero enviar outro</Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}
