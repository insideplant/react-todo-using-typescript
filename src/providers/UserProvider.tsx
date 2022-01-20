import React, { createContext, useState } from "react";

export const UserContext: React.Context<{}> = createContext({});

export const UserProvider = (props: any) => {
  const [user, setUser] = useState<string>("");
  const { children } = props;

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
