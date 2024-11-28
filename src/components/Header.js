import React, { useState, useEffect, useRef } from "react";
import DisplayIcon from "../assets/icons_FEtask/Display.svg";
import DownIcon from "../assets/icons_FEtask/down.svg";

const Header = ({ groupBy, setGroupBy, sortBy, setSortBy }) => {
  const [isDisplayMenuOpen, setIsDisplayMenuOpen] = useState(false);
  const [isGroupingMenuOpen, setIsGroupingMenuOpen] = useState(false);
  const [isOrderingMenuOpen, setIsOrderingMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Capitalize the first letter of a string
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDisplayMenuOpen(false);
        setIsGroupingMenuOpen(false);
        setIsOrderingMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="header">
      {/* Display Button */}
      <div className="display-menu" ref={dropdownRef}>
        <button
          className="display-button"
          onClick={() => setIsDisplayMenuOpen(!isDisplayMenuOpen)}
        >
          <img src={DisplayIcon} alt="Display" className="icon" />
          <span>Display</span>
          <img src={DownIcon} alt="Down" className="icon" />
        </button>

        {/* Main Dropdown */}
        {isDisplayMenuOpen && (
          <div className="display-dropdown">
            {/* Grouping Section */}
            <div className="dropdown-row">
              <span className="dropdown-label">Grouping</span>
              <button
                className="dropdown-selector"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent menu close
                  setIsGroupingMenuOpen(!isGroupingMenuOpen);
                }}
              >
                {capitalize(groupBy)}
                <img src={DownIcon} alt="Down" className="icon" />
              </button>

              {/* Grouping Submenu */}
              {isGroupingMenuOpen && (
                <div className="submenu">
                  <button
                    className="submenu-option"
                    onClick={() => {
                      setGroupBy("status");
                      setIsGroupingMenuOpen(false);
                      setIsDisplayMenuOpen(false);
                    }}
                  >
                    Status
                  </button>
                  <button
                    className="submenu-option"
                    onClick={() => {
                      setGroupBy("user");
                      setIsGroupingMenuOpen(false);
                      setIsDisplayMenuOpen(false);
                    }}
                  >
                    User
                  </button>
                  <button
                    className="submenu-option"
                    onClick={() => {
                      setGroupBy("priority");
                      setIsGroupingMenuOpen(false);
                      setIsDisplayMenuOpen(false);
                    }}
                  >
                    Priority
                  </button>
                </div>
              )}
            </div>

            {/* Ordering Section */}
            <div className="dropdown-row">
              <span className="dropdown-label">Ordering</span>
              <button
                className="dropdown-selector"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent menu close
                  setIsOrderingMenuOpen(!isOrderingMenuOpen);
                }}
              >
                {capitalize(sortBy)}
                <img src={DownIcon} alt="Down" className="icon" />
              </button>

              {/* Ordering Submenu */}
              {isOrderingMenuOpen && (
                <div className="submenu">
                  <button
                    className="submenu-option"
                    onClick={() => {
                      setSortBy("priority");
                      setIsOrderingMenuOpen(false);
                      setIsDisplayMenuOpen(false);
                    }}
                  >
                    Priority
                  </button>
                  <button
                    className="submenu-option"
                    onClick={() => {
                      setSortBy("title");
                      setIsOrderingMenuOpen(false);
                      setIsDisplayMenuOpen(false);
                    }}
                  >
                    Title
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
