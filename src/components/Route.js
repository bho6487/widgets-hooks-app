import { useState, useEffect } from "react";

const Route = ({ path, children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  //each Route can detect the URL has changed
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    //Route handler that listens for the nav event we dispatched in Link.js
    window.addEventListener("popstate", onLocationChange);

    //cleanup function
    //if we ever decides to stop showing the Route component on the screen, we want to clean up the event listener
    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  return currentPath === path ? children : null;
};

export default Route;
