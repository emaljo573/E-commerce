import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProductScreen from "./screens/ProductScreen";
import { CartScreen } from "./screens/CartScreen";
import { Login } from "./screens/Login";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Register } from "./screens/Register";
import { ShippingScreen } from "./screens/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";
import PaymentsScreen from "./screens/PaymentsScreen";
import { PlaceOrderScreen } from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { ProfileScreen } from "./screens/ProfileScreen";
const App = () => {
  return (
    <Router>
      <Header />
      <PayPalScriptProvider deferLoading={true}>
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} exact />
              <Route path="/product/:id"
                element={<ProductScreen />} />
              <Route
                path="/cart"
                element={<CartScreen />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/register"
                element={<Register />}
              />

              <Route
                path=''
                element={<PrivateRoute />}
              >
                <Route
                  path="/shipping"
                  element={<ShippingScreen />}
                />
                <Route
                  path="/payment"
                  element={<PaymentsScreen />}
                />
                <Route
                  path="/placeorder"
                  element={<PlaceOrderScreen />}
                />
                <Route
                  path="/order/:id"
                  element={<OrderScreen />}
                />
                <Route
                  path="/order/:id"
                  element={<OrderScreen />}
                />
                <Route
                  path='/profile'
                  element={<ProfileScreen />}
                />

              </Route>
            </Routes>
          </Container>
        </main>
      </PayPalScriptProvider>
      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
