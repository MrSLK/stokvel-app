import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateStokvel from "./pages/CreateStokvel";
import StokvelList from "./pages/StokvelList";
import StokvelDetail from "./pages/StokvelDetail";
import JoinStokvel from "./pages/JoinStokvel";
import MyPayments from "./pages/MyPayments"; // <-- NEW

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#D97706",
          colorLink: "#D97706",
          borderRadius: 8,
        },
      }}
    >
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="join/:inviteCode?" element={<JoinStokvel />} />

              {/* Protected Routes */}
              <Route
                path="create"
                element={
                  <ProtectedRoute>
                    <CreateStokvel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="stokvels"
                element={
                  <ProtectedRoute>
                    <StokvelList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="stokvels/:id"
                element={
                  <ProtectedRoute>
                    <StokvelDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="payments"
                element={
                  // <-- NEW
                  <ProtectedRoute>
                    <MyPayments />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
