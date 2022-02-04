const db = require("./connection");
const { User, Event } = require("../models");

db.once("open", async () => {
  await User.deleteMany();

  const user = await User.create({
    firstName: "Anna",
    lastName: "Nguyen",
    email: "annatest1@test.com",
    password: "annatest1",
  });
  console.log("user seeded");

  await Event.deleteMany();

  const events = await Event.insertMany([
    {
      restaurantName: "Foglia di Fico",
      restaurantAddress:
        "585 La Trobe St (Spencer St entrance), Melbourne, Victoria 3000 Australia",
      image:
        "http://www.fogliadifico.com.au/wp-content/uploads/2020/05/Bottega.jpg",
      eventDate: "2022-02-17T19:15",
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
      eventDate: "2022-02-12T22:30",
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
      eventDate: "2022-02-19T18:30",
      description: "Fine dining at it's best!",
      attendeeLimit: "4",
      userId: user._id,
    },
  ]);
  console.log("events seeded");

  const updatedUser = await User.create({
    firstName: "Anna",
    lastName: "Nguyen",
    email: "annatest@test.com",
    password: "annatest",
    favourites: [events[0]],
    attending: [events[1], events[2]],
  });
  console.log("second user seeded");

  const moreEvents = await Event.insertMany([
    {
      restaurantName: "Chocolate Buddha",
      restaurantAddress:
        "Federation Square, Swanston St & Flinders St, Melbourne VIC 3000",
      image:
        "https://chocolatebuddha.com.au/wp-content/uploads/2020/02/Architecture-2-1024x682.jpg",
      eventDate: "2022-02-17T19:15",
      description:
        "There is a very good green tea creme brulee that I want to try. Would anyone like to join me?",
      attendeeLimit: "5",
      userId: updatedUser._id,
    },
    {
      restaurantName: "Hungry Jacks Bourke Street",
      restaurantAddress: "180 Bourke St, Melbourne VIC 3000",
      image:
        "https://www.hungryjacks.com.au/Upload/HJ/Media/Menu/product/Main/WEB_800x600_ALC_10.png",
      eventDate: "2022-02-12T00:30",
      description:
        "Who wouldn't want to share some dirty burgers after a night out?!",
      attendeeLimit: "6",
      userId: updatedUser._id,
    },
  ]);
  console.log("second user events seeded");
  process.exit();
});
