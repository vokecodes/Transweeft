import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { IReview } from "@/constants/interface";

const DriverDetailScreen = () => {
  const router = useLocalSearchParams();

  const driver = JSON.parse(router.driver as string);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile */}
        <View style={styles.profile}>
          <Image source={{ uri: driver.image }} style={styles.avatar} />
          <Text style={styles.name}>{driver.name}</Text>
          <Text style={styles.rating}>
            ⭐ {driver.rating} · {driver.trips.toLocaleString()} trips
          </Text>
          <Text style={styles.role}>Driver</Text>
        </View>

        {/* Car Info */}
        <View style={styles.card}>
          <Image source={{ uri: driver.carImage }} style={styles.carImage} />
          <View style={{ flex: 1, paddingLeft: 12 }}>
            <Text style={styles.carModel}>{driver.carModel}</Text>
            <Text style={styles.carDetails}>License: {driver.license}</Text>
            <Text style={styles.carDetails}>Color: {driver.color}</Text>
            <View style={styles.carFeatures}>
              <Ionicons name="snow" size={18} />
              <Text> AC</Text>
              <FontAwesome name="user" size={18} style={{ marginLeft: 12 }} />
              <Text> 4 seats</Text>
              <MaterialIcons
                name="luggage"
                size={18}
                style={{ marginLeft: 12 }}
              />
              <Text> Luggage</Text>
            </View>
          </View>
        </View>

        {/* Map */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: driver.location.latitude,
              longitude: driver.location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker key={driver.id} coordinate={driver.location}>
              <View style={styles.mapIcon}>
                <Ionicons name="car-sport" size={24} color="#4285F4" />
              </View>
            </Marker>
          </MapView>
          <Text style={styles.locationText}>
            <Entypo name="location-pin" size={16} color="blue" />{" "}
            {driver.address}
          </Text>
        </View>

        {/* Trip Stats */}
        <View style={styles.statRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{driver.experience}</Text>
            <Text style={styles.statLabel}>Experience</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {driver.trips.toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Total Trips</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{driver.acceptance}</Text>
            <Text style={styles.statLabel}>Acceptance</Text>
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <Text>{driver.languages.join(", ")}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferred Music</Text>
          <Text>{driver.music.join(", ")}</Text>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Reviews</Text>
          {driver.reviews.map((review: IReview, index: number) => (
            <View key={index} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewName}>{review.name}</Text>
                <Text>⭐ {review.stars}</Text>
              </View>
              <Text>{review.comment}</Text>
              <Text style={styles.reviewTime}>{review.time}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  profile: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 90, height: 90, borderRadius: 45 },
  name: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  rating: { fontSize: 14, color: "#555" },
  role: {
    backgroundColor: "#e0f0ff",
    color: "#007bff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
    fontSize: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  carImage: { width: 90, height: 60, borderRadius: 8 },
  carModel: { fontWeight: "bold", fontSize: 16 },
  carDetails: { color: "#666", marginVertical: 4 },
  carFeatures: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  mapContainer: { marginBottom: 20 },
  map: {
    height: 180,
    borderRadius: 12,
  },
  mapIcon: {
    backgroundColor: "white",
    padding: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
  },
  locationText: {
    marginTop: 8,
    fontSize: 13,
    color: "#444",
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "#f2f4f5",
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statValue: { fontWeight: "bold", fontSize: 16 },
  statLabel: { fontSize: 12, color: "#555" },
  section: { marginBottom: 20 },
  sectionTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 6 },
  reviewCard: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  reviewName: { fontWeight: "600" },
  reviewTime: { fontSize: 11, color: "#999", marginTop: 4 },
});

export default DriverDetailScreen;
