import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/common/Layout";
import Register from "./components/common/Register";
import Home from "./components/common/Home";
import PinInput from "./components/mini/PinInput";
import Order from "./components/common/Order";
import CartList from "./components/pages/CartList";
import OrdersOk from "./components/pages/OrdersOk";
import Shares from "./components/common/Shares";
import Products from "./components/common/Products";
import OneProduct from "./components/common/OneProduct";
import Users from "./components/pages/User";
import Contact from "./components/common/Contact";
import Store from "./components/common/Store";
import ProtectedRoute from "./components/common/ProtectedRoute";
import NotFound from "./components/common/NotFound";

const token = localStorage.getItem("token");

function App() {
    return (
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/shares" element={<Shares/>}/>
                    <Route path="/input" element={<PinInput/>}/>
                    <Route path="/orders" element={
                        <ProtectedRoute>
                            <Order/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/basket" element={
                        <ProtectedRoute>
                            <CartList/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/cardok" element={<OrdersOk/>}/>
                    <Route path="/products" element={<Products/>}/>
                    <Route path="/products/:name" element={<Products/>}/>
                    <Route path="/one-product/:productId" element={<OneProduct/>}/>
                    <Route path="/contacts" element={<Contact/>}/>
                    <Route path="/store/:id" element={<Store/>}/>
                    <Route path="/user" element={
                        <ProtectedRoute>
                            <Users/>
                        </ProtectedRoute>
                    }/>
                    <Route
                        path="/register"
                        element={
                            token ? <Navigate to="/" replace /> : <Register />
                        }
                    />
                    <Route path="404" element={<NotFound/>}/>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
    );
}

export default App;


