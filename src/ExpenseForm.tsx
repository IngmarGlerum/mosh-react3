//'div.mb-3>label.form-label+input.form-control'
//div.mb-3>label.form-label+input[type=number].form-control

import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { Expense } from "./expense-tracker/components/ExpenseList";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "The description must be at least 3 characters." }),
  // amount: z.number().min(0.01).max(100_000),
  category: z.enum(["Groceries", "Utilities", "Entertainment"] as const),
});

type FormData = z.infer<typeof schema>;

interface Props {
  addExpense: (newExpense: Expense) => void;
  nextID: number;
}

const ExpenseForm = ({ addExpense, nextID }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [selectedCategory, setSelectedCategory] = useState("initial state");

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
  };

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  const onSubmit = (data: FieldValues) => {
    const newExpense = {
      id: nextID + 1,
      description: data.description,
      amount: parseFloat(data.amount),
      category: data.category,
    };
    addExpense(newExpense);
    console.log(newExpense);
  };

  const handleChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Amount
        </label>
        <input
          onChange={handleChange}
          {...register("amount")}
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Categorie
        </label>
        <select
          {...register("category")}
          id="category"
          value={selectedCategory}
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
        >
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <button className="btn btn-primary" type="submit">
          submit
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
