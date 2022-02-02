export const getSavedFavourites = () => {
  const savedFavouritesIds = localStorage.getItem("saved_favourites")
    ? JSON.parse(localStorage.getItem("saved_favourites"))
    : [];
  return savedFavouritesIds;
};

export const saveFavouritesIds = (favIdArr) => {
  if (favIdArr.length) {
    localStorage.setItem("saved_favourites", JSON.stringify(favIdArr));
  } else {
    localStorage.removeItem("saved_favourites");
  }
};

export const removeFavouritesId = (eventId) => {
  const saveFavouritesIds = localStorage.getItem("saved_favourites")
    ? JSON.parse(localStorage.getItem("saved_favourites"))
    : null;

  if (!saveFavouritesIds) {
    return false;
  }

  const updatedFavouritesIds = saveFavouritesIds?.filter(
    (saveFavouritesId) => saveFavouritesId !== eventId
  );
  localStorage.setItem(
    "saved_favourites",
    JSON.stringify(updatedFavouritesIds)
  );

  return true;
};

// ----------------------------------------------

export const getSavedAttendingIds = () => {
  const savedAttendingIds = localStorage.getItem("saved_attendings")
    ? JSON.parse(localStorage.getItem("saved_attendings"))
    : [];
  return savedAttendingIds;
};

export const saveAttendingIds = (attendIdArr) => {
  if (attendIdArr.length) {
    localStorage.setItem("saved_attendings", JSON.stringify(attendIdArr));
  } else {
    localStorage.removeItem("saved_attendings");
  }
};

export const removeAttendingId = (eventId) => {
  const saveAttendingIds = localStorage.getItem("saved_attendings")
    ? JSON.parse(localStorage.getItem("saved_attendings"))
    : null;

  if (!saveAttendingIds) {
    return false;
  }

  const updatedAttendingIds = saveAttendingIds?.filter(
    (saveAttendingId) => saveAttendingId !== eventId
  );
  localStorage.setItem("saved_attendings", JSON.stringify(updatedAttendingIds));

  return true;
};
