import { Provider } from "react-redux";
import { store } from './redux/configureStore'
import Home from './home/home'
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="container">
          <Home />
        </div>
      </div>
    </Provider>
  );
}

export default App;
