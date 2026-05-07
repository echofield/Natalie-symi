import { CatalogueLandingPage } from "@/components/CatalogueLandingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SYMI Intelligence · Intent Cards",
  description: "Intent Cards turn AI capability into ownable economic systems. Published once. Run forever.",
  other: {
    'card:type': 'catalogue-landing',
    'card:version': '1.0.0',
    'card:protocol': 'icx-0.1',
  },
};

export default function Home() {
  return <CatalogueLandingPage />;
}
