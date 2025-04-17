import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";

type LocationCoordinates = {
  latitude: number;
  longitude: number;
};

type LocationContextType = {
  currentLocation: string;
  locationCoordinates: LocationCoordinates;
  locationLoading: boolean;
  refreshLocation: () => Promise<void>;
};

const defaultCoordinates = {
  latitude: 40.7128,
  longitude: -74.006,
};

const LocationContext = createContext<LocationContextType>({
  currentLocation: "",
  locationCoordinates: defaultCoordinates,
  locationLoading: true,
  refreshLocation: async () => {},
});

export const useLocation = () => useContext(LocationContext);

type LocationProviderProps = {
  children: ReactNode;
};

export const LocationProvider = ({ children }: LocationProviderProps) => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [locationCoordinates, setLocationCoordinates] =
    useState<LocationCoordinates>(defaultCoordinates);
  const [locationLoading, setLocationLoading] = useState(true);

  const getLocationData = async () => {
    try {
      setLocationLoading(true);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        setLocationLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocationCoordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Get the address from coordinates
      let addressResponse = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (addressResponse && addressResponse.length > 0) {
        const address = addressResponse[0];
        const formattedAddress = `${address.street || ""} ${
          address.name || ""
        }, ${address.city || ""}, ${address.region || ""}`;
        setCurrentLocation(formattedAddress);
      }
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Could not retrieve your current location");
    } finally {
      setLocationLoading(false);
    }
  };

  // Initial location request
  useEffect(() => {
    getLocationData();
  }, []);

  const refreshLocation = async () => {
    await getLocationData();
  };

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        locationCoordinates,
        locationLoading,
        refreshLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
