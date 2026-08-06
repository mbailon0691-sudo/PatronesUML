import Navegacion from "./Components/Navegacion";
import Dashboard from "./Components/Dashboard";
import Registro_Incidentes from "./Components/Registro_incidentes"; 
import Listado_Tickets from "./Components/Listado_Tickets";
function App() {
  return (
    <div>
      <Navegacion/>
      <Dashboard/>
      <Registro_Incidentes/>
      <Listado_Tickets/>
    </div>
  );
}
export default App;
