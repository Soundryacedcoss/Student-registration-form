import "./App.css";
import { StudentForm } from "./components/StudentForm";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { StudentDetail } from "./components/StudentDetail";
let router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<StudentForm />} />
      <Route path="/Detail" element={<StudentDetail />} />
    </>
  )
);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
