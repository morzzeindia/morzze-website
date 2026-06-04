export const pageSize = 10;
export const canResendOTPInterval = 10; // in seconds
export const isUUID = (identifier: string) =>
  /^[0-9a-fA-F-]{36}$/.test(identifier);

export const tempUserId = "63089f34-5276-481f-bc92-f75ff1ad24a5";
export const bestSellingSlug = "best-selling-products";
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export const kitchenBathroomRestrictCategories = new Set([
  "hand-shower",
  "trending-now",
  "aura-steel-sinks",
  "sink-drain-adaptor",
  "signature-pieces",
  "drain-pipe",
  "liquid-soap-dispenser",
  "sink-strainer-cover",
  "new-arrivals",
  "sink-strainer",
  "kitchen-accessories"
]);

export const allowedCategoryNames = new Set([
  "granite-sink",
  "stainless-steel-sinks",
  "kitchen-faucet",
  "bathroom-faucet",
  "wash-basin",
  "towel-warmer",
  "food-waste-disposers",
  "floor-drainer",
  "air-tap",
]);