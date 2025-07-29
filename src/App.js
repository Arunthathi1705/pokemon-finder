import SplashScreen from './components/SplashScreen';
import Home from './components/Home';
import './App.css';
import { useState } from 'react';


function App() {
  const [showSplash, setShowSplash] = useState(true);
  return (
    <div className="App">
      {showSplash ? <SplashScreen onFinish={() => setShowSplash(false)} /> : <Home />}
    </div>
  );
}

export default App;
