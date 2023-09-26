import { FormEvent, useRef, useState } from "react";
//'div.mb-3>label.form-label+input.form-control'
//div.mb-3>label.form-label+input[type=number].form-control
import { useForm } from "react-hook-form";

const Form = () => {
  const form = useForm();
  console.log(form);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const person = { name: "", age: 0 };
  const [person2, setPerson2] = useState({ name: "", age: "" });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (nameRef.current !== null) person.name = nameRef.current.value;
    if (ageRef.current !== null) person.age = parseInt(ageRef.current.value);
    console.log(person);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          onChange={(event) =>
            setPerson2({ ...person2, name: event.target.value })
          }
          value={person2.name}
          ref={nameRef}
          id="name"
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          onChange={(event) =>
            setPerson2({ ...person2, age: parseInt(event.target.value) })
          }
          value={person2.age}
          ref={ageRef}
          id="age"
          type="number"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
