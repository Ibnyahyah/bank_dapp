import './App.css';
import Main from './main';
import { ContextProvider } from './context/context';

function App() {
  

  
  return (
    <ContextProvider>
      <Main/>
    </ContextProvider>
  );
}

export default App;
