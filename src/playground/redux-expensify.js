import { createStore, combineReducers } from "redux";
import uuid from "uuid";

const demoState = {
  expenses: [
    {
      id: "1",
      description: "January Rent",
      note: "This is a sample note",
      amount: 5400,
      createdAt: 0
    }
  ],
  filters: {
    text: "rent",
    sortBy: "amount", //amount or date
    startDate: undefined,
    endDate: undefined
  }
};

const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0
} = {}) => {
  return {
    type: "ADD_EXPENSE",
    expense: {
      id: uuid(),
      description,
      note,
      amount,
      createdAt
    }
  };
};

const removeExpense = id => {
  return {
    type: "REMOVE_EXPENSE",
    id: id
  };
};

const editExpense = (id, updates) => {
  return {
    type: "EDIT_EXPENSE",
    id: id,
    updates: updates
  };
};

const setTextFilter = (filterText) => {
  return {
    type : 'SET_FILTER_TEXT',
    text : filterText
  }
}

const sortByDate = () => {
  return {
    type : 'SORT_BY_DATE'
  }
};

const sortByAmount = () => {
  return {
    type : 'SORT_BY_AMOUNT'
  }
};

const setStartDate = (startDate) => {
  return {
    type : 'SET_START_DATE',
    date : startDate
  }
}

const setEndDate = (endDate) => {
  return {
    type : 'SET_END_DATE',
    date : endDate
  }
}

const getVisibleExpenses = (expenses , {text , startDate , endDate , sortBy}) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate != 'number' || expense.createdAt >=startDate;
    const endDateMatch = typeof endDate != 'number' || expense.createdAt <=endDate;
    const textMatch = !text || expense.description.indexOf(text) > -1;
    return startDateMatch && endDateMatch && textMatch;
  }).sort((a,b) => {
    if(sortBy == 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    }
    else {
      return a.amount < b.amount ? 1 : -1;
    }
  })
}

const expenseReducerDefaultState = [];
const filterReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

const expenseReducer = (state = expenseReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(item => {
        return item.id != action.id;
      });
    
    case 'EDIT_EXPENSE' :
      return state.map((expense) => {
        if(expense.id == action.id) {
          return {
            ...expense,
            ...action.updates
          };
        }
        else {
          return expense;
        }
      })
    default:
      return state;
  }
};

const filterReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_FILTER_TEXT' : 
      return {
        ...state,
        text : action.text
      };
    case 'SORT_BY_DATE' :
      return {
        ...state,
        sortBy : 'date'
      };
      case 'SORT_BY_AMOUNT' :
          return {
            ...state,
            sortBy : 'amount'
          };
      case 'SET_START_DATE' :
        return {
          ...state,
          startDate : action.date
        };
        case 'SET_END_DATE' :
        return {
          ...state,
          endDate : action.date
        };

    default:
      return state;
  }
};
const store = createStore(
  combineReducers({
    expenses: expenseReducer,
    filters: filterReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: "rent" , createdAt : 1, amount : 20}));
const expenseTwo = store.dispatch(addExpense({ description: "Coffee", createdAt : 2, amount :10 }));

//store.dispatch(removeExpense(expenseOne.expense.id));

store.dispatch(editExpense(expenseTwo.expense.id , {description : 'Coffee Si'}));
store.dispatch(setTextFilter('e'));
store.dispatch(sortByAmount());

store.dispatch(setStartDate(1));
store.dispatch(setEndDate(2));

console.log(store.getState());