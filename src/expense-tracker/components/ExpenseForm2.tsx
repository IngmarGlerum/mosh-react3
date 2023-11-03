import { z } from "zod";
import categories from "../../categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be at least three character." })
    .max(50),
  amount: z
    .number({ invalid_type_error: "Amount is required." })
    .min(0.01)
    .max(100_000),
  // category: z.enum(categories),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required." }),
  }),
});

// type ExpenseFormData = z.infer<typeof schema>;
interface ExpenseFormData {
  description: string;
  amount: number;
  category: string;
}

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm2 = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  const handleCategoryChange = (e: { target: { value: any } }) => {
    console.log(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
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
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          {...register("category")}
          id="category"
          className="form-select"
          onChange={handleCategoryChange}
        >
          <option value="" key=""></option>
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ExpenseForm2;
