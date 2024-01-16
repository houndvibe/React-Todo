import { Outlet } from "react-router-dom";
import NavPanel from "../components/NavPanel";

const App = () => {
  return (
    <div className="box-border h-screen bg-blueHover p-2">
      <div className="relative  m-auto flex h-[98vh] w-[1000px] rounded-md bg-grey p-3">
        <NavPanel />
        <div className="basis-3/4 rounded-md bg-white p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
