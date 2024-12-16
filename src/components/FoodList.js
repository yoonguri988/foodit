import { useState } from "react";
import "./FoodList.css";
import FoodForm from "./FoodForm";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function FoodListItem({ item, onDelete, onEdit }) {
  const { imgUrl, title, calorie, content, createdAt } = item;

  const handleDeleteClick = () => onDelete(item.id);
  const handleEditClick = () => onEdit(item.id);

  return (
    <div className="FoodListItem">
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <div>{formatDate(createdAt)}</div>
      <button onClick={handleDeleteClick}>삭제</button>
      <button onClick={handleEditClick}>수정</button>
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
