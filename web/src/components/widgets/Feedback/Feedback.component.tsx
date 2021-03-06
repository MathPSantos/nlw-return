import { Popover } from "@headlessui/react";

import { ChatIcon } from "../../../core/shared/icons";
import { FeedbackForm } from "./FeedbackForm/FeedbackForm.component";

export function Feedback() {
  return (
    <Popover className="absolute bottom-4 right-4 md:right-8 md:bottom-8 flex flex-col items-end">
      <Popover.Panel>
        <FeedbackForm />
      </Popover.Panel>

      <Popover.Button className="bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group">
        <ChatIcon className="w-6 h-6" />

        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
          <span className="pl-2" />
          Feedback
        </span>
      </Popover.Button>
    </Popover>
  );
}
