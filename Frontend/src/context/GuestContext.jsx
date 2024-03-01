import { createContext, useContext, useState } from "react";

const GuestContext = createContext();

const GuestProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const handleSetUser = (user) => {
    setUser(user);
  };

  return (
    <GuestContext.Provider value={{ user, setUser }}>
      {children}
    </GuestContext.Provider>
  );
};
const useGuest = () => {
  const context = useContext(GuestContext);
  if (context === undefined)
    throw new Error("GuestContext was outside of the Guest Provider");
  return context;
};

export { GuestProvider, useGuest };
