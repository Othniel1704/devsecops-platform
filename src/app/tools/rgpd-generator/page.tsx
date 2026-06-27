import type { Metadata } from "next";
import RgpdGeneratorClient from "./RgpdGeneratorClient";

export const metadata: Metadata = {
  title: "Générateur RGPD gratuit",
  description:
    "Génère une politique de confidentialité conforme RGPD pour ton MVP ou projet étudiant, gratuitement et sans inscription.",
};

export default function Page() {
  return <RgpdGeneratorClient />;
}
