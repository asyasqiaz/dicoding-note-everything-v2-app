import { ThemeConsumer } from "../contexts/ThemeContext";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

function ToggleTheme() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => {
        return (
          <button className="toggle-theme" onClick={toggleTheme}>
            {theme === "light" ? (
              <MdOutlineDarkMode size={30} />
            ) : (
              <MdOutlineLightMode size={30} />
            )}
          </button>
        );
      }}
    </ThemeConsumer>
  );
}

export default ToggleTheme;
