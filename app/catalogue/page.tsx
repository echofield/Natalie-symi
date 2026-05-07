import { EconomicsPageCatalogue } from "@/components/EconomicsPageCatalogue";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MAISON · Catalogue",
  description: "Intent card from the SYMI catalogue.",
  other: {
    'card:id': 'maison',
    'card:edition': 'catalogue',
    'card:version': '1.0.0',
    'card:protocol': 'icx-0.1',
  },
};

export default function CataloguePage() {
  return <EconomicsPageCatalogue />;
}
