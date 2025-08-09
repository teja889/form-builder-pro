import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import Header from "./components/common/header";
import { CreateFormPage } from "./pages/createFormPage";
import { MyFormsPage } from "./pages/myFormsPage";
import { PreviewFormPage } from "./pages/PreviewFormPage";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Header />
      <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateFormPage />} />
          <Route path="/myforms" element={<MyFormsPage />} />
          <Route path="/preview/:formId" element={<PreviewFormPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
