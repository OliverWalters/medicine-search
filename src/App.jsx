import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Drug } from "./components/Drug";
import { DrugContainer } from "./components/DrugContainer";

export function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DrugContainer />} />
                <Route path="/drug/:id" element={<Drug />} />
            </Routes>
        </Router>
    );
}