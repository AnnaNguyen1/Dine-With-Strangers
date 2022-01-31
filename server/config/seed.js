const db = require("./connection");
const { User, Event } = require("../models");

db.once("open", async () => {
  await Event.deleteMany();

  const events = await Event.insertMany([
    {
      restaurantName: "Foglia di Fico",
      restaurantAddress:
        "585 La Trobe St (Spencer St entrance), Melbourne, Victoria 3000 Australia",
      image:
        "http://www.fogliadifico.com.au/wp-content/uploads/2020/05/Bottega.jpg",
      eventDate: "10/02/2022",
      eventTime: "6pm",
      attendeeLimit: 10,
      state: "VIC",
      attendees: 2,
    },
    {
      restaurantName: "Hochi Mama",
      restaurantAddress:
        "35 Little Bourke St, Melbourne, Victoria 3000 Australia",
      image:
        "https://media-cdn.tripadvisor.com/media/photo-s/1c/b8/c1/6e/bigger-bolder-more-dynamic.jpg",
      eventDate: "12/02/2022",
      eventTime: "7pm",
      attendeeLimit: 6,
      state: "VIC",
      attendees: 3,
    },
    {
      restaurantName: "Lupino Bistro and Bar",
      restaurantAddress:
        "41 Little Collins St, Melbourne, Victoria 3000 Australia",
      image:
        "https://cdn.broadsheet.com.au/cache/b7/cb/b7cb2f9b975fe194ac6c7db05ad2f36c.jpg",
      eventDate: "12/03/2022",
      eventTime: "7pm",
      attendeeLimit: 4,
      state: "VIC",
      attendees: 1,
    },
    {
      restaurantName: "Chocolate Buddha",
      restaurantAddress:
        "Cnr. Flinders & Swanston Street Federation Square, Melbourne, Victoria 3000 Australia",
      image:
        "https://chocolatebuddha.com.au/wp-content/uploads/2020/02/Architecture-2-1024x682.jpg",
      eventDate: "21/03/2022",
      eventTime: "8pm",
      attendeeLimit: 5,
      state: "VIC",
      attendees: 1,
    },
    {
      restaurantName: "Thai Pothong",
      restaurantAddress:
        "U 4 294 King St, Newtown, Sydney, New South Wales 2042 Australia",
      image:
        "https://cdn.concreteplayground.com/content/uploads/2020/10/Thai-Pothong-Newtown-CP-Cassandra-Hannagan-1.jpg",
      eventDate: "14/02/2022",
      eventTime: "6pm",
      attendeeLimit: 4,
      state: "NSW",
      attendees: 1,
    },
    {
      restaurantName: "Social Brew Cafe",
      restaurantAddress:
        "224 Harris St, Sydney, New South Wales 2009 Australia",
      image:
        "https://cdn.concreteplayground.com/content/uploads/2020/10/Thai-Pothong-Newtown-CP-Cassandra-Hannagan-1.jpg",
      eventDate: "12/02/2022",
      eventTime: "6pm",
      attendeeLimit: 4,
      state: "NSW",
      attendees: 1,
    },
  ]);
  console.log("events seeded");

  await User.deleteMany();

  await User.create({
    firstName: "Anna",
    lastName: "Kelly",
    email: "akelly@test.com",
    password: "12345annakelly",
    favourites: [events[5]._id],
    attending: [events[0]._id],
    events: [events[1]._id],
  });

  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamwashington@test.com",
    password: "pamtest123",
    favourites: [events[4]._id],
    attending: [events[1]._id],
    events: [events[0]._id],
  });

  await User.create({
    firstName: "Elijah",
    lastName: "Hold",
    email: "eholt@testmail.com",
    password: "password12345",
    attending: [events[1]._id],
    events: [events[2]._id, events[3]._id, events[4]._id, events[5]._id],
  });
  console.log("users seeded");

  process.exit();
});
