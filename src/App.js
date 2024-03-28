import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from './store/index.js';
import { persistor } from './store/index.js';
import AppRoutes from './routes.js';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
      <div className="App">
          <BrowserRouter>
            <AppRoutes/>
          </BrowserRouter>
      </div>
    </PersistGate>
    </Provider>
  );
}

export default App;
