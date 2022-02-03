const db = require("./connection");
const { User, Event } = require("../models");

db.once("open", async () => {
  await User.deleteMany();

  const user = await User.create({
    firstName: "Anna",
    lastName: "Nguyen",
    email: "annatest@test.com",
    password: "annatest",
  });
  console.log("users seeded");
  console.log(user);

  await Event.deleteMany();

  const events = await Event.insertMany([
    {
      restaurantName: "Foglia di Fico",
      restaurantAddress:
        "585 La Trobe St (Spencer St entrance), Melbourne, Victoria 3000 Australia",
      image:
        "http://www.fogliadifico.com.au/wp-content/uploads/2020/05/Bottega.jpg",
      eventDate: "11/11/2022T12:00:00:000Z",
      description: "Some great Italian Food to ease the wrecking soul",
      attendeeLimit: "5",
      userId: user._id,
    },
    {
      restaurantName: "Hochi Mama",
      restaurantAddress:
        "35 Little Bourke St, Melbourne, Victoria 3000 Australia",
      image:
        "https://media-cdn.tripadvisor.com/media/photo-s/1c/b8/c1/6e/bigger-bolder-more-dynamic.jpg",
      eventDate: "11/11/2022T12:00:00:000Z",
      description: "Who wouldn't love some Vietnamese food, or vietnamese ppl",
      attendeeLimit: "6",
      userId: user._id,
    },
    {
      restaurantName: "Lupino Bistro and Bar",
      restaurantAddress:
        "41 Little Collins St, Melbourne, Victoria 3000 Australia",
      image:
        "https://cdn.broadsheet.com.au/cache/b7/cb/b7cb2f9b975fe194ac6c7db05ad2f36c.jpg",
      eventDate: "11/11/2022T12:00:00:000Z",
      description: "Fine dining at it's best!",
      attendeeLimit: "4",
      userId: user._id,
    },
  ]);
  console.log("events seeded");
  console.log(events[0]._id);

  const updatedUser = await User.create({
    firstName: "Anna",
    lastName: "Nguyen",
    email: "annatest1@test.com",
    password: "annatest1",
    favourites: [events[0]],
    attending: [events[1], events[2]],
  });
  console.log(updatedUser);

  process.exit();
});
