import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";

export const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((item, i) => (
        <Route key={i} path={item.path} element={item.element}></Route>
      ))}
    </Routes>
  );
};
