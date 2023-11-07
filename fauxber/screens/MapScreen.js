import React from "react";
import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import tw from "twrnc"; // Tailwind CSS
import Map from "../components/Map";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";
import MapView from 'react-native-maps';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Icon } from 'react-native-elements/dist/icons/Icon';

const MapScreen = () => { 
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <View>

      <TouchableOpacity 
      style={tw`absolute bg-gray-100 p-3 rounded-full top-16 left-8 shadow-lg z-50`}
      onPress={() => navigation.navigate("HomeScreen")}
      >
        <Icon name="menu" />
      </TouchableOpacity>

      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;