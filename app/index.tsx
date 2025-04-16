import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { drivers } from "@/constants/data";
import { IDriver } from "@/constants/interface";

const NearbyDriversScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 40.7128,
          longitude: -74.006,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {drivers.map((driver) => (
          <Marker key={driver.id} coordinate={driver.location}>
            <View style={styles.mapIcon}>
              <Ionicons name="car-sport" size={24} color="#4285F4" />
            </View>
          </Marker>
        ))}
      </MapView>

      <View style={styles.sheet}>
        <Text style={styles.sheetTitle}>Available Drivers</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={drivers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: IDriver }) => (
            <TouchableOpacity
              style={styles.driverCard}
              onPress={() =>
                router.push({
                  pathname: "/detail",
                  params: { driver: JSON.stringify(item) },
                })
              }
            >
              <Image source={{ uri: item.image }} style={styles.avatar} />
              <View style={styles.driverInfo}>
                <Text style={styles.driverName}>{item.name}</Text>
                <Text style={styles.driverCar}>
                  {item.carModel} • {item.license}
                </Text>
                <View style={styles.ratingRow}>
                  <Text style={styles.star}>⭐ {item.rating}</Text>
                  <Text style={styles.distance}> • {item.distance}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => router.push("/request")}>
                <Ionicons name="car-outline" size={20} color="#959CA9" />
              </TouchableOpacity>
            </TouchableOpacity>
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
  mapIcon: {
    backgroundColor: "white",
    padding: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
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
  driverCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontWeight: "600",
    fontSize: 14,
  },
  driverCar: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  star: {
    fontSize: 13,
    color: "#555",
  },
  distance: {
    fontSize: 13,
    color: "#777",
  },
});

export default NearbyDriversScreen;
