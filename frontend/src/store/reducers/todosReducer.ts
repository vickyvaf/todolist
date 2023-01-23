const todosState = {
  tag: "idle",
  todos: [],
  errorMessage: "",
};

export const todosReducer = (state = todosState, action: any) => {
  switch (state.tag) {
    case "idle": {
      switch (action.type) {
        case "FETCH": {
          return {
            ...state,
            tag: "loading",
          };
        }
        default: {
          return state;
        }
      }
    }
    case "loading": {
      switch (action.type) {
        case "FETCH_SUCCESS": {
          return {
            ...state,
            tag: "loaded",
            todos: action.payload.todos,
            errorMessage: "",
          };
        }
        case "FETCH_EMPTY": {
          return {
            ...state,
            tag: "empty",
            todos: [],
            errorMessage: "",
          };
        }
        case "FETCH_ERROR": {
          return {
            ...state,
            tag: "error",
            todos: [],
            errorMessage: action.payload.errorMessage,
          };
        }
        default: {
          return state;
        }
      }
    }
    default: {
      return state;
    }
  }
};
