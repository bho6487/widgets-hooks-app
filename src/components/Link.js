const Link = ({ className, href, children }) => {
  const onClick = (event) => {
    //if holding down ctrl key, allow window to do its thing
    if (event.metaKey || event.ctrlKey) {
      return;
    }

    event.preventDefault();

    //changing the url, making sure it's consistent
    window.history.pushState({}, "", href);

    //communicate to Route components that the url has changed
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  return (
    <a className={className} href={href} onClick={onClick}>
      {children}
    </a>
  );
};

export default Link;
