import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import tw from "twrnc"; // Tailwind CSS
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setDestination } from '../slices/navSlice';
import NavFavourites from "../components/NavFavourites";
import { Icon } from 'react-native-elements';


const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    return ( 
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Mornin', sunshine!</Text>
            
            <View style={tw`flex-shrink flex-grow border-t border-gray-200`}>
                <View>
                <GooglePlacesAutocomplete 
                   placeholder='Where to?'
                   styles={toInputBoxStyles}
                   fetchDetails={true}
                   enablePoweredByContainer={false}
                   minLength={2} 
                   query={{
                    key: GOOGLE_MAPS_APIKEY, 
                    language: "en",
                   }}
                   nearbyPlacesAPI='GooglePlacesSearch'
                   debounce={400} // 400 milliseconds after user stops typing
                   onPress={(data, details = null) => { // default value is null
                    dispatch(
                      setDestination({
                        location: details.geometry.location,
                        description: data.description,
                      })
                    );
        
                    navigation.navigate("RideOptionsCard");
                  }}
                />
                </View>
                <NavFavourites />
            </View>
            <View style={tw`flex-row bg-white justify-evenly px-4 py-2 border-t border-gray-100 mt-auto`}>
                <TouchableOpacity onPress={() => navigation.navigate('RideOptionsCard')}
                style={tw`flex flex-row w-24 justify-between bg-black px-4 py-3 rounded-full`}>
                    <Icon name="car" type="font-awesome" color="white" size={16} />
                    <Text style={tw`text-white text-center ml-3`}>Rides</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`flex flex-row w-24 justify-between px-4 py-3 rounded-full`}>
                    <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
                    <Text style={tw`text-center ml-3`}>Eats</Text>
                </TouchableOpacity>
            </View> 
        </SafeAreaView>
    );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#dddddf", // a lil more gray
        borderRadius: 0,
        fontSize: 12,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
});