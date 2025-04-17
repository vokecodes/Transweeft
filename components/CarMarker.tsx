import { IDriver } from "@/constants/interface";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Marker } from "react-native-maps";

const CarMarker = ({ driver }: { driver: IDriver }) => {
  return (
    <Marker coordinate={driver.location}>
      <View style={styles.mapIcon}>
        <Ionicons name="car-sport" size={24} color="#4285F4" />
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  mapIcon: {
    backgroundColor: "white",
    padding: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
  },
});

export default CarMarker;
