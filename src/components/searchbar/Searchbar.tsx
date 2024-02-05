import { SearchIcon } from "../svg/SearchIcon";
import "./searchbar.scss";
export default function Searchbar() {
  return (
    <div className="searchbar">
      <div className="searchbar__wrapper">
        <label htmlFor="searchbar--input" className="searchbar--label">
          <SearchIcon />
        </label>
        <input
          type="text"
          id="searchbar--input"
          className="searchbar--input"
          placeholder="Search timetables..."
        />
      </div>
    </div>
  );
}
