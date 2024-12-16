import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { createFood, updateFood, getFoods, deleteFood } from "../api";
import FoodList from "./FoodList";
import FoodForm from "./FoodForm";
import useAsync from "../hooks/useAsync";
import LocaleSelect from "./LocaleSelect";
import useTranslate from "../hooks/useTranslate";

import bgImg from "../assets/background.png";
import logoImg from "../assets/logo.png";
import logoTextImg from "../assets/logo-text.png";
import searchImg from "../assets/ic-search.png";
import AppSortButton from "./AppSortButton";

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

  const t = useTranslate();

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
  const sortedItems = items.sort((a, b) => b[order] - a[order]);
  useEffect(() => {
    handleLoad({ order, search });
  }, [order, search, handleLoad]);

  return (
    <div className="App" style={{ backgroundImage: `url("${bgImg}")` }}>
      <div className="App-nav">
        <img src={logoImg} alt="logo" />
      </div>
      <div className="App-container">
        <div className="App-FoodForm">
          <FoodForm
            onSubmit={createFood}
            onSubmitSuccess={handleCreateSuccess}
          />
        </div>
        <div className="App-filter">
          <div className="App-search">
            <form onSubmit={handleSearchSubmit}>
              <input name="search" />
              <button className="App-search-button" type="submit">
                <img src={searchImg} alt="search" />
              </button>
            </form>
          </div>
          <div className="App-order">
            <AppSortButton
              selected={order === "createdAt"}
              onClick={handleNewestClick}
            >
              {t("newest")}
            </AppSortButton>
            <AppSortButton
              selected={order === "calorie"}
              onClick={handleCalorieClick}
            >
              {t("sort by calorie")}
            </AppSortButton>
          </div>
        </div>
        <FoodList
          className="App-FoodList"
          items={sortedItems}
          onUpdate={updateFood}
          onUpdateSuccess={handleUpdateSuccess}
          onDelete={handleDelete}
        />
        {cursor && (
          <button
            className="App-load-more-button"
            disabled={pending}
            onClick={handleLoadMore}
          >
            {t("load more")}
          </button>
        )}
        {error?.message && <p>{error.message}</p>}
      </div>
      <div className="App-footer">
        <div className="App-footer-container">
          <img src={logoTextImg} alt="Foodit" />
          <LocaleSelect />
          <div className="App-footer-menu">
            {t("terms of service")} | {t("privacy policy")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
