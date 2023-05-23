import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Page from "./components/Page";

function App() {
  return (
    <main id="app">
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/:page" element={<Page />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
