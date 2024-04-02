import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
// import { StackRotas } from './stack.routes'
// import { TabRotas } from './tab.routes'
import { DrawerRotas } from './drawer.routes'
// import 'react-native-gesture-handler';




export function Routes() {
    return (
        <NavigationContainer>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"/>
            <DrawerRotas />
        </NavigationContainer>
    )
}