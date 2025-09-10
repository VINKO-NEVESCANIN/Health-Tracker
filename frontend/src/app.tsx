import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import RegistroScreen from "./src/screens/RegistroScreen";
import DoctorScreen from "./src/screens/DoctorScreen";
import PacienteScreen from "./src/screens/PacienteScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="🏠 Inicio" component={HomeScreen} />
        <Tab.Screen name="📝 Registro" component={RegistroScreen} />
        <Tab.Screen name="👨‍⚕️ Doctor" component={DoctorScreen} />
        <Tab.Screen name="🧑‍🤝‍🧑 Paciente" component={PacienteScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
