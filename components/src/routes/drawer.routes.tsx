import {createDrawerNavigator} from '@react-navigation/drawer'
// import {MaterialIcons} from '@expo/vector-icons';
// import { MaterialCommunityIcons,AntDesign  } from '@expo/vector-icons';
import 'react-native-gesture-handler';

import Home from '../screen/Home';
import Teste from '../screen/Teste';

const {Screen,Navigator} = createDrawerNavigator();

export function DrawerRotas(){

    return(
        <Navigator
        screenOptions={{
            drawerActiveTintColor:'green',
            drawerInactiveTintColor:'red',
            drawerActiveBackgroundColor:'purple',
            drawerInactiveBackgroundColor:'black',
            drawerStyle:{
                height: '100%',
                backgroundColor:'white',
                borderRadius:10, //borda redonda
                shadowColor:'red', //Cor da sombra
                elevation:100, //Sombra
            }
            

        }}
        >
            
            <Screen
                name='Home 3'
                component={Home}
                // options={{drawerIcon: ()=> <MaterialCommunityIcons name="home-circle-outline" size={24} color="white"/>}}
                
            />
            <Screen
                name='Login'
                component={Teste}
                // options={{drawerIcon: ()=> <AntDesign name="login" size={24} color="white" />}}
            />
        </Navigator>
    )
}

