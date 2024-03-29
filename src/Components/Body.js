import { React, useEffect } from "react";
// import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { useDispatch } from "react-redux";
// import { addUser, removerUser } from "../redux/userSlice";

// const auth = getAuth();

const Body = () => {
//   const dispatch = useDispatch();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    // {
    //   path: "/browse",
    //   element: <Browse />,
    // },
  ]);

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/auth.user
//         const { uid, email, displayName, photoURL } = user;
//         dispatch(addUser({ uid, email, displayName, photoURL })); // ...
//         //navigate("/browse"); // WHen User signed out, navigate to browse page - can't be added as it is not under React Component
//       } else {
//         // User is signed out
//         dispatch(removerUser());
//         //navigate("/"); //Once the user signs out, navigate to main page
//       }
//     });
//   }, []);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
