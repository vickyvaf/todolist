interface LoginState {
  tag: "idle" | "loading" | "loaded" | "error";
  username: string;
  password: string;
}

const loginState: LoginState = {
  tag: "idle",
  username: "",
  password: "",
};

export const loginReducer = (state = loginState, action: any) => {
  switch (state.tag) {
    case "idle": {
      switch (action.type) {
        case "TYPING_USERNAME":
          return {
            ...state,
            username: action.payload.username,
          };
        case "TYPING_PASSWORD":
          return {
            ...state,
            password: action.payload.password,
          };
        case "LOGIN":
          return {
            ...state,
            tag: "loading",
          };
        default: {
          return state;
        }
      }
    }
    case "loading": {
      switch (action.type) {
        case "LOGIN_SUCCESS": {
          return {
            ...state,
            tag: "loaded",
            username: "",
            password: "",
          };
        }
        case "LOGIN_ERROR": {
          return {
            ...state,
            tag: "error",
          };
        }
        default: {
          return state;
        }
      }
    }
    case "loaded": {
      switch (action.type) {
        case "TYPING_USERNAME":
          return {
            ...state,
            username: action.payload.username,
          };
        case "TYPING_PASSWORD":
          return {
            ...state,
            password: action.payload.password,
          };
        case "LOGIN":
          return {
            ...state,
            tag: "loading",
          };
        default: {
          return state;
        }
      }
    }
    case "error": {
      switch (action.type) {
        case "TYPING_USERNAME":
          return {
            ...state,
            tag: "idle",
            username: action.payload.username,
          };
        case "TYPING_PASSWORD":
          return {
            ...state,
            tag: "idle",
            password: action.payload.password,
          };
        case "LOGIN":
          return {
            ...state,
            tag: "loading",
          };
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
