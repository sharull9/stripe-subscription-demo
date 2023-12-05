export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  stripePriceId: string;
  price: number;
}

export const storeSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "pro",
    name: "Pro",
    description:
      "Good video quality in SD (480p). Watch ad-free on any phone or tablet. Computer and TV not included. Download on 1 device.",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ?? "",
    price: 10,
  },
  {
    id: "max",
    name: "Max",
    description:
      "Good video quality in HD (720). Watch ad-free on any phone, tablet, computer or TV. Download on 1 device.",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_MAX_PRICE_ID ?? "",
    price: 30,
  },
  {
    id: "ultra",
    name: "Ultra",
    description:
      "Great video quality in Full HD (1080p). Watch ad-free on any phone, tablet, computer or TV. Download on 2 devices.",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_ULTRA_PRICE_ID ?? "",
    price: 50,
  },
];
