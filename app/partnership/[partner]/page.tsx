import { EconomicsPagePartnership } from "@/components/EconomicsPagePartnership";
import type { Metadata } from "next";
import nataliData from "@/maison/partners/natali.json";
import hegetfundsData from "@/maison/partners/hegetfunds.json";

interface PartnerData {
  name: string;
  roleDescription: string;
  audienceReach: number;
  conversionRate: number;
  avgValue: number;
  retention: number;
  ceiling: number;
}

const PARTNERS: Record<string, PartnerData> = {
  natali: nataliData,
  hegetfunds: hegetfundsData,
};

export async function generateStaticParams() {
  return Object.keys(PARTNERS).map(partner => ({ partner }));
}

export async function generateMetadata({ params }: { params: Promise<{ partner: string }> }): Promise<Metadata> {
  const { partner } = await params;
  const partnerData = PARTNERS[partner];

  return {
    title: `MAISON · ${partnerData.name.toUpperCase()}`,
    description: `SYMI × ${partnerData.name} partnership edition.`,
    other: {
      'card:id': 'maison',
      'card:edition': 'partnership',
      'card:partner': partner,
      'card:version': '1.0.0',
      'card:protocol': 'icx-0.1',
    },
  };
}

export default async function PartnershipPage({ params }: { params: Promise<{ partner: string }> }) {
  const { partner } = await params;
  const partnerData = PARTNERS[partner];

  return <EconomicsPagePartnership partner={partnerData} />;
}
