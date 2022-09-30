import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from './Main';
import { useState } from 'react';
import ConsumerList from './components/ConsumerList';
import UserContext from './components/contextos/user-context';
import Login from './components/register/Login';
import Register from './components/register/Register';
import NuevoUsuario from './components/admin/NuevoUsuario';
import MainAdmin from './components/MainAdmin';
import EditarUsuario from './components/admin/EditarUsuario';
import IngresarLectura from './components/admin/IngresarLectura';
import EditarLectura from './components/admin/EditarLectura';
import ReadingList from './components/ReadingList';


function App() {
    // CAMBIAR SEGÚN PROYECTO!!!
    // En componentes sin ruta, actualizar a mano
  const dir = 'consumers/';

  // CAMBIAR SEGÚN PROYECTO!!!
  const [allPets, setAllPets] = useState([]);

  const [usuario,setUsuario] = useState();

  return (

      <UserContext.Provider  value={{usuario, setUsuario}}>
        <div className="App">
            <Routes>

              <Route 
                path='/login' 
                element={
                  <Login 
                    dir={dir} />
                }>
              </Route>
              
              <Route 
                path='/usuario' 
                element={
                  <Register 
                    dir={dir} />
                }>
              </Route>
              
              <Route 
                path="/*" 
                element={
                  <Main 
                    allPets={allPets} 
                    setAllPets={setAllPets}
                    dir={dir}
                  />
                } 
              />
              
              <Route 
                path="/readings/:id/:id2" 
                element={
                  <ReadingList 
                    allPets={allPets} 
                    setAllPets={setAllPets}
                    dir={dir}
                  />
                } 
              />


{/* RUTAS DE ADMINISTRADOR */}

              <Route 
                path="/admin" 
                element={
                  <MainAdmin 
                    allPets={allPets} 
                    setAllPets={setAllPets}
                    dir={dir} />
                } />

              <Route 
                path='/admin/nuevousuario' 
                element={
                  <NuevoUsuario 
                    allPets={allPets} 
                    setAllPets={setAllPets} 
                    dir={dir} />
                }>
              </Route>
              
              <Route 
                path='/admin/editarusuario' 
                element={
                  <EditarUsuario 
                    allPets={allPets} 
                    setAllPets={setAllPets} 
                    dir={dir} />
                }>
              </Route>
              
              <Route 
                path='/admin/ingresarlectura' 
                element={
                  <IngresarLectura 
                    allPets={allPets} 
                    setAllPets={setAllPets} 
                    dir={dir} />
                }>
              </Route>
              
              <Route 
                path='/admin/editarlectura' 
                element={
                  <EditarLectura 
                    allPets={allPets} 
                    setAllPets={setAllPets} 
                    dir={dir} />
                }>
              </Route>
                
              <Route 
                path='/admin/listado' 
                element={
                  <ConsumerList 
                    allPets={allPets} 
                    setAllPets={setAllPets} 
                    dir={dir} />}>
              </Route>

            </Routes>
        </div>
      </UserContext.Provider>
  
  );
}

export default App;
