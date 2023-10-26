import BodyType from "../database/models/body_type";
import Car from "../database/models/car";
import Make from "../database/models/make";
import Model from "../database/models/model";
import { faker } from "@faker-js/faker";
import moment from "moment";
import Feature from "../database/models/feature";
import { colorsData } from "../database/seeders/colour.seeder";
import Transmission from "../database/models/transmission";
import DriveType from "../database/models/drive_type";
import FuelType from "../database/models/fuel_type";
import Package from "../database/models/package";
import BodyStyle from "../database/models/body_style";
import Series from "../database/models/series";
import Trim from "../database/models/trim";

const seedCars = async () => {
  //  return faker.word.adjective();
  //fetch all makes
  const makes = await Make.find();
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
  const vehicleConditions = ["local_used", "foreign_used", "brand_new"];
  const features = await Feature.find({});
  let featureIds = features.map((feature) => feature._id);
  const carFeatures = [];

  const baseUrl =
    "https://dunecar.s3.eu-west-2.amazonaws.com/samplecar/Gallery/";

  const mediaPayload = {
    gallery: {
      frontPassenger: baseUrl + "frontPassenger" +".webp",
      front: baseUrl + "front" +".webp",
      frontDriver: baseUrl + "frontDriver" +".webp",
      driverProfile: baseUrl + "driverProfile" +".webp",
      rearDriver: baseUrl + "rearDriver" +".webp",
      rear: baseUrl + "rear" +".webp",
      rearPassenger: baseUrl + "rearPassenger" +".webp",
      passengerProfile: baseUrl + "passengerProfile" +".webp",
      dashBoard: baseUrl + "dashboard" +".webp",
      frontDriverCompartment: baseUrl + "frontDriverCompartment" +".webp",
      steeringWheelAndInstrumentCluster:
        baseUrl + "steeringWheelAndInstrumentCluster" +".webp",
      keys: baseUrl + "keys" +".webp",
      trunkCargo: baseUrl + "trunkcargo" +".webp",
      radio: baseUrl + "radio" +".webp",
      driverRearCompartment: baseUrl + "driverRearCompartment" +".webp",
      shifter: baseUrl + "shifter" +".webp",
      climateControls: baseUrl + "climateControls" +".webp",
      driverAccessoryControls: baseUrl + "driverAccessoryControls" +".webp",
      driverDoorPanel: baseUrl + "driverDoorPanel" +".webp",
      usbAuxPorts: baseUrl + "usbAuxPorts" +".webp",
      engine: baseUrl + "engine" +".webp",
    },
    exterior360:
      "https://dunecar.s3.eu-west-2.amazonaws.com/samplecar/exterior360",
    interior360:
      "https://dunecar.s3.eu-west-2.amazonaws.com/samplecar/interior360/interior.jpg",
    openDoor360:
      "https://dunecar.s3.eu-west-2.amazonaws.com/samplecar/exterior360",
  };

  const transmissions = await Transmission.find({});
  const driveTypes = await DriveType.find({});

  const booleans = [true, false];

  for (let i = 0; i < featureIds.length; i++) {
    const randomBoolean = booleans[Math.floor(Math.random() * booleans.length)];
    let featureId = featureIds[i];

    carFeatures.push({
      feature_id: featureId,
      installedUpgrade: randomBoolean,
    });
  }

  let packagesData = await Package.find({});
  let packageIds = packagesData.map((packageData) => packageData._id);

  let bodyTypes = await BodyType.find({});
  let fuelTypes = await FuelType.find({});
  let bodyStyles = await BodyStyle.find({});
  let trims = await Trim.find({});
  let series = await Series.find({});

  //select random Make
  for (let i = 0; i < 20; i++) {
    const randomMake = makes[Math.floor(Math.random() * makes.length)];
    const randomTransmission =
      transmissions[Math.floor(Math.random() * transmissions.length)];
    const randomPrice = faker.commerce.price(10000, 1000000, 0);
    const randomMileage = faker.commerce.price(1000, 200000, 0);
    const randomEngine = faker.commerce.price(1000, 2000, 0);
    const randomColour1 =
      colorsData[Math.floor(Math.random() * colorsData.length)];

    const randomColour2 =
      colorsData[Math.floor(Math.random() * colorsData.length)];
    const randomDriveType =
      driveTypes[Math.floor(Math.random() * driveTypes.length)];
    const models = await Model.find({
      make_id: randomMake._id,
    });

    const randomVehicleCondition =
      vehicleConditions[Math.floor(Math.random() * vehicleConditions.length)];
    const randomBodyTypeId =
      bodyTypes[Math.floor(Math.random() * bodyTypes.length)]._id;
    const randomTrimId = trims[Math.floor(Math.random() * trims.length)]._id;
    const randomFuelTypeId =
      fuelTypes[Math.floor(Math.random() * fuelTypes.length)]._id;
    const randomBodyStyleId =
      bodyStyles[Math.floor(Math.random() * bodyStyles.length)]._id;
    const randomSeriesId =
      series[Math.floor(Math.random() * series.length)]._id;
    const randomModel = models[Math.floor(Math.random() * models.length)];

    const randomYear = years[Math.floor(Math.random() * years.length)];
    const randomDate = moment(
      faker.date.between("2015-01-01", "2022-12-31")
    ).format("MMM YYYY");

    const randomRegistrationNumber = faker.random.alphaNumeric(10, {
      casing: "upper",
    });

    const locations = [
      "Lagos",
      "Abuja",
      "Port Harcourt",
      "Ibadan",
      "Kano",
      "Akure",
      "Ibadan",
      "Jos",
      "Owerri",
      "Enugu",
      "Benin",
      "Aba",
      "Kaduna",
      "Uyo",
      "Ilorin",
      "Abeokuta",
      "Onitsha",
      "Sokoto",
      "Katsina",
      "Maiduguri",
      "Zaria",
      "Ogbomosho",
      "Iwo",
      "Ife",
      "Ilesha",
      "Ila Orangun",
      "Ikerre",
    ];
    const randomLocation =
      locations[Math.floor(Math.random() * locations.length)];
    if (randomModel) {
      const carPayload = {
        make_id: randomMake._id,
        model_id: randomModel._id,
        title: `${randomYear} ${randomMake.title} ${randomModel.title}`,
        year: randomYear,
        location: randomLocation,
        body_type_id: randomBodyTypeId,
        fuel_type_id: randomFuelTypeId,
        packages_id: packageIds,
        registration: {
          registration_number: randomRegistrationNumber,
          date: randomDate,
        },
        carFeatures: carFeatures,
        interior_color: randomColour1,
        exterior_color: randomColour2,
        mileage: randomMileage,
        price: randomPrice,
        drive_type_id: randomDriveType._id,
        transmission_id: randomTransmission._id,
        engine: {
          value: randomEngine,
          unit: "L",
        },
        seats: faker.datatype.number({ min: 1, max: 8 }),
        vin_number: faker.random.alphaNumeric(17, { casing: "upper" }),
        previous_owners: faker.datatype.number({ min: 1, max: 5 }),
        number_of_keys: faker.datatype.number({ min: 1, max: 6 }),
        performance: {
          torque: {
            value: faker.datatype.number({ min: 100, max: 1000 }),
            unit: "torque",
            rpm: faker.datatype.number({ min: 1000, max: 5000 }),
          },
          fuel_capacity: {
            value: faker.datatype.number({ min: 10, max: 100 }),
            unit: "gal",
            rpm: faker.datatype.number({ min: 1000, max: 5000 }),
          },
          horsePower: {
            value: faker.datatype.number({ min: 100, max: 1000 }),
            unit: "horsePower",
            rpm: faker.datatype.number({ min: 1000, max: 5000 }),
          },
        },
        measurement: {
          dimensions: {
            length: faker.datatype.number({ min: 100, max: 300 }),
            width: faker.datatype.number({ min: 100, max: 300 }),
            height: faker.datatype.number({ min: 100, max: 300 }),
            unit: "in",
          },
          wheelBase: {
            value: faker.datatype.number({ min: 100, max: 300 }),
            unit: "in",
          },
          frontTireSize: faker.random.alphaNumeric(7, {
            casing: "upper",
          }),
          driverLegRoom: {
            value: faker.datatype.number({ min: 100, max: 300 }),
            unit: "in",
          },
          driverHeadRoom: {
            value: faker.datatype.number({ min: 100, max: 300 }),
            unit: "in",
          },
          curbWeight: {
            value: faker.datatype.number({ min: 100, max: 300 }),
            unit: "lbs",
          },
        },
        cylinder_count: faker.datatype.number({ min: 1, max: 12 }),
        mpg_highway: faker.datatype.number({
          min: 10,
          max: 100,
          precision: 10,
        }),
        series_id: randomSeriesId,
        body_style_id: randomBodyStyleId,
        vehicle_condition: randomVehicleCondition,
        trim_id: randomTrimId,
        // media: mediaPayload,
      };

      const car = await Car.create(carPayload);
    }
  }
};

export default seedCars;
