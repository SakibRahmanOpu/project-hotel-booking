import { useContext, useState, createContext } from "react";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authHotelBooking"))
  );
  const updateUser = (data) => {
    localStorage.setItem("authHotelBooking", JSON.stringify(data));
    setUser(data);
  };
  return (
    <authContext.Provider value={{ user, updateUser }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  const { user, updateUser } = context;
  return { user, updateUser };
  // const [user, setUser] = useState(
  //   JSON.parse(localStorage.getItem("authHotelBooking"))
  // );
  // console.log(user);
  // const updateUser = (data) => {
  //   localStorage.setItem("authHotelBooking", JSON.stringify(data));
  //   setUser(data);
  // };
  // return {
  //   user,
  //   // setUser,
  //   updateUser,
  // };
};

export default useAuth;
