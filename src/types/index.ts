export enum FEATURECATEGORY {
  comfort = "comfort",
  entertainment = "entertainment",
  tech = "tech",
  interior = "interior",
  mechanical = "mechanical",
  exteriorAndMechanical = "exterior-and-mechanical",
}

export type FeatureCategory = FEATURECATEGORY;

export enum THREESIXTYIMAGEUPLOADTYPE {
  exterior360 = "exterior360",
  interior360 = "interior360",
  openDoor360 = "openDoor360",
}

export type ThreeSixtyImageUploadType = THREESIXTYIMAGEUPLOADTYPE;

export enum GALLERYIMAGEUPLOADTYPE {
  frontPassenger = "frontPassenger",
  front = "front",
  frontDriver = "frontDriver",
  driverProfile = "driverProfile",
  rearDriver = "rearDriver",
  rear = "rear",
  rearPassenger = "rearPassenger",
  passengerProfile = "passengerProfile",
  dashBoard = "dashBoard",
  frontDriverCompartment = "frontDriverCompartment",
  steeringWheelAndInstrumentCluster = "steeringWheelAndInstrumentCluster",
  keys = "keys",
  trunkCargo = "trunkCargo",
  radio = "radio",
  driverRearCompartment = "driverRearCompartment",
  shifter = "shifter",
  climateControls = "climateControls",
  driverAccessoryControls = "driverAccessoryControls",
  driverDoorPanel = "driverDoorPanel",
  usbAuxPorts = "usbAuxPorts",
}

export type galleryImageUploadType = GALLERYIMAGEUPLOADTYPE;

export interface Feature {
  _id?: string;
  title: string;
  category?: FeatureCategory;
}

export interface FilterOptionsInterface {
  make?: string[];
  model?: string[];
  body_type?: string[];
  body_style?: string[];
  fuel_type?: string[];
  year_from?: number;
  year_to?: number;
  price_from?: number;
  price_to?: number;
  milleage?: number;
  exterior_color?: string[];
  interior_color?: string[];
  features?: string[];
  transmission?: string[];
  trim?: String[];
  series?: String[];
  packages?: String[];
  vehicle_condition?: string[];
  cylinder_count?: string[];
  mpg_highway?: string;
}
