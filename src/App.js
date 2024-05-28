import "./App.css";
import UserInput from "./components/userInput/UserInput";
import "./assets/styles/global.scss";

function App() {
  return (
    <div className="App">
      <h1>GitHub User Fetcher</h1>
      <UserInput />
    </div>
  );
}

export default App;
