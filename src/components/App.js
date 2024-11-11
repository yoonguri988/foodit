import "./App.css";
import FoodList from "./FoodList";
import items from "../mock.json";

function App() {
  return (
    <div className="App">
      <FoodList items={items} />
    </div>
  );
}

export default App;
