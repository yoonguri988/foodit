import "./App.css";
import { useEffect, useState } from "react";
import { getFoods } from "../api";
import FoodList from "./FoodList";

function App() {
  const [order, setOrder] = useState("createdAt");
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  // 네트워크
  const [isLoading, setIsLoading] = useState(false);
  const [loadingErr, setLoadingErr] = useState(null);

  const handleNewestClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      result = await getFoods(options);
    } catch (e) {
      setLoadingErr(e);
      return;
    } finally {
      setIsLoading(false);
    }
    const {
      foods,
      paging: { nextCursor },
    } = result;
    if (!options.cursor) setItems(foods);
    else setItems((prevItem) => [...prevItem, ...foods]);
    setCursor(nextCursor);
  };

  const handleLoadMore = () => {
    handleLoad({ order, cursor });
  };

  useEffect(() => {
    handleLoad({ order });
  }, [order]);

  return (
    <div className="App">
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <FoodList items={items} onDelete={handleDelete} />
      {cursor && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {loadingErr?.message && <p>{loadingErr.message}</p>}
    </div>
  );
}

export default App;
