import React from "react";
import Footer from "./components/Footer";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddNotePage from "./pages/AddNotePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import ArchivedNotePage from "./pages/ArchivedNotePage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import { getUserLogged, putAccessToken } from "./utils/network-data";
import Navigation from "./components/Navigation";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LocaleProvider } from "./contexts/LocaleContext";
import ToggleTheme from "./components/ToggleTheme";
import ToggleLocale from "./components/ToggleLocale";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem("theme") || "light",
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === "light" ? "dark" : "light";
          localStorage.setItem("theme", newTheme);
          return {
            theme: newTheme,
          };
        });
      },
      localeContext: {
        locale: localStorage.getItem("locale") || "id",
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale =
              prevState.localeContext.locale === "id" ? "en" : "id";
            localStorage.setItem("locale", newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale,
              },
            };
          });
        },
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute("data-theme", this.state.theme);
    }
  }

  async componentDidMount() {
    document.documentElement.setAttribute("data-theme", this.state.theme);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });

    putAccessToken("");
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <LocaleProvider value={this.state.localeContext}>
          <ThemeProvider value={this.state}>
            <div className="app-container">
              <header className="note-app__header">
                <h1>
                  <Link to="/">
                    {this.state.localeContext.locale === "id"
                      ? "Catat Segalanya"
                      : "Note Everything"}
                  </Link>
                </h1>
                <div className="navigation">
                  <ul>
                    <li>
                      <ToggleTheme size={30} />
                    </li>
                    <li>
                      <ToggleLocale size={30} />
                    </li>
                  </ul>
                </div>
              </header>
              <main>
                <Routes>
                  <Route
                    path="/*"
                    element={<LoginPage loginSuccess={this.onLoginSuccess} />}
                  />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </LocaleProvider>
      );
    }

    return (
      <LocaleProvider value={this.state.localeContext}>
        <ThemeProvider value={this.state}>
          <div className="app-container">
            <header className="note-app__header">
              <h1>
                <Link to="/">
                  {this.state.localeContext.locale === "id"
                    ? "Catat Segalanya"
                    : "Note Everything"}
                </Link>
              </h1>
              <Navigation
                logout={this.onLogout}
                name={this.state.authedUser.name}
              />
            </header>
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/notes/new" element={<AddNotePage />} />
                <Route path="/notes/:id" element={<NoteDetailPage />} />
                <Route path="/archives" element={<ArchivedNotePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </LocaleProvider>
    );
  }
}
export default App;
