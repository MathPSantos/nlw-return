import { CloseButton } from "../../../CloseButton/CloseButton.component";
import { FeedbackType, FEEDBACK_TYPES } from "../FeedbackForm.component";

interface FeedbackTypesStepProps {
  onFeedbackTypeChange: (value: FeedbackType | null) => void;
}

export function FeedbackTypesStep({
  onFeedbackTypeChange,
}: FeedbackTypesStepProps) {
  return (
    <>
      <header>
        <span className="text-xl leading-4">Deixe seu feedback</span>

        <CloseButton />
      </header>

      <div className="flex py-8 gap-2 w-full">
        {Object.entries(FEEDBACK_TYPES).map(([key, { title, image }]) => (
          <button
            key={key}
            className="bg-zinc-800 rounded-lg py-5 w-24 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
            onClick={() => onFeedbackTypeChange(key as FeedbackType)}
            type="button"
          >
            <img {...image} />
            <span>{title}</span>
          </button>
        ))}
      </div>
    </>
  );
}
