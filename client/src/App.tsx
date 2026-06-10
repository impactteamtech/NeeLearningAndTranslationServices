import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Layout from "./layout/Layout";
import NotFound from "./pages/not-found/NotFound";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index={true} element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
