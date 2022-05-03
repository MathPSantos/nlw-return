import { SpinnerIcon } from "../../../core/shared/icons";

export function LoadingIndicator() {
  return (
    <div className="w-6 h-6 flex items-center justify-center overflow-hidden">
      <SpinnerIcon weight="bold" className="w-4 h-4 animate-spin" />
    </div>
  );
}
