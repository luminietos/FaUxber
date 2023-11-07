import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, FlatList, Image,} from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";
import tw from "twrnc"; // Tailwind CSS


const data = [
  {
    id: "Uber-X-123",
    title: "Uber X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

// if there's a surge pricing, this goes up!
const SURGE_CHARGE_PRICE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>

      <View>
        <TouchableOpacity
          style={tw`absolute p-3 rounded-full top-3 left-5 z-50`} 
          onPress={() => navigation.navigate('NavigateCard')}> 
          <Icon name="chevron-left" type="font-awesome" size={14} /> 
        </TouchableOpacity>
        <Text style={tw`text-center text-xl py-5`}>Select a ride - {travelTimeInformation?.distance.text}</Text>
      </View>

      <FlatList 
        data={data} // passing the data to the FlatList
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={tw`bg-gray-200 h-[0.5px]`} />
        )}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
            <TouchableOpacity
            style={tw`flex-row justify-between items-center px-10 ${id === selected?.id ? "bg-gray-200" : ""}`}
            onPress={() => {
              if (id === selected?.id) {
                setSelected(null); // deselects the item if it's already selected
              } else {
                setSelected(item); // selects the item if it's not selected
              }
            }}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />

            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
            </View>
            <Text style={tw`text-xl font-semibold`}>
              {new Intl.NumberFormat("en-gb", {
                style: "currency",
                currency: "GBP",
              }).format(
                (travelTimeInformation?.duration?.value *
                  SURGE_CHARGE_PRICE *
                  multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected} // is disabled if nothing's selected
          style={tw`py-3 m-3 ${!selected ? 'bg-gray-400' : 'bg-black'}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
