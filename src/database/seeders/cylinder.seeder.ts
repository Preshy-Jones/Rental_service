// [{name: "0", displayName: "0", count: 376, urlSegment: "cylinders-0", selected: false,…},…]
// 0
// :
// {name: "0", displayName: "0", count: 376, urlSegment: "cylinders-0", selected: false,…}
// 1
// :
// {name: "12", displayName: "12", count: 2, urlSegment: "cylinders-12", selected: false,…}
// 2
// :
// {name: "2", displayName: "2", count: 3, urlSegment: "cylinders-2", selected: false, removeSegments: []}
// 3
// :
// {name: "3", displayName: "3", count: 339, urlSegment: "cylinders-3", selected: false,…}
// 4
// :
// {name: "4", displayName: "4", count: 22556, urlSegment: "cylinders-4", selected: false,…}
// 5
// :
// {name: "5", displayName: "5", count: 98, urlSegment: "cylinders-5", selected: false,…}
// 6
// :
// {name: "6", displayName: "6", count: 9274, urlSegment: "cylinders-6", selected: false,…}
// 7
// :
// {name: "8", displayName: "8", count: 2634, urlSegment: "cylinders-8", selected: false,…}

import { faker } from "@faker-js/faker";

const cylinderData = ["0", "12", "2", "3", "4", "5", "6", "8"];

let hello =faker.datatype.number({ min: 1, max: 8 });


console.log(hello);
