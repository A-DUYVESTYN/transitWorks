// import logo from './logo.svg';
import './App.css';
import TTC from "./components/TTC";
function App() {
  return (
    <div>
      <h1 className="p-2 text-xl">
        Transit Service Disruptions
      </h1>
      <div className="flex flex-row justify-evenly">
        <TTC className="w-60"/>
        <div className="w-60">GO Transit</div>
      </div>
    </div>
  );
}

export default App;
