import { BrowserRouter, Routes, Route } from "react-router"
import LayoutAsidebar from "../layout/SidebarLayout"
import PageUsuarios from "../pages/usuarios/PageUsuarios"
import PageArea from "../pages/area/Page-Area"



const Rotues = () => {
   return (
      <BrowserRouter>
         <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="dashboard" element={<LayoutAsidebar />}>
               <Route path="usuario" element={<PageUsuarios />} /> 
               <Route path="area" element={<PageArea />} /> 
            </Route>
         </Routes>
      </BrowserRouter>
   )
}

export default Rotues