import { useState } from "react";
import FileInput from "./FileInput";

const INIT = {
  imgFile: "",
  title: "",
  calorie: 0,
  content: "",
};

function sanitize(type, value) {
  switch (type) {
    case "number":
      return Number(value) || 0;

    default:
      return value;
  }
}

function FoodForm({
  initValues = INIT,
  initPreview = "",
  onSubmit,
  onSubmitSuccess,
  onCancel,
}) {
  const [values, setValues] = useState(initValues);
  // 로딩과 에러 처리
  const [isLoading, setIsLoading] = useState(false);
  const [submittingErr, setSubmittingErr] = useState(null);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, sanitize(type, value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imgFile", values.imgFile);
    formData.append("title", values.title);
    formData.append("calorie", values.calorie);
    formData.append("content", values.content);
    let result;
    try {
      setIsLoading(true);
      setSubmittingErr(null);
      result = await onSubmit(formData);
    } catch (e) {
      setSubmittingErr(e);
      return;
    } finally {
      setIsLoading(false);
    }
    const { food } = result;
    onSubmitSuccess(food);
    setValues(INIT);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        initPreview={initPreview}
        onChange={handleChange}
      />
      <input name="title" value={values.title} onChange={handleInputChange} />
      <input
        type="number"
        name="calorie"
        value={values.calorie}
        onChange={handleInputChange}
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      ></textarea>
      <button disabled={isLoading} type="submit">
        확인
      </button>
      {onCancel && <button onClick={onCancel}>취소</button>}
      {submittingErr?.message && <span>{submittingErr.message}</span>}
    </form>
  );
}
export default FoodForm;
