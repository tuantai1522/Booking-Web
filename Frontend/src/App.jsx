// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Rooms from "./pages/Rooms";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import Error from "./ui/Error.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import Booking from "./pages/Booking.jsx";
import Checkin from "./pages/Checkin.jsx";
import Checkout from "./pages/Checkout.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import ProtectedRotes from "./ProtectedRotes.jsx";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import { GuestProvider } from "./context/GuestContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // the amount of time that the data in the cache will stay fresh (not fresh new data in server)
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
      <DarkModeProvider>
        <GuestProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <BrowserRouter>
              <Routes>
                <Route
                  element={
                    <ProtectedRotes>
                      <AppLayout />
                    </ProtectedRotes>
                  }
                >
                  <Route index element={<Navigate replace to="home" />} />
                  <Route path="home" element={<Home />} />
                  <Route path="dashboard" element={<Dashboard />} />

                  <Route path="bookings" element={<Bookings />} />
                  <Route path="bookings/:id" element={<Booking />} />
                  <Route path="checkout/:id" element={<Checkout />} />
                  <Route path="checkin/:id" element={<Checkin />} />

                  <Route path="rooms" element={<Rooms />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="account" element={<Account />} />
                </Route>

                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>

          {/* Display toast */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </GuestProvider>
      </DarkModeProvider>
    </>
  );
}

export default App;
