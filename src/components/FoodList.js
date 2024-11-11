function FoodListItem({ item }) {
  const { imgUrl, title, calorie, content } = item;

  return (
    <div>
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
    </div>
  );
}

function FoodList({ items }) {
  return (
    <ul>
      {items.map((item) => {
        return <FoodListItem item={item} />;
      })}
    </ul>
  );
}

export default FoodList;
