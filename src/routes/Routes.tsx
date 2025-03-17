import LayoutAsidebar from "@/layout/SidebarLayout"
import PageArea from "@/pages/area/Page-Area"
import PageUsuarios from "@/pages/usuarios/Page-Usuarios"
import { BrowserRouter, Routes, Route, Navigate } from "react-router"



const Rotues = () => {
   return (
      <BrowserRouter>
         <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="dashboard" element={<LayoutAsidebar />}>
               <Route path="empleados" element={<PageUsuarios />} /> 
               <Route path="area" element={<PageArea />} /> 
            </Route>
            <Route path="*" element={<Navigate to="dashboard" />}   /> 
         </Routes>
      </BrowserRouter>
   )
}

export default Rotues