const featurePayLoad = [
  {
    title: "20 Inch Plus Wheels",
  },
  {
    title: "4WD/AWD",
  },
  {
    title: "A/C Seat(s)",
  },
  {
    title: "ABS Brakes",
    category: "exterior-and-mechanical",
  },
  {
    title: "Adjustable Suspension",
  },
  {
    title: "Air Conditioning",
    category: "comfort",
  },
  {
    title:"Fog Lamps",
  },
  {
    title: "Alloy Wheels",
    category: "exterior-and-mechanical",
  },
  {
    title: "Alternative Fuel",
  },
  {
    title: "AM/FM Stereo",
    category: "entertainment",
  },
  {
    title: "Android Auto",
    category: "entertainment",
  },
  {
    title: "Apple CarPlay",
    category: "entertainment",
  },
  {
    title: "Automated Cruise Control",
    category: "tech",
  },
  {
    title: "Automated Parking",
  },
  {
    title: "Automatic Transmission",
    category: "mechanical",
  },
  {
    title: "Auxiliary Audio Input",
    category: "entertainment",
  },
  {
    title: "Barn Doors",
  },
  {
    title: "Beats Audio System",
  },
  {
    title: "Bed Cover",
  },
  {
    title: "Blind Spot Monitor",
    category: "tech",
  },
  {
    title: "Bluetooth Technology",
    category: "tech",
  },
  {
    title: "Blu-ray Video System",
  },
  {
    title: "Burmester Audio",
  },
  {
    title: "Cassette Player",
  },
  {
    title: "CD Audio",
    category: "entertainment",
  },
  {
    title: "Cloth Seats",
  },
  {
    title: "Cruise Control",
  },
  {
    title: "Dimension Audio",
  },
  {
    title: "Dual Rear Wheels",
  },
  {
    title: "DVD Video System",
  },
  {
    title: "Entune",
  },
  {
    title: "Fifth Wheel Tow Hitch",
  },
  {
    title: "Flex Fuel Vehicle",
  },
  {
    title: "Fold-Away Middle Row",
  },
  {
    title: "Fold-Away Third Row",
  },
  {
    title: "Front Seat Heaters",
    category: "comfort",
  },
  {
    title: "Full Leather Interior",
  },
  {
    title: "Full Roof Rack",
  },
  {
    title: "Gooseneck Tow Hitch",
  },
  {
    title: "Hard Top",
  },
  {
    title: "Head Up Display",
  },
  {
    title: "Heated Steering Wheel",
  },
  {
    title: "Lane Departure Warning",
    category: "tech",
  },
  {
    title: "Leather & Suede Seats",
  },
  {
    title: "Leather Seats",
    category: "comfort",
  },
  {
    title: "Leatherette & Cloth",
  },
  {
    title: "Leatherette Seats",
  },
  {
    title: "Long Bed",
  },
  {
    title: "Manual Transmission",
  },
  {
    title: "Memory Seat(s)",
    category:"comfort",
  },
  {
    title: "Navigation System",
    category: "tech",
  },
  {
    title: "No A/C",
  },
  {
    title: "No Power Steering",
  },
  {
    title: "Overhead Airbags",
    category: "interior",
  },
  {
    title: "Panoramic Sunroof",
    category: "comfort",
  },
  {
    title: "Parking Sensors",
  },
  {
    title: "Power Folding Third Row",
  },
  {
    title: "Power Hatch/Deck Lid",
  },
  {
    title: "Power Locks",
    category: "interior",
  },
  {
    title: "Power Mirrors",
    category: "interior",
  },
  {
    title: "Power Seat(s)",
    category: "interior",
  },
  {
    title: "Power Sliding Door(s)",
  },
  {
    title: "Power Windows",
    category: "interior",
  },
  {
    title: "Premium Sound",
  },
  {
    title: "Quad Seats",
  },
  {
    title: "RamBox",
  },
  {
    title: "Rear A/C Seat(s)",
  },
  {
    title: "Rear Air Conditioning",
  },
  {
    title: "Rear Defroster",
    category: "exterior-and-mechanical",
  },
  {
    title: "Rear Seat Heaters",
  },
  {
    title: "WiFi Hotspot",
    category: "tech",
  },
  {
    title: "Cross Traffic Alert",
    category: "tech",
  },
  {
    title: "Automatic Highbeams",
    category: "tech",
  },
  {
    title: "Rear Spoiler",
    category: "exterior-and-mechanical",
  },
  {
    title: "Rear Sunshade",
  },
  {
    title: "Rear View Camera",
    category: "tech",
  },
  {
    title: "Remote Start",
  },
  {
    title: "Run Flat Tires",
  },
  {
    title: "Running Boards",
  },
  {
    title: "Satellite Radio Ready",
    category: "entertainment",
  },
  {
    title: "Seat Massagers",
  },
  {
    title: "Shaker Sound System",
  },
  {
    title: "Side Airbags",
    category: "interior",
  },
  {
    title: "Signature",
  },
  {
    title: "SiriusXM Trial Available",
    category: "entertainment",
  },
  {
    title: "Skylight(s)",
  },
  {
    title: "Smart Key",
    category: "tech",
  },
  {
    title: "SMG Transmission",
  },
  {
    title: "Soft Top",
  },
  {
    title: "Suede Seats",
  },
  {
    title: "Sunroof(s)",
    category:"comfort"
  },
  {
    title: "Universal Garage Door Opener",
    category: "interior",
  },
  {
    title: "Supercharged Engine",
  },
  {
    title: "Sync System",
  },
  {
    title: "Targa",
  },
  {
    title: "Third Row Seat",
  },
  {
    title: "Tow Hitch",
  },
  {
    title: "Traction Control",
    category: "exterior-and-mechanical",
  },
  {
    title: "Turbo Charged Engine",
  },
  {
    title: "Turbo Diesel Engine",
  },
  {
    title: "Turbo/Supercharged Engine",
  },
  {
    title: "Vinyl Seats",
  },
  {
    title: "Daytime Running Lights",
    category: "exterior-and-mechanical",
  },
];

const categorizedFeatures = featurePayLoad.filter(
  (feature) => feature.category
);

// //make array of all the names of the features above in the data array

console.log(categorizedFeatures.length);

export default categorizedFeatures;
