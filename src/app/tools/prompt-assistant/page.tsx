import type { Metadata } from "next";
import PromptAssistantClient from "./PromptAssistantClient";

export const metadata: Metadata = {
  title: "Assistant de prompt de code sécurisé",
  description:
    "Génère du code suivant des templates sécurisés (API, formulaires, auth, base de données) via une API LLM.",
};

export default function Page() {
  return <PromptAssistantClient />;
}
