import Navigation from './navigation/Navigation';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';


function App() {
 
  return (
    <Router>
      <Provider store={store}>
        <Navigation/>
      </Provider>
    </Router>
  )
}

export default App
