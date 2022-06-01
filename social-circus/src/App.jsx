import "./App.css";
import { Header } from "./components";
import { RouteConfig } from "./config/RouteConfig";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Header />
      <RouteConfig />
      <Toaster />
    </div>
  );
}

export default App;
