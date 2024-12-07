import "./App.css";
import AuthProvider from "./components/auth/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import AppRouters from "./components/routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouters />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
