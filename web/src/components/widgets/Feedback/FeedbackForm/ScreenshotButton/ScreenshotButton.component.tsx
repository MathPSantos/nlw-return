import html2canvas from "html2canvas";
import { useState } from "react";

import { CameraIcon, TrashIcon } from "../../../../../core/shared/icons";
import { LoadingIndicator } from "../../../../elements";

interface ScreenshotButtonProps {
  screenshot: string | null;
  onScreenShotTook: (screenshot: string | null) => void;
}

export function ScreenshotButton({
  screenshot,
  onScreenShotTook,
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenchot() {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector("html")!);
    const base64Image = canvas.toDataURL("image/png");

    onScreenShotTook(base64Image);
    setIsTakingScreenshot(false);
  }

  if (screenshot) {
    return (
      <button
        className="p-1 w-10 h-10  rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        style={{ backgroundImage: `url(${screenshot})` }}
        onClick={() => onScreenShotTook(null)}
        type="button"
      >
        <TrashIcon weight="fill" />
      </button>
    );
  }

  return (
    <button
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
      onClick={handleTakeScreenchot}
      type="button"
    >
      {isTakingScreenshot ? (
        <LoadingIndicator />
      ) : (
        <CameraIcon className="w-6 h-6" />
      )}
    </button>
  );
}
