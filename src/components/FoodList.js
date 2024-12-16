import { useState } from "react";
import FoodForm from "./FoodForm";
import useTranslate from "../hooks/useTranslate";
import "./FoodList.css";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function FoodListItem({ item, onDelete, onEdit }) {
  const t = useTranslate();
  const { imgUrl, title, calorie, content, createdAt } = item;

  const handleDeleteClick = () => onDelete(item.id);
  const handleEditClick = () => onEdit(item.id);

  return (
    <div className="FoodListItem">
      <img className="FoodListItem-preview" src={imgUrl} alt={title} />
      <div className="FoodListItem-rows">
        <div className="FoodListItem-title-calorie">
          <div className="FoodListItem-title">{title}</div>
          <div className="FoodListItem-calorie">{calorie}kcal</div>
        </div>
        <div className="FoodListItem-content">{content}</div>
        <div className="FoodListItem-date-buttons">
          <div className="FoodListItem-date">{formatDate(createdAt)}</div>
          <div className="FoodListItem-buttons">
            <button
              className="FoodListItem-edit-button"
              onClick={handleDeleteClick}
            >
              {t("delete button")}
            </button>
            <button
              className="FoodListItem-delete-button"
              onClick={handleEditClick}
            >
              {t("edit button")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FoodList({ items, onUpdate, onUpdateSuccess, onDelete }) {
  const [editId, setEditId] = useState(null);

  const handleCancel = () => setEditId(null);

  return (
    <ul className="FoodList">
      {items.map((item) => {
        const { id, imgUrl, title, calorie, content } = item;
        const initValues = { id, imgUrl, title, calorie, content };
        if (item.id === editId) {
          const handleSubmit = (formData) => onUpdate(item.id, formData);

          const handleSubmitSuccess = (newItem) => {
            onUpdateSuccess(newItem);
            setEditId(null);
          };
          return (
            <li key={item.id}>
              <FoodForm
                initValues={initValues}
                initPreview={imgUrl}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
                onCancel={handleCancel}
              />
            </li>
          );
        }
        return (
          <li key={item.id}>
            <FoodListItem item={item} onDelete={onDelete} onEdit={setEditId} />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;
