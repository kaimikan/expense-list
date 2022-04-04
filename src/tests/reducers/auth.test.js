import authReducer from "../../reducers/auth";

test("should set user id for login", () => {
  const action = {
    type: "LOG_IN",
    uid: "asd123"
  };
  const state = authReducer({}, action);
  expect(state.uid).toBe(action.uid);
});

test("should clear user id for logout", () => {
  const action = {
    type: "LOG_OUT"
  };
  const state = authReducer({ uid: "something" }, action);
  expect(state).toEqual({});
});
