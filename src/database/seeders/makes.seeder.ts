const mongoose = require("mongoose");
const config = require("../../config/index");

const mongoUri = config.mongo.host;
console.log(mongoUri);

const makesData = [
  {
    title: "Acura",
  },
  {
    title: "Audi",
  },
  {
    title: "BMW",
  },
  {
    title: "Buick",
  },
  {
    title: "Cadillac",
  },
  {
    title: "Chevrolet",
  },
  {
    title: "Chrysler",
  },
  {
    title: "Dodge",
  },
  {
    title: "Fiat",
  },
  {
    title: "Ford",
  },
  {
    title: "Genesis",
  },
  {
    title: "GMC",
  },
  {
    title: "Honda",
  },
  {
    title: "Hyundai",
  },
  {
    title: "Infiniti",
  },
  {
    title: "Jaguar",
  },
  {
    title: "Jeep",
  },
  {
    title: "Kia",
  },
  {
    title: "Land Rover",
  },
  {
    title: "Lexus",
  },
  {
    title: "Lincoln",
  },
  {
    title: "Mazda",
  },
  {
    title: "Mercedes-Benz",
  },
  {
    title: "Mercury",
  },
  {
    title: "Mini",
  },
  {
    title: "Mitsubishi",
  },
  {
    title: "Nissan",
  },
  {
    title: "Porsche",
  },
  {
    title: "Ram",
  },
  {
    title: "Scion",
  },
  {
    title: "Smart",
  },
  {
    title: "Subaru",
  },
  {
    title: "Tesla",
  },
  {
    title: "Toyota",
  },
  {
    title: "Volkswagen",
  },
  {
    title: "Volvo",
  },
];

export default makesData;
