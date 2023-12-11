import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/index.tsx";
import { Home } from "./pages/Home";
import { ListaProdutores } from "./pages/Listagem/index.tsx";
import { store } from "./store.ts";

export default function Main() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/lista" element={<ListaProdutores />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Main />);
