import { IRide } from "@/constants/interface";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const RideType = ({
  item,
  selectedRide,
  setSelectedRide,
}: {
  item: IRide;
  selectedRide: string;
  setSelectedRide: any;
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.rideOption,
        selectedRide === item.id && styles.rideOptionSelected,
      ]}
      onPress={() => setSelectedRide(item.id)}
    >
      <Ionicons name="car" size={24} color="black" />
      <Text style={styles.rideType}>{item.type}</Text>
      <Text>{item.price}</Text>
      <Text style={styles.eta}>⏱ {item.eta}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rideOption: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
    width: 120,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  rideOptionSelected: {
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  rideType: {
    fontWeight: "600",
    marginTop: 4,
  },
  eta: {
    color: "#666",
    fontSize: 12,
    marginTop: 2,
  },
});

export default RideType;
