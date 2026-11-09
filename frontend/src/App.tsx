import { NightBackground } from "./components/NightBackground";
import { AppLayout } from "./layouts/AppLayout";
import { CatalogoComandosView } from "./features/comandos/components/CatalogoComandosView";

function App() {

  return (
    <NightBackground>
      <AppLayout>
        <CatalogoComandosView />
     </AppLayout>
    </NightBackground>
  );
}

export default App;
