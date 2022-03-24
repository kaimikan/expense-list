import moment from "moment";

export default [
  {
    id: "1",
    description: "Pizza",
    note: "",
    amount: 399000,
    createdAt: moment(0).add(4, "days").valueOf()
  },
  {
    id: "2",
    description: "Chicken",
    note: "",
    amount: 599,
    createdAt: moment(0).subtract(4, "days").valueOf()
  },
  {
    id: "3",
    description: "Oats",
    note: "",
    amount: 150,
    createdAt: 0
  }
];
