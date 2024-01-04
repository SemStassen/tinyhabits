"use client";

import Picker from "@emoji-mart/react";
import { Popover, Emoji } from "@/components";
import { useState } from "react";
import data from "@emoji-mart/data";
import { init } from "emoji-mart";

init({ data });

interface EmojiPickerProps {
  onEmojiSelect?: (d: EmojiPickerData) => void;
}

export interface EmojiPickerData {
  aliases?: string[];
  id: string;
  keywords: string[];
  name: string;
  native: string;
  shortcodes: string;
  skin?: number;
  unified: string;
}

function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const [selected, setSelected] = useState<EmojiPickerData>({
    id: "droplet",
    name: "Droplet",
    native: "💧",
    unified: "1f4a7",
    keywords: ["water", "drip", "faucet", "spring"],
    shortcodes: ":droplet:",
  });

  const handleEmojiSelect = (emoji: EmojiPickerData) => {
    setSelected(emoji);
    onEmojiSelect && onEmojiSelect(emoji);
  };

  return (
    <Popover
      modal
      side="right"
      align="start"
      trigger={
        <button type="button" className="aspect-square bg-white p-4">
          <Emoji emoji={selected.native} />
        </button>
      }
    >
      {/* Emoji data is loaded in root layout */}
      <Picker
        autoFocus={true}
        noCountryFlags={true}
        skinTonePosition="search"
        theme="light"
        onEmojiSelect={handleEmojiSelect}
      />
    </Popover>
  );
}

export default EmojiPicker;
