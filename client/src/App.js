import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Detailed from "./pages/Hotel/Detailed";
import Hotels from "./pages/Hotels/Hotels";
import Login from "./pages/login/login";



function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/hotels" element={<Hotels/>}/>
      <Route path="/hotel/find/:id" element={<Detailed/>}/>
      <Route path="/login" element={<Login/>}/>

    </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
