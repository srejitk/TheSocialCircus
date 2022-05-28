import "./App.css";
import { Header } from "./components";
import { RouteConfig } from "./config/RouteConfig";

function App() {
  return (
    <div className="App">
      <Header />
      <RouteConfig />
    </div>
  );
}

export default App;
