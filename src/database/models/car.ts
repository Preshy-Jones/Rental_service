import mongoose from "mongoose";
import { nanoid } from "nanoid";

const { Schema } = mongoose;

const performanceSchema = new Schema({
  fuel_capacity: {
    value: {
      type: Number,
    },
    unit: {
      type: String,
    },
  },
  horsePower: {
    value: {
      type: Number,
    },
    unit: {
      type: String,
    },
    rpm: {
      type: String,
    },
  },
  torque: {
    value: {
      type: Number,
    },
    unit: {
      type: String,
    },
    rpm: {
      type: String,
    },
  },
});

const measurementSchema = new Schema({
  dimensions: {
    length: {
      type: String,
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
    unit: {
      type: String,
    },
  },
  wheelBase: {
    value: {
      type: String,
    },
    unit: {
      type: String,
    },
  },
  frontTireSize: {
    type: String,
  },
  driverLegRoom: {
    value: {
      type: String,
    },
    unit: {
      type: String,
    },
  },
  driverHeadRoom: {
    value: {
      type: String,
    },
    unit: {
      type: String,
    },
  },
  curbWeight: {
    value: {
      type: String,
    },
    unit: {
      type: String,
    },
  },
});
const gallerySchema = new Schema({
  frontPassenger: {
    type: String,
  },
  front: {
    type: String,
  },
  frontDriver: {
    type: String,
  },
  driverProfile: {
    type: String,
  },
  rearDriver: {
    type: String,
  },
  rear: {
    type: String,
  },
  rearPassenger: {
    type: String,
  },
  passengerProfile: {
    type: String,
  },
  dashBoard: {
    type: String,
  },
  frontDriverCompartment: {
    type: String,
  },
  steeringWheelAndInstrumentCluster: {
    type: String,
  },
  keys: {
    type: String,
  },
  trunkCargo: {
    type: String,
  },
  radio: {
    type: String,
  },
  driverRearCompartment: {
    type: String,
  },
  shifter: {
    type: String,
  },
  climateControls: {
    type: String,
  },
  driverAccessoryControls: {
    type: String,
  },
  driverDoorPanel: {
    type: String,
  },
  usbAuxPorts: {
    type: String,
  },
});
const mediaSchema = new Schema({
  gallery: gallerySchema,
  exterior360: {
    type: String,
  },
  interior360: {
    type: String,
  },
  openDoor360: {
    type: String,
  },
  engine: {
    type: String,
  },
});

const singleMediaSchema = new Schema({
  media_url: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  fileType: {
    type: String,
    enum: ["image", "360", "video"],
  },
  fileExtension: {
    type: String,
  },
});

const singleImperfectionSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  referenceImage: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  tagPoint: [
    {
      type: [Number],
    },
  ],
});
const carFeatureSchema = new Schema({
  feature_id: {
    type: String,
    required: true,
  },
  installedUpgrade: {
    type: Boolean,
    required: true,
  },
});
const carSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },

    title: {
      type: String,
      required: true,
    },
    make_id: {
      type: String,
      ref: "Make",
    },
    year: {
      type: Number,
      required: true,
    },
    vehicle_condition: {
      type: String,
      enum: ["local_used", "foreign_used", "brand_new"],
    },
    model_id: {
      type: String,
      ref: "Model",
    },
    merchant_id: {
      type: String,
    },
    series_id: {
      type: String,
    },
    trim_id: {
      type: String,
    },
    registration: {
      date: {
        type: Date,
      },
      registration_number: {
        type: String,
      },
    },
    body_type_id: {
      type: String,
    },
    body_style_id: {
      type: String,
    },
    fuel_type_id: {
      type: String,
    },
    milleage: {
      value: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    carFeatures: [carFeatureSchema],
    transmission_id: {
      type: String,
    },
    cylinder_count: {
      type: String,
    },
    images_id: [
      {
        type: String,
      },
    ],
    packages_id: [
      {
        type: String,
      },
    ],

    // location: {
    //   type: {
    //     type: String,
    //   },
    //   coordinates: {
    //     type: [Number],
    //   },
    // },

    engine: {
      value: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
    vin_number: {
      type: String,
    },
    location: {
      type: String,
    },
    interior_color: {
      type: String,
    },
    exterior_color: {
      type: String,
    },
    previous_owners: {
      type: Number,
    },
    number_of_keys: {
      type: Number,
    },
    litres: {
      type: Number,
    },
    mpg_highway: {
      type: Number,
    },
    drive_type_id: {
      type: String,
    },
    distance: {
      type: String,
    },
    shipping_fee: {
      type: String,
    },

    mileage: {
      type: Number,
    },
    seats: {
      type: Number,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    hasWarranty: {
      type: Boolean,
    },
    imperfections: [singleImperfectionSchema],
    performance: performanceSchema,
    measurement: measurementSchema,
    media: mediaSchema,
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
