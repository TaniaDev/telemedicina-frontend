const now = new Date();

export default [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2022, 5, 11),
    end: new Date(2022, 5, 11)
  },
  {
    id: 1,
    title: "Dermatologista",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3))
  },
  {
    id: 2,
    title: "XXT",
    start: now,
    end: now
  },
  {
    id: 3,
    title: "Go to the gym",
    start: new Date(2022, 5, 12, 18, 30, 0),
    end: new Date(2022, 5, 12, 20, 0, 0)
  }
];
