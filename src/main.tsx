import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ListaProdutores } from "./pages/Listagem/index.tsx";
import { Home } from "./pages/Home";
import { Provider } from "react-redux";
import { store } from "./store.ts";

export default function Main() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/lista" element={<ListaProdutores />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Main />);
