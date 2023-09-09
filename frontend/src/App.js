import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { AuthProvider } from "./hooks/useAuth";
import Contact from "./pages/Contact/Contact";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import HotelDetails from "./pages/HotelDetails/HotelDetails";
import HotelList from "./pages/HotelList/HotelList";
import Offers from "./pages/Offers/Offers";
import RoomDetails from "./pages/RoomDetails/RoomDetails";
import RoomList from "./pages/RoomList/RoomList";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import AddHotel from "./Components/AddHotel/AddHotel";
import BookingList from "./Components/BookingList/BookingList";
import AddRoom from "./Components/AddRoom/AddRoom";

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/offers" element={<Offers />} />
    <Route path="/hotels" element={<HotelList />} />
    <Route path="/hotels/:id" element={<HotelDetails />} />
    <Route path="/rooms/:hotelId/:roomId" element={<RoomDetails />} />
    <Route path="/rooms/:hotelId/" element={<RoomList />} />
    <Route path="/dashboard" element={<PrivateRoute />}>
      <Route element={<Dashboard />}>
        <Route index element={<BookingList />} />
        <Route path="add-hotel" element={<AddHotel />} />
        <Route path="my-bookings" element={<BookingList />} />
        <Route path="add-room" element={<AddRoom />} />
      </Route>
    </Route>
    <Route path="/contact" element={<Contact />} />
  </Routes>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <Layout>
          <Router />
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
