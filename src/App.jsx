import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useSelector } from "react-redux";
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
  HomePage,
} from "./pages";
import { ROUTES } from "./utils/constants";


const queryClient = new QueryClient();

const routesElements = {
  overview: <Overview />,
  interns: <Interns />,
  supervisors: <Supervisors />,
  teams: <Teams />,
  absences: <Absences />,
};

export default function App() {
  const theme = useTheme();
  const role = useSelector((state) => state.user?.role);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
      </BrowserRouter>

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
    </QueryClientProvider>
  );
}
