
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from './src/components/login/login';
import Register from './src/components/register/register';
import Home from './src/components/home/home';
import OccupationalHealth from './src/components/occupationalHealth/occupationalHealth';
import changePass from './src/components/changePassword/changePass';
import CameraAPP from './src/components/camera/camera';
import Profile from './src/components/profile/profile';
import Logout from './src/components/logout/logout';
import Action from './src/components/alarmNotification/action';
import ChangePass from './src/components/changePassword/changePass';


const Stack = createStackNavigator();

/**
 * Estilos de cabeceras
 */
const styleHeader = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#FFF',
  },
  headerTintColor: '#000',
  headerLeft: null
}

/**
 * Tabs de navegacion de la home
 */
const tabsHomeStack = createBottomTabNavigator();
const HomeStackScreen = ({ navigation }) => (
  <tabsHomeStack.Navigator
    initialRouteName="Inicio"
    screenOptions={{
      headerShown: false
    }}
  >
    <tabsHomeStack.Screen
      name="Inicio"
      component={Home}
      options={{
        tabBarLabel: 'INICIO',
        tabBarIcon: () => (
          <MaterialCommunityIcons name="home" color={"#000"} size={20} />
        ),
        unmountOnBlur: true
      }}
    />
    <tabsHomeStack.Screen
      name="Camara"
      component={CameraAPP}
      options={{
        tabBarLabel: 'CÁMARA',
        tabBarIcon: () => (
          <MaterialCommunityIcons name="camera" color={"#000"} size={20} />
        ),
        unmountOnBlur: true
      }}
    />
    <tabsHomeStack.Screen
      name="Salud_Ocupacional"
      component={OccupationalHealth}
      options={{
        tabBarLabel: 'S. OCUPACIONAL',
        tabBarIcon: () => (
          <MaterialCommunityIcons name="heart" color={"#000"} size={20} />
        ),
        unmountOnBlur: true
      }}
    />
    <tabsHomeStack.Screen
      name="perfil"
      component={Profile}
      options={{
        tabBarLabel: 'PERFIL',
        tabBarIcon: () => (
          <MaterialCommunityIcons name="account" color={"#000"} size={20} />
        ),
        unmountOnBlur: true
      }}
    />
    <tabsHomeStack.Screen
      name="logout"
      component={Logout}
      options={{
        tabBarLabel: 'SALIR',
        tabBarIcon: () => (
          <MaterialCommunityIcons name="logout" color={"#000"} size={20} />
        ),
      }}
    />
  </tabsHomeStack.Navigator>
);

/**
 * Export app navifationContainer
 */
export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Login"
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            ...styleHeader,
            title: 'Login'
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            ...styleHeader,
            title: 'Registrate'
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            ...styleHeader,
            title: 'DriverSecurity'
          }}
        />
        <Stack.Screen
          name="Action"
          component={Action}
          options={{ ...styleHeader }}
        />
        <tabsHomeStack.Screen
          name="changePass"
          component={ChangePass}
          options={{
            headerLeft: null,
            title: 'Actualizar contraseña'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
