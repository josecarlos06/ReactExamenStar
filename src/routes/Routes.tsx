import LayoutAsidebar from "@/layout/SidebarLayout"
import PageArea from "@/pages/area/Page-Area"
import Dashboard from "@/pages/dashboard/Dashboard"
import PageUsuarios from "@/pages/usuarios/Page-Usuarios"
import { BrowserRouter, Routes, Route, Navigate } from "react-router"

const Rotues = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="dashboard" element={<LayoutAsidebar />} >
               <Route index element={<Dashboard />} />
               <Route path="empleados" element={<PageUsuarios />} /> 
               <Route path="area" element={<PageArea />} /> 
            </Route>
            <Route path="*" element={<Navigate to="dashboard" />}   /> 
         </Routes>
      </BrowserRouter>
   )
}

export default Rotues