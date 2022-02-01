// import { useReducer } from "react";
import {
  ADD_FAVOURITE,
  REMOVE_FAVOURITE,
  ATTEND_EVENT,
  UNATTEND_EVENT,
} from "./actions";

/**
 * state = {
 *  favourites: [],
 *  attending: []
 * }
 */

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_FAVOURITE: {
      return { ...state, favourites: [...state.favourites, action.payload] };
    }
    case REMOVE_FAVOURITE: {
      return {
        ...state,
        favourites: state.favourites.filter(
          (event) => event._id !== action.payload
        ),
      };
    }
    case ATTEND_EVENT: {
      return { ...state, attending: [...state.attending, action.payload] };
    }
    case UNATTEND_EVENT: {
      return {
        ...state,
        attending: state.attending.filter(
          (event) => event._id !== action.payload
        ),
      };
    }
    default: {
      return state;
    }
  }
};
