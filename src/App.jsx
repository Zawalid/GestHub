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
  Offers,
  Demands,
  Projects,
} from "./pages";
import { ROUTES } from "./utils/constants";
import HomePageLayout from "./layouts/HomePageLayout";
import OfferDetails from "./pages/OfferDetails";
import SupervisorDetails from "./features/supervisors/SupervisorDetails";
import InternDetails from "./features/interns/InternDetails";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const queryClient = new QueryClient();

const routesElements = {
  overview: <Overview />,
  supervisors: <Supervisors />,
  "supervisors/:id": <SupervisorDetails />,
  interns: <Interns />,
  "interns/:id": <InternDetails />,
  teams: <Teams />,
  absences: <Absences />,
  offers: <Offers />,
  demands: <Demands />,
  projects: <Projects />,
};

export default function App() {
  const theme = useTheme();
  const role = useSelector((state) => state.user?.role);
  const [parent] = useAutoAnimate({ duration: 300 });

  return (
    <div className="w-full h-dvh" ref={parent}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="login" index element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="/" element={<HomePageLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/offer/:id" element={<OfferDetails />} />
            </Route>
            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate to="/app/overview" />} />
              {/* Routes of every role */}
              <Route path="overview" element={<Overview />} />
              <Route path="absences" element={<Absences />} />

              {/*  Routes of specific role */}
              {ROUTES[role].map((route) => (
                <Route
                  key={route}
                  path={route}
                  element={routesElements[route]}
                />
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
    </div>
  );
}
