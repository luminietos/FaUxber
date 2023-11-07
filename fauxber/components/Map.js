import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc"; // Tailwind CSS
import { useSelector, useDispatch } from "react-redux";
import { selectOrigin, setOrigin, selectDestination, setTravelTimeInformation, selectTravelTimeInformation } from "../slices/navSlice";
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env";


const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    
    // zooms & fits to markers!
    useEffect(() => { 
      if (!origin || !destination || !mapRef.current) return; // doesn't run w/o origin or destination, checks if mapRef.current is available

      mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 } // adds padding
      });
  }, [origin, destination]); // re-runs whenever the origin/destination changes
 
  // calculates
  useEffect(() => {
    if (!origin || !destination) return; // doesn't run w/o origin or destination

    const getTravelTime = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data.error_message) {
          throw new Error(data.error_message);
        }
        dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
      } catch (error) {
        console.error("Error fetching travel time:", error);
      }
    };

    // useEffect(() => {
    //   if (!origin || !destination) return; // doesn't run w/o origin or destination
  
    //   const getTravelTime = async() => {
    //     // fetch to a Google API
    //     fetch(
    //       `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=
    //       ${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
    //     ).then(res => res.json())
    //     .then(data => {
    //       //console.log(data);
    //       dispatch(setTravelTimeInformation(data.rows[0].elements[0])); 
    //     });
    //   };
  
    //   getTravelTime();
    // }, [origin, destination, GOOGLE_MAPS_APIKEY]);

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

    // Error handling: handles the case where origin data is not available or incomplete
    if (!origin || !origin.location || !origin.location.latitude || !origin.location.longitude) {
      return (
          <View style={tw`flex-1 justify-center items-center`}>
              <Text>Map data is currently unavailable.</Text>
          </View>
      );
    };

  return (
    <MapView 
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard" 
      initialRegion={{
        latitude: origin.location.latitude,
        longitude: origin.location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {origin?.location && ( // only renders if origin is there
        <Marker // giving it a coordinate
          coordinate={{
            latitude: origin.location.latitude,
            longitude: origin.location.longitude,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin" // marker
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
      </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
