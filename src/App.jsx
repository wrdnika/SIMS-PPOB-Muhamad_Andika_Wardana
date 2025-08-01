import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "./redux/slices/authSlice";
import Notification from "./components/common/Notification";

function App() {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <>
      {error && (
        <Notification
          message={error.message}
          type="error"
          onClose={() => dispatch(reset())}
        />
      )}

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
