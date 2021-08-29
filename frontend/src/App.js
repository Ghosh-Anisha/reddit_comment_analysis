import './App.css';
import SearchBar from './components/search/search.js';
import Background from './assets/bg.jpg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <body>
          Find top 5 violating users
        </body>
        <SearchBar/>
      </header>
    </div>
  );
}

export default App;
