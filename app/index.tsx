import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import MapView from "react-native-maps";
import { drivers } from "@/constants/data";
import { IDriver } from "@/constants/interface";
import DriverCard from "@/components/DriverCard";
import MapMarker from "@/components/CarMarker";
import { useLocation } from "./context/LocationContext";

const NearbyDriversScreen = () => {
  const { locationCoordinates } = useLocation();

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
        {drivers.map((driver) => (
          <MapMarker key={driver.id} driver={driver} />
        ))}
      </MapView>

      <View style={styles.sheet}>
        <Text style={styles.sheetTitle}>Available Drivers</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={drivers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: IDriver }) => (
            <DriverCard driver={item} />
          )}
        />
      </View>
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
  sheet: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    height: 400,
  },
  sheetTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
    color: "#4E5058",
  },
});

export default NearbyDriversScreen;
