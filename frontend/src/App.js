import './App.css';
import Background from './assets/bg.jpg';
import FormUpload from './components/FormUpload/UploadImage/UploadImage.components.jsx'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <body>
          Find top 5 violating users 
        </body>
        <FormUpload/>
      </header>
    </div>
  );
}

export default App;
