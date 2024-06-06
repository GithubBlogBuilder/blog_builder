// "use client";
//
// import React, {
//     createContext,
//     useEffect,
//     useState,
//     Dispatch,
//     SetStateAction,
// } from "react";
// import { EmptyUser, UserEntity } from "@/domain/entities/UserEntity";
//
// type UserContextProps = {
//     user: UserEntity;
//     setUserContext: Dispatch<SetStateAction<UserContextProps>>;
// };
//
// const defaultUserContext: UserContextProps = {
//     user: EmptyUser,
//     setUserContext: () => {},
// };
//
// export const UserContext = createContext<UserContextProps>({
//     ...defaultUserContext,
// });

// export function UserProvider({
//     children,
//     // user,
// }: {
//     children: React.ReactNode;
//     // user: UserEntity | null;
// }) {
//     const [userContext, setUserContext] =
//         useState<UserContextProps>(defaultUserContext);
//
//     // useEffect(() => {
//     //     setUserContext({
//     //         user: EmptyUser,
//     //         setUserContext: setUserContext,
//     //     });
//     // }, []);
//
//     return (
//         <UserContext.Provider value={userContext}>
//             {children}
//         </UserContext.Provider>
//     );
// }
