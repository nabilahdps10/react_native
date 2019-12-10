import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {LoginStack, RootStack} from './RootStack';

export default createAppContainer(
  createSwitchNavigator(
    {
      Login: LoginStack,
      Home: RootStack,
    },
    {initialRouteName: 'Login'},
  ),
);