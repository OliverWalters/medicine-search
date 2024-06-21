import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Drug } from "./Drug";
import { DrugContainer } from "./DrugContainer";

export function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DrugContainer />} />
                <Route path="/drug/:ndc" element={<Drug />} />
            </Routes>
        </Router>
    );
}