import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "./redux/slices/authSlice";
import { resetTransaction } from "./redux/slices/transactionSlice";
import Notification from "./components/common/Notification";

function App() {
  const authError = useSelector((state) => state.auth.error);
  const transactionError = useSelector((state) => state.transaction.error);
  const dispatch = useDispatch();

  // Tentukan error mana yang akan ditampilkan
  const error = authError || transactionError;
  const resetAction = authError ? reset : resetTransaction;

  return (
    <>
      {error && (
        <Notification
          message={error.message}
          type="error"
          onClose={() => dispatch(resetAction())}
        />
      )}

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
