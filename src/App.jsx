import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";
import { FaSpinner } from "react-icons/fa6";
import { useTheme } from "./hooks/useTheme";
import "./styles/App.css";

import AppLayout from "./layouts/AppLayout";
import {
  Overview,
  Absences,
  Interns,
  Supervisors,
  Teams,
  NotFound,
} from "./pages";
import { useSelector } from "react-redux";
import { ROUTES } from "./utils/constants";

const routesElements = {
  overview: <Overview />,
  interns: <Interns />,
  supervisors: <Supervisors />,
  teams: <Teams />,
  absences: <Absences />,
};

export default function App() {
  const theme = useTheme();
  const role = useSelector((state) => state.app.user?.role);

  return (
    <>
      <Router>
        <Routes>
          {/* Home Page Routes */}
          {/* <Route path="/" element={<HomePage />} /> */}

          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate to="/app/overview" />} />
            {/* Routes of every role */}
            <Route path="overview" element={<Overview />} />
            <Route path="absences" element={<Absences />} />

            {/*  Routes of specific role */}
            {ROUTES[role].map((route) => (
              <Route key={route} path={route} element={routesElements[route]} />
            ))}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      <Toaster
        icons={{
          loading: (
            <FaSpinner className="animate-spin text-lg text-text-secondary" />
          ),
        }}
        position={window.innerWidth < 768 ? "bottom-center" : "bottom-right"}
        theme={theme}
        toastOptions={{
          className: "sonner-toast",
          duration: 2000,
        }}
      />
    </>
  );
}
