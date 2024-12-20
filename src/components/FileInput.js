import "./FileInput.css";
import { useEffect, useRef, useState } from "react";
import placeholderImg from "../assets/preview-placeholder.png";
import resetWhiteImg from "../assets/ic-reset-white.png";

function FileInput({ className, name, value, initPreview, onChange }) {
  const classNames = `FileInput ${className}`;
  const inputRef = useRef();
  const [preview, setPreview] = useState(initPreview);
  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(initPreview);
      URL.revokeObjectURL(value);
    };
  }, [value, initPreview]);

  return (
    <div className={classNames}>
      <img
        className={`FileInput-preview ${preview ? "selected" : ""}`}
        src={preview || placeholderImg}
        alt="이미지 미리보기"
      />
      <input
        className="FileInput-hidden-overlay"
        type="file"
        onChange={handleChange}
        ref={inputRef}
      />
      {value && (
        <button
          className="FileInput-clear-button"
          type="button"
          onClick={handleClearClick}
        >
          <img src={resetWhiteImg} alt="지우기" />
        </button>
      )}
    </div>
  );
}
export default FileInput;
