console.log("hello from redux");

import { createStore } from "redux";

const defaultState = { count: 0 };

const decrementBy = ({ decrementBy = 1 } = {}) => {
  return {
    type: "DECREMENT",
    decrementBy: decrementBy
  };
};

const incrementBy = ({ incrementBy = 1 } = {}) => {
  return {
    type: "INCREMENT",
    incrementBy: incrementBy
  };
};

const resetActiom = () => {
  return store.dispatch({
    type: "RESET"
  });
};

const store = createStore((state = defaultState, action) => {
  switch (action.type) {
    case "INCREMENT":
      const incrementBy =
        typeof action.incrementBy === "number" ? action.incrementBy : 1;
      return { count: state.count + incrementBy };
    case "RESET":
      return { count: 0 };

    case "DECREMENT":
      const decrementBy =
        typeof action.decrementBy === "number" ? action.decrementBy : 1;
      return { count: state.count - decrementBy };
    default:
      return state;
  }
});

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementBy({ incrementBy: 5 }));

store.dispatch(decrementBy({ decrementBy: 10 }));

console.log('Call reset action');
resetActiom();

const book = {
  name: "Shogun",
  author: "James Cladell",
  publisher: {
    name: "Sea of Japan"
  }
};

const { name: publisherName = "Self Published" } = book.publisher;

console.log(publisherName);

const menu = ["Coffee (Hot)", 2.5, 2, 1];

const [item, , smallCoffee] = menu;

console.log(item);
console.log(smallCoffee);
