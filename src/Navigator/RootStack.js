import {createStackNavigator} from 'react-navigation-stack';
import Homescreen from '../Home/Homescreen.js';
import Addscreen from '../Add/Addscreen.js';
import Editscreen from '../Edit/Editscreen.js';
import DetailScreen from '../Detail/DetailScreen';
import LoginScreen from '../Login/Loginscreen';

export const LoginStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
});

export const RootStack = createStackNavigator(
  {
    Home: {
      screen: Homescreen,
    },
    Add: {
      screen: Addscreen,
    },
    Edit: {
      screen: Editscreen,
    },
    Detail: {
      screen: DetailScreen,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#1e88e5',
      },
      headerTintColor: '#6807f9',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);