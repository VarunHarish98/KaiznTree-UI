import logo from './logo.svg';
import './App.css';
import Body from './Components/Body';
import Dashboard from './Components/Dashboard';
import Sidebar from './Components/Sidebar';

function App() {
  return (
    <div className="App flex">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;
