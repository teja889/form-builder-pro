import { Suspense, lazy } from "react"; // 1. Import Suspense and lazy
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container, CssBaseline, Box, CircularProgress } from "@mui/material";
import Header from "./components/common/header";

// 2. Change the page imports to be lazy-loaded
const HomePage = lazy(() =>
  import("./pages/HomePage").then((module) => ({ default: module.HomePage }))
);
const CreateFormPage = lazy(() =>
  import("./pages/createFormPage").then((module) => ({
    default: module.CreateFormPage,
  }))
);
const MyFormsPage = lazy(() =>
  import("./pages/myFormsPage").then((module) => ({
    default: module.MyFormsPage,
  }))
);
const PreviewFormPage = lazy(() =>
  import("./pages/PreviewFormPage").then((module) => ({
    default: module.PreviewFormPage,
  }))
);

// A simple loading component to show while pages are loading
const LoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    }}
  >
    <CircularProgress />
  </Box>
);

function App() {
  return (
    <Router>
      <CssBaseline />
      <Header />
      <Container component="main" maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* 3. Wrap the Routes with a Suspense component */}
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateFormPage />} />
            <Route path="/myforms" element={<MyFormsPage />} />
            <Route path="/preview/:formId" element={<PreviewFormPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Container>
    </Router>
  );
}

export default App;
