import "./FoodForm.css";
import { useState } from "react";
import FileInput from "./FileInput";
import useAsync from "../hooks/useAsync";
import useTranslate from "../hooks/useTranslate";

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
  const [isSubmit, submitErr, onSubmitAsync] = useAsync(onSubmit);
  // const [isLoading, setIsLoading] = useState(false);
  // const [submittingErr, setSubmittingErr] = useState(null);

  const t = useTranslate();

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

    const result = await onSubmitAsync(formData);
    if (!result) return;

    const { food } = result;
    onSubmitSuccess(food);
    setValues(INIT);
  };

  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <FileInput
        className="FoodForm-preview"
        name="imgFile"
        value={values.imgFile}
        initPreview={initPreview}
        onChange={handleChange}
      />
      <div className="FoodForm-rows">
        <div className="FoodForm-title-calorie">
          <input
            className="FoodForm-title"
            name="title"
            placeholder={t("title placeholder")}
            value={values.title}
            onChange={handleInputChange}
          />
          <input
            type="number"
            className="FoodForm-calorie"
            name="calorie"
            placeholder={t("calorie placeholder")}
            value={values.calorie}
            onChange={handleInputChange}
          />
          <button
            className="FoodForm-submit-button"
            disabled={isSubmit}
            type="submit"
          >
            {t("confirm button")}
          </button>
        </div>
        <textarea
          className="FoodForm-content"
          name="content"
          value={values.content}
          onChange={handleInputChange}
        ></textarea>
        {onCancel && (
          <button className="FoodForm-cancel-button" onClick={onCancel}>
            {t("cancel button")}
          </button>
        )}
        {submitErr?.message && <span>{submitErr.message}</span>}
      </div>
    </form>
  );
}
export default FoodForm;
