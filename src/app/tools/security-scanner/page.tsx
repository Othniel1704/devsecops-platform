import type { Metadata } from "next";
import SecurityScannerClient from "./SecurityScannerClient";

export const metadata: Metadata = {
  title: "Scanner de headers de sécurité gratuit",
  description:
    "Vérifie en quelques secondes les headers de sécurité HTTP d'une URL publique : CSP, HSTS, X-Frame-Options et plus.",
};

export default function Page() {
  return <SecurityScannerClient />;
}
