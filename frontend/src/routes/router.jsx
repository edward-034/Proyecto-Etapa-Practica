import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Proveedores from "../pages/Proveedores";
import Medicamentos from "../pages/Medicamentos";
import Movimientos from "../pages/Movimientos"
import Alertas from "../pages/Alertas";
import Auditoria from "../pages/Auditoria";
import Historial from "../pages/Historial";
import Reportes from "../pages/Reportes";
import Usuarios from "../pages/Usuarios";
import ProtectedRoute from "./ProtectedRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/dashboard",
        element:<ProtectedRoute><Dashboard /></ProtectedRoute>
    },
    {
        path: "/proveedores",
        element: <ProtectedRoute><Proveedores /></ProtectedRoute>
    },
    {
        path: "/medicamentos",
        element: <ProtectedRoute><Medicamentos /></ProtectedRoute>
    },
    {
        path: "/movimientos",
        element: <ProtectedRoute><Movimientos/></ProtectedRoute>
    },
    {
        path: "/alertas",
        element: <ProtectedRoute><Alertas/></ProtectedRoute>
    },
    {
        path: "/auditoria",
        element: <ProtectedRoute><Auditoria/></ProtectedRoute>
    },
    {
        path: "/historial",
        element: <ProtectedRoute><Historial/></ProtectedRoute>
    },
    {
        path: "/reportes",
        element: <ProtectedRoute><Reportes/></ProtectedRoute>
    },
    {
        path: "/usuarios",
        element: <ProtectedRoute><Usuarios/></ProtectedRoute>
    }
]);
