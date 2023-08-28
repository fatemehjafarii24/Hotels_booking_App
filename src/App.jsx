import "./App.css";
import { MdLocationOn } from "react-icons/md";
import { HiPlus, HiMinus, HiCalendar, HiSearch } from "react-icons/hi";
import { useRef, useState } from "react";
import useOutsideClick from "./hooks/useOutsideClick";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

function App() {
  const optionDropDownRef = useRef();
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  useOutsideClick(optionDropDownRef, "optoinDropDown", () =>
    setOpenOptions(false)
  );

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <div>
      <div className="header">
        <div className="headerSearch">
          <div className="headerSearchItem">
            <MdLocationOn className="headerIcon locationIcon" />
            <input
              placeholder="where to go?"
              className="headerSearchInput"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              type="text"
              name="destinaction"
              id="destinaction"
            />
            <span className="seperator"></span>
          </div>
          <div className="headerSearchItem">
            <HiCalendar className="headerIcon dateIcon" />
            <div
              className="dateDropDown"
              onClick={() => setOpenDate(!openDate)}
            >
              {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                date[0].endDate,
                "MM/dd/yyyy"
              )}`}
            </div>
            {openDate && (
              <DateRange
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
                minDate={new Date()}
              />
            )}
            <span className="seperator"></span>
          </div>
          <div className="headerSearchItem">
            <div
              id="optoinDropDown"
              onClick={() => setOpenOptions(!openOptions)}
            >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</div>
            {openOptions && (
              <div className="guestOptions" ref={optionDropDownRef}>
                <OptionItem
                  options={options}
                  type="adult"
                  handleOption={handleOption}
                  minLimit={1}
                />
                <OptionItem
                  options={options}
                  type="children"
                  handleOption={handleOption}
                  minLimit={0}
                />
                <OptionItem
                  options={options}
                  type="room"
                  handleOption={handleOption}
                  minLimit={1}
                />
              </div>
            )}
          </div>
          <div className="headerSearchItem">
          <button className="headerSearchBtn"> <HiSearch className="headerIcon"/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

function OptionItem({ options, type, handleOption, minLimit }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          onClick={() => handleOption(type, "dec")}
          disabled={options[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOption(type, "inc")}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
