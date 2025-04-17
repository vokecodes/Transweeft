import { IDriver } from "@/constants/interface";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DriverCard = ({ driver }: { driver: IDriver }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.driverCard}
      onPress={() =>
        router.push({
          pathname: "/detail",
          params: { driver: JSON.stringify(driver) },
        })
      }
    >
      <Image source={{ uri: driver.image }} style={styles.avatar} />
      <View style={styles.driverInfo}>
        <Text style={styles.driverName}>{driver.name}</Text>
        <Text style={styles.driverCar}>
          {driver.carModel} • {driver.license}
        </Text>
        <View style={styles.ratingRow}>
          <Text style={styles.star}>⭐ {driver.rating}</Text>
          <Text style={styles.distance}> • {driver.distance}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => router.push("/request")}
        style={styles.requestButton}
      >
        <Text style={styles.distance}> Request</Text>
        <Ionicons name="car-outline" size={20} color="#959CA9" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  requestButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 12,
  },
});

export default DriverCard;
