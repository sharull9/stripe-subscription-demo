"use server";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

interface ManageStripeSubscriptionActionProps {
  isSubscribed: boolean;
  stripeCustomerId?: string | null;
  isCurrentPlan: boolean;
  stripePriceId: string;
  email: string;
  userId: string;
}

export const manageStripeSubscriptionAction = async ({
  isSubscribed,
  stripeCustomerId,
  isCurrentPlan,
  stripePriceId,
  email,
  userId,
}: ManageStripeSubscriptionActionProps) => {
  const billingUrl = absoluteUrl("/billing");

  if (isSubscribed && stripeCustomerId && isCurrentPlan) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: billingUrl,
    });

    return { url: stripeSession.url };
  }

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: billingUrl,
    cancel_url: billingUrl,
    payment_method_types: ["card"],
    currency: 'inr',
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: email,
    line_items: [
      {
        price: stripePriceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId: userId,
    },
  });

  return { url: stripeSession.url };
};
