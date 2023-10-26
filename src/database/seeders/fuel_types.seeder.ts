const fuelTypesPayload = [
  "Alternative",
  "Diesel",
  "Electric",
  "Gas",
  "Hybrid",
  "Plug-In Hybrid",
];

export const fuelTypesData = fuelTypesPayload.map((fuelType) => ({
  title: fuelType,
}));

export const fuelTypeMakeData = [
  {
    fuel_type_slug: "diesel",
  },
  {
    fuel_type_slug: "electric",
  },
  {
    fuel_type_slug: "gas",
  },
  {
    fuel_type_slug: "hybrid",
  },
  {
    fuel_type_slug: "plug-in-hybrid",
  },
];
