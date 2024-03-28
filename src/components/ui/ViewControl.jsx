import { PiGridFourFill, PiListBold } from "react-icons/pi";

export function ViewControl({ view = "list", setView }) {
  return (
    <div className="flex items-center gap-3">
      <button
        className={`icon-button ${view === "list" ? "active" : "not-active"}`}
        onClick={() => setView("list")}
      >
        <PiListBold className="text-lg" />
      </button>
      <button
        className={`icon-button ${view === "grid" ? "active" : "not-active"}`}
        onClick={() => setView("grid")}
      >
        <PiGridFourFill className="text-lg" />
      </button>
    </div>
  );
}
