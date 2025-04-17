import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { IRide } from "@/constants/interface";
import { rideOptions } from "@/constants/data";
import RideType from "@/components/RideType";
import { useLocation } from "./context/LocationContext";

const RequestRideScreen = () => {
  const [selectedRide, setSelectedRide] = useState("1");
  const [isLoading, setIsLoading] = useState(false);

  const [destination, setDestination] = useState("");

  const { currentLocation, locationCoordinates, locationLoading } =
    useLocation();

  const handleRequestRide = () => {
    if (destination === "") {
      Alert.alert("Please enter a destination");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      Alert.alert("Ride Requested");
      setIsLoading(false);
      setDestination("");
      router.push("/");
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: locationCoordinates.latitude,
          longitude: locationCoordinates.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude: 40.7128, longitude: -74.006 }} />
      </MapView>

      <ScrollView style={styles.bottomSheet}>
        <View style={styles.locationRow}>
          <Ionicons name="location-sharp" size={18} color="green" />
          <Text style={styles.locationText}>Current Location</Text>
        </View>
        {locationLoading ? (
          <ActivityIndicator size="small" style={{ marginLeft: 26 }} />
        ) : (
          <Text style={styles.address}>
            {currentLocation || "Unable to get address"}
          </Text>
        )}

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={18} color="red" />
          <TextInput
            style={styles.destinationInput}
            placeholder="Enter Destination"
            value={destination}
            onChangeText={setDestination}
          />
        </View>

        <Text style={styles.sectionTitle}>Choose Ride Type</Text>

        <FlatList
          data={rideOptions}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: IRide }) => (
            <RideType
              key={item.id}
              item={item}
              selectedRide={selectedRide}
              setSelectedRide={setSelectedRide}
            />
          )}
        />

        <TouchableOpacity style={styles.payment}>
          <Ionicons name="card-outline" size={20} color="#555" />
          <Text style={styles.paymentText}>Visa •••• 4321</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRequestRide}>
          {isLoading ? (
            <ActivityIndicator size="small" color={styles.buttonText.color} />
          ) : (
            <Text style={styles.buttonText}>Request Ride</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    flex: 1,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  locationText: {
    fontWeight: "500",
    marginLeft: 8,
  },
  address: {
    marginLeft: 26,
    color: "#666",
    fontSize: 13,
  },
  destinationInput: {
    marginLeft: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flex: 1,
    paddingVertical: 4,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  payment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
  },
  paymentText: {
    marginLeft: 8,
    fontWeight: "500",
    color: "#333",
    flexGrow: 1,
  },
  button: {
    backgroundColor: "black",
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default RequestRideScreen;
