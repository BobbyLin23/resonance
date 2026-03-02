import type { Metadata } from "next";
import { TextToSpeechView } from "@/components/text-to-speech/text-to-speech-view";

export const metadata: Metadata = { title: "Text to Speech" };

export default function TextToSpeechPage() {
  return <TextToSpeechView />;
}
