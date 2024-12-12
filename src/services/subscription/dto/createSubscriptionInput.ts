import { Moment } from 'moment';

export interface CreateSubscriptionInput {
  userId: number;
  tenantId: number;
  subscriptionDate: Moment;
  startSubscriptionDate: Moment;
  endSubscriptionDate: Moment;
  packageId: number;
  subscriptionStatus: boolean;
  paid: boolean;
  stripeKey: string;
  stripeResponseKey: string;
  stripeDesciptionKey: string;
  tottalPricePaid: number;
  discountPrice: number;
  priceWithoutDiscountDiscount: number;
}
