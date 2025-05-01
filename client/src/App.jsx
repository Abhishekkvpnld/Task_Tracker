import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import UpdateTaskPage from "./pages/Update";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/update/:id" element={<UpdateTaskPage/>}/>
        <Route path="*" element={<Login />} />
      </Routes>
      <Toaster position="bottom-right" />
    </Router>
  )
}

export default App;