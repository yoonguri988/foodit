import { useState } from "react";

const INIT = {
  title: "",
  calorie: 0,
  content: "",
};

function FoodForm() {
  const [values, setValues] = useState(INIT);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={values.title} onChange={handleChange} />
      <input
        type="number"
        name="calorie"
        value={values.calorie}
        onChange={handleChange}
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleChange}
      ></textarea>
      <button type="submit">확인</button>
    </form>
  );
}
export default FoodForm;
