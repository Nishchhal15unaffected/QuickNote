import "./App.css";
import Footer from "./component/footer/Footer";
import Header from "./component/header/Header";
import "./bootstrap.min.css";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import EditNote from "./screens/EditNote/EditNote";
import { useState } from "react";
import Profile from "./screens/Profile/Profile";

function App() {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <div className="App">
        <Header setSearch={setSearch} />
        <main>
          <Route path="/" component={LandingPage} exact />
          <Route
            path="/mynotes"
            component={() => <MyNotes search={search} />}
            exact
          />
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/createnote" component={CreateNote} exact />
          <Route path="/editnote/:id" component={EditNote} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/profile" component={Profile} excat />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
