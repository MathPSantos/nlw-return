import { useState } from "react";

import { FeedbackTypesStep } from "./FeedbackSteps/FeedbackTypeStep.component";

import bugImageUrl from "../../../../assets/bug.svg";
import ideaImageUrl from "../../../../assets/idea.svg";
import thoughtImageUrl from "../../../../assets/thought.svg";
import { FeedbackContentStep } from "./FeedbackSteps/FeedbackContentStep.component";
import { FeedbackSuccessStep } from "./FeedbackSteps/FeedbackSuccessStep.component";

export type FeedbackType = keyof typeof FEEDBACK_TYPES;

export const FEEDBACK_TYPES = {
  BUG: {
    title: "Problema",
    image: {
      src: bugImageUrl,
      alt: "Imagem de um inseto",
    },
  },
  IDEA: {
    title: "Ideia",
    image: {
      src: ideaImageUrl,
      alt: "Imagem de uma lampada",
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      src: thoughtImageUrl,
      alt: "imagem de um balão de pensamentos",
    },
  },
};

export function FeedbackForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccessStep
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypesStep onFeedbackTypeChange={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela{" "}
        <a
          className="underline underline-offset-2"
          href="https://rocketseat.com.br"
        >
          Rocketseat
        </a>
      </footer>
    </div>
  );
}
