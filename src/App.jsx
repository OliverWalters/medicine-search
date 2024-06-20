import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DrugList } from "./DrugList";
import { Drug } from "./Drug";

export function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DrugList />} />
                <Route path="/drug/:ndc" element={<Drug />} />
            </Routes>
        </Router>
    );
}