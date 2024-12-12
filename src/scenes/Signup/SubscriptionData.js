import moment from "moment";
import AppConsts from "../../lib/appconst";

export const SubscriptionData = async ( id, selectedPackage, userId) => {
    const now = new Date();
    const parseDigits = (str) => parseFloat(str.replace(/[^\d.]/g, ''));  // Parses only digits and decimals
    const parseUserId = (userName) => parseInt(userName.substring(userName.lastIndexOf('_') + 1), 10); // Get userId after "_"
    const getNumber=(str)=>{
        const result = Number(str.replace(/[^0-9.-]+/g,"")); // \d+ matches one or more digits
      console.log("currency conversion",result)
        if (result) {
          return parseInt(result[0], 10); // Convert the result to an integer
        } else {
          return 1
        }
      }
      console.log("props of api no 9",userId)
    if (selectedPackage.isMonthly) {
        if (selectedPackage.packageName === "Starter  (Beginner  Level)") {
            return {
                userId: userId,  // Assuming `values` contains user details like `UserName`
                tenantId: id,             // Assuming `values` contains `TenantId`
                subscriptionDate: moment(),
                startSubscriptionDate:moment().startOf('day'),
                endSubscriptionDate:moment().add(1, 'month'),
                packageId: selectedPackage.id,
                subscriptionStatus: true,
                paid: true,
                stripeKey: AppConsts.stripeKey||'',
                stripeResponseKey: "Due to unpaid of subscription payment no response available (Free trial)",
                stripeDesciptionKey: "Due to unpaid of subscription payment no description available (Free trial)",
                tottalPricePaid:Number(selectedPackage.exactPrice.replace(/[^0-9.-]+/g,"")),   // Parse digits from price
                discountPrice: Number(0),
                priceWithoutDiscountDiscount:Number(selectedPackage.exactPrice.replace(/[^0-9.-]+/g,"")),
            };
        } else {
            return {
                userId: userId,
                tenantId: id,
                subscriptionDate:moment(),
                startSubscriptionDate: moment().startOf('day'),
                endSubscriptionDate:  moment().add(1, 'month'),
                packageId: selectedPackage.id,
                subscriptionStatus: true,
                paid: false,
                stripeKey: AppConsts.stripeKey||'',
                stripeResponseKey: "Due to unpaid of subscription payment no response available",
                stripeDesciptionKey: "Due to unpaid of subscription payment no description available",
                tottalPricePaid:Number(selectedPackage.exactPrice.replace(/[^0-9.-]+/g,"")),
                discountPrice: Number(0),
                priceWithoutDiscountDiscount:Number(selectedPackage.exactPrice.replace(/[^0-9.-]+/g,"")),
            };
        }
    } else {
        return {
            userId: userId,
            tenantId: id,
            subscriptionDate: moment(),
            startSubscriptionDate: moment().startOf('day'),
            endSubscriptionDate:  moment().add(1, 'year'),
            packageId: selectedPackage.id,
            subscriptionStatus: true,
            paid: false,
            stripeKey: AppConsts.stripeKey||'',
            stripeResponseKey: "Due to unpaid of subscription payment no response available",
            stripeDesciptionKey: "Due to unpaid of subscription payment no description available",
            tottalPricePaid:Number(selectedPackage.exactPrice.replace(/[^0-9.-]+/g,"")),
            discountPrice:Number(selectedPackage.exactPrice.replace(/[^0-9.-]+/g,"")) / 11,
            priceWithoutDiscountDiscount:Number(selectedPackage.exactPrice.replace(/[^0-9.-]+/g,"")) + Number(selectedPackage.exactPrice.replace(/[^0-9.-]+/g,"") / 11),
        };
    }
};
