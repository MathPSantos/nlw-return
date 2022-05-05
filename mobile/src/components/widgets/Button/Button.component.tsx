import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  Text,
} from "react-native";
import { theme } from "../../../theme";

import { styles } from "./Button.styles";

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean;
}

export function Button({ isLoading = false, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      {isLoading ? (
        <ActivityIndicator color={theme.colors.text_on_brand_color} />
      ) : (
        <Text style={styles.title}>Enviar feedback</Text>
      )}
    </TouchableOpacity>
  );
}
