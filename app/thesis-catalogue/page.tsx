import { ThesisPageCatalogue } from "@/components/ThesisPageCatalogue";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MAISON · Thesis · Catalogue",
  description: "The recursive economy: Intent Cards published once, executed infinitely.",
  other: {
    'card:id': 'maison',
    'card:edition': 'catalogue',
    'card:section': 'thesis',
    'card:version': '1.0.0',
    'card:protocol': 'icx-0.1',
  },
};

export default function ThesisCataloguePage() {
  return <ThesisPageCatalogue />;
}
