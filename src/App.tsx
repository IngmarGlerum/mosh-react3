import "./App.css";
// import Form from "./Form";
// import ExpenseForm from "./ExpenseForm";

import ExpenseList, { Expense } from "./expense-tracker/components/ExpenseList";
import { useState } from "react";
import ExpenseList2 from "./expense-tracker/components/ExpenseList2";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm2 from "./expense-tracker/components/ExpenseForm2";
import categories from "./categories";
import App2 from "./App2";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Utilities" },
    { id: 2, description: "bbb", amount: 15, category: "Groceries" },
    { id: 3, description: "ccc", amount: 18, category: "Entertainment" },
    { id: 4, description: "ddd", amount: 20, category: "Utilities" },
  ]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  return (
    <>
      <div className="main">
        <App2 />
        <div className="mb-5">
          <ExpenseForm2
            onSubmit={(expense) =>
              setExpenses([
                ...expenses,
                { ...expense, id: expenses.length + 1 },
              ])
            }
          />
        </div>
        <div className="mb-3">
          <ExpenseFilter
            onSelectCategory={(category) => setSelectedCategory(category)}
          />
        </div>
        {/* <Form /> */}
        {/* <ExpenseForm addExpense={addExpense} nextID={highestNumber.id} /> */}
        <ExpenseList2
          expenses={visibleExpenses}
          onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
        />
      </div>
    </>
  );
}

export default App;
