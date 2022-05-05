import React, { useRef, useState } from "react";
import { TouchableHighlight } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import { ChatIcon } from "../../../core/shared/icons";
import { theme } from "../../../theme";

import { styles } from "./Feedback.styles";
import { Options } from "../Options/Options.component";
import { feedbackTypes } from "../../../core/utils/feedbackTypes";
import { Form } from "../Form/Form.component";
import { Success } from "../Success/Success.component";

export type FeedbackType = keyof typeof feedbackTypes;

function FeedbackImp() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [isFeedbackSent, setIsFeedbackSent] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleFeedbackCanceled() {
    setFeedbackType(null);
    setIsFeedbackSent(false);
  }

  function handleFeedbackSent() {
    setIsFeedbackSent(true);
  }

  return (
    <>
      <TouchableHighlight style={styles.button} onPress={handleOpen}>
        <ChatIcon
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableHighlight>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {isFeedbackSent ? (
          <Success onSendAnotherFeedback={handleFeedbackCanceled} />
        ) : (
          <>
            {feedbackType ? (
              <Form
                feedbackType={feedbackType}
                onFeedbackCanceled={handleFeedbackCanceled}
                onFeedbackSent={handleFeedbackSent}
              />
            ) : (
              <Options onFeedbackTypeChanged={setFeedbackType} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  );
}

export const Feedback = gestureHandlerRootHOC(FeedbackImp);
