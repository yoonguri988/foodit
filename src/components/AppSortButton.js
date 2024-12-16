function AppSortButton({ selected, onClick, children }) {
  return (
    <button
      disabled={selected}
      className={`AppSortButton ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export default AppSortButton;
