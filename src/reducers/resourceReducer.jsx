import {
  ADD_RESOURCE,
  NO_COLLEAGUE,
  SERVICE_FAILURE,
  ADD_EVENTS
} from "../actions/actionTypes";

const INITIAL_STATE = {
  resources: [
    {
      id: "SS07001",
      title: "Test Colleague",
      businessHours: { start: "09:00", end: "16:00" }
    }
  ],
  events: [],
  noColleague: false,
  serviceError: false,
  sortCode: "771712",
  branchView: "Branch"
};

function resourceReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_RESOURCE:
      console.log(
        "inside ResourceReducer --> ADD_RESOURCE" + action.payload.resources
      );

      return {
        ...state,
        resources: action.payload.resources,
        events: action.payload.events ? action.payload.events : [],
        noColleague: false,
        serviceError: false
      };

    case ADD_EVENTS:
      console.log("inside ResourceReducer --> ADD_EVENTS");

      return {
        ...state,
        events: action.payload
      };

    case NO_COLLEAGUE:
      console.log("inside ResourceReducer --> NO_COLLEAGUE");

      return {
        ...state,
        noColleague: true
      };

    case SERVICE_FAILURE:
      console.log("inside ResourceReducer --> SERVICE_FAILURE ");
      return {
        ...state,
        serviceError: true
      };

    default:
      return state;
  }
}

export default resourceReducer;
