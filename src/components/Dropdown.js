import { useState, useEffect, useRef } from "react";

const Dropdown = ({ options, selected, onSelectedChange, label }) => {
  const [open, setOpen] = useState(false);
  //useRef #1
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      //ref.current.contains is going to see whether or not the element that was clicked on is inside of our component
      //contains method belongs to all DOM elements

      //useRef #3
      //if we were clicked is inside of the ref.current(ui form - parent element)
      //if we click somewhere inside our ref.current(ui form), return early and flip the open state
      if (ref.current.contains(event.target)) {
        return;
      }
      //else if  we click outside the ui form, close the form
      setOpen(false);
    };

    document.body.addEventListener("click", onBodyClick);

    //cleanup function
    //this will be called right before the next time the onBodyClick function is called
    //this cleanup function will also be invoked whenever we are about to stop showing the entire dropdown component on the screen
    return () => {
      //we want to detach the event listener from the body element entirely
      //remove the specific onBodyClick event listener from the click event
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  const renderedOptions = options.map((option) => {
    //if the value we're currently itterating over is equal to the selected option value, return null (don't render anything)
    if (option.value === selected.value) {
      return null;
    }
    return (
      <div
        key={option.value}
        className="item"
        onClick={() => {
          onSelectedChange(option);
        }}
      >
        {option.label}
      </div>
    );
  });
  return (
    //useRef #2
    <div className="ui form" ref={ref}>
      <div className="field">
        <label>{label}</label>
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

/**
 * built-in event system with react (adding event action to elements) only allows components to listen to click on elemtsn that are created by that component
 *
 * event bubbling: going up the event structure and auto invoking any elements with onClick event
 *
 * all event listeners on addEventListener gets called first then all the react elements follow
 * 1. addEventListeners
 * 2. react elements
 */

/**
 * useRef
 * direct reference to a DOM element
 * useRef > ref > div.ui.form
 */

/**
 * when we remove a component from the DOM, all the refs are set to null
 */
