import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { createFood, updateFood, getFoods, deleteFood } from "../api";
import FoodList from "./FoodList";
import FoodForm from "./FoodForm";
import useAsync from "../hooks/useAsync";
import LocaleSelect from "./LocaleSelect";
import { LocaleProvider } from "../contexts/LocaleContext";

function App() {
  const [order, setOrder] = useState("createdAt");
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  // 네트워크
  const [pending, error, getFoodsAsync] = useAsync(getFoods);
  // const [isLoading, setIsLoading] = useState(false);
  // const [loadingErr, setLoadingErr] = useState(null);
  // 검색
  const [search, setSearch] = useState("");

  const handleNewestClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target["search"].value);
  };

  const handleDelete = async (id) => {
    const result = await deleteFood(id);
    if (!result) return;

    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = useCallback(
    async (options) => {
      const result = await getFoodsAsync(options);
      if (!result) return;
      const {
        foods,
        paging: { nextCursor },
      } = result;
      if (!options.cursor) setItems(foods);
      else setItems((prevItem) => [...prevItem, ...foods]);
      setCursor(nextCursor);
    },
    [getFoodsAsync]
  );

  const handleLoadMore = () => {
    handleLoad({ order, cursor, search });
  };

  const handleCreateSuccess = (food) => {
    setItems((prevItems) => [food, ...prevItems]);
  };

  const handleUpdateSuccess = (newItem) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === newItem.id);
      return [
        ...prevItems.slice(0, splitIdx),
        newItem,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad({ order, search });
  }, [order, search, handleLoad]);

  return (
    <LocaleProvider defValue="ko">
      <div>
        <LocaleSelect />
        <FoodForm onSubmit={createFood} onSubmitSuccess={handleCreateSuccess} />
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleCalorieClick}>칼로리순</button>
        <form onSubmit={handleSearchSubmit}>
          <input name="search" />
          <button type="submit">검색</button>
        </form>
        <FoodList
          items={items}
          onUpdate={updateFood}
          onUpdateSuccess={handleUpdateSuccess}
          onDelete={handleDelete}
        />
        {cursor && (
          <button disabled={pending} onClick={handleLoadMore}>
            더 보기
          </button>
        )}
        {error?.message && <p>{error.message}</p>}
      </div>
    </LocaleProvider>
  );
}

export default App;
