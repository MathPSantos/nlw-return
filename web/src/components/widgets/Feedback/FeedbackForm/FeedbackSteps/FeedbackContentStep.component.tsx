import { FormEvent, useState } from "react";

import { FeedbackType, FEEDBACK_TYPES } from "../FeedbackForm.component";
import { CloseButton } from "../../../CloseButton/CloseButton.component";
import { ScreenshotButton } from "../ScreenshotButton/ScreenshotButton.component";

import { ArrowLeftIcon } from "../../../../../core/shared/icons";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const feedbackTypeInfo = FEEDBACK_TYPES[feedbackType];

  function handleSubmitFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(comment, screenshot);

    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button
          className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
          type="button"
        >
          <ArrowLeftIcon weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-4 flex items-center gap-2">
          <img className="w-6 h-6" {...feedbackTypeInfo.image} />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          className="min-w-[340px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo"
          onChange={(event) => setComment(event.target.value)}
        />

        <footer className="flex mt-2 gap-2">
          <ScreenshotButton
            onScreenShotTook={setScreenshot}
            screenshot={screenshot}
          />

          <button
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 items-center justify-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-500"
            disabled={comment.length === 0}
            type="submit"
          >
            Enviar feedback
          </button>
        </footer>
      </form>
    </>
  );
}
