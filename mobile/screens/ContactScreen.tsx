import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Platform } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MapView, { 
  Callout, 
  Marker, 
  PROVIDER_GOOGLE, 
  Polyline,
  Circle 
} from 'react-native-maps';
import { MapType } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import i18n from '@/lang/i18n';
import * as UserService from '@/services/UserService';
import Layout from '@/components/Layout';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface BarangayMarker {
  name: string;
  coordinates: Coordinates;
}

const BARANGAY_MARKERS: BarangayMarker[] = [
  {
    name: 'Catmon',
    coordinates: {
      latitude: 14.6651,
      longitude: 120.9569
    }
  },
  {
    name: 'Concepcion',
    coordinates: {
      latitude: 14.6722,
      longitude: 120.9574
    }
  },
  {
    name: 'Longos',
    coordinates: {
      latitude: 14.6633,
      longitude: 120.9477
    }
  },
  {
    name: 'Potrero',
    coordinates: {
      latitude: 14.6789,
      longitude: 120.9589
    }
  }
];

const ContactScreen = ({ navigation, route }: NativeStackScreenProps<StackParams, 'Contact'>) => {
  const isFocused = useIsFocused();
  const [reload, setReload] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mapType, setMapType] = useState<MapType>('standard');
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);
  const [selectedPoints, setSelectedPoints] = useState<Coordinates[]>([]);
  const [measuring, setMeasuring] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);
  const [showRadiusSearch, setShowRadiusSearch] = useState(false);
  const [searchRadius, setSearchRadius] = useState(1000); // 1km in meters

  const mapRef = useRef<MapView>(null);

  // Initial region (Malabon, Philippines)
  const INITIAL_REGION = {
    latitude: 14.67,
    longitude: 120.97,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const requestLocationPermissions = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required for this feature.');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  };

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermissions();
    if (!hasPermission) return;

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });

      const newLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };

      setCurrentLocation(newLocation);
      mapRef.current?.animateToRegion({
        ...newLocation,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    } catch (error) {
      Alert.alert('Error', 'Failed to get current location');
    }
  };

  const calculateDistance = (point1: Coordinates, point2: Coordinates): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (point2.latitude - point1.latitude) * Math.PI / 180;
    const dLon = (point2.longitude - point1.longitude) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.latitude * Math.PI / 180) * Math.cos(point2.latitude * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleMapPress = (event: any) => {
    if (!measuring) return;

    const newPoint = event.nativeEvent.coordinate;
    
    setSelectedPoints(prev => {
      const newPoints = [...prev, newPoint];
      if (newPoints.length === 2) {
        const dist = calculateDistance(newPoints[0], newPoints[1]);
        setDistance(dist);
        setMeasuring(false);
        return newPoints;
      }
      return newPoints;
    });
  };

  const startMeasuring = () => {
    setMeasuring(true);
    setSelectedPoints([]);
    setDistance(null);
    Alert.alert('Distance Measurement', 'Tap two points on the map to measure the distance between them.');
  };

  const toggleRadiusSearch = () => {
    setShowRadiusSearch(!showRadiusSearch);
    if (currentLocation) {
      setSelectedPoints([currentLocation]);
    }
  };

  const resetMap = () => {
    setSelectedPoints([]);
    setDistance(null);
    setMeasuring(false);
    setShowRadiusSearch(false);
    mapRef.current?.animateToRegion(INITIAL_REGION, 1000);
  };

  const _init = async () => {
    setVisible(false);
    const language = await UserService.getLanguage();
    i18n.locale = language;
    setVisible(true);
  };

  useEffect(() => {
    if (isFocused) {
      _init();
      setReload(true);
    } else {
      setVisible(false);
    }
  }, [route.params, isFocused]);

  const onLoad = () => {
    setReload(false);
  };

  return (
    <Layout style={styles.master} navigation={navigation} route={route} onLoad={onLoad} reload={reload}>
      {visible && (
        <View style={styles.master}>
          <View style={styles.controlPanel}>
            <TouchableOpacity
              style={[styles.mapButton, mapType === 'standard' && styles.activeButton]}
              onPress={() => setMapType('standard')}
            >
              <Text style={styles.buttonText}>Map</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mapButton, mapType === 'satellite' && styles.activeButton]}
              onPress={() => setMapType('satellite')}
            >
              <Text style={styles.buttonText}>Satellite</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <MapView
              ref={mapRef}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={INITIAL_REGION}
              mapType={mapType}
              onPress={handleMapPress}
            >
              {currentLocation && (
                <Marker
                  coordinate={currentLocation}
                  title="Your Location"
                  pinColor="blue"
                >
                  <Callout>
                    <Text>You are here</Text>
                  </Callout>
                </Marker>
              )}

              {/* Barangay Markers */}
              {BARANGAY_MARKERS.map((barangay, index) => (
                <Marker
                  key={index}
                  coordinate={barangay.coordinates}
                  pinColor="blue"
                >
                  <Callout>
                    <Text>Barangay {barangay.name}</Text>
                  </Callout>
                </Marker>
              ))}

              {selectedPoints.map((point, index) => (
                <Marker
                  key={`selected-${index}`}
                  coordinate={point}
                  pinColor="red"
                />
              ))}

              {selectedPoints.length === 2 && (
                <Polyline
                  coordinates={selectedPoints}
                  strokeColor="#000"
                  strokeWidth={2}
                  lineDashPattern={[5, 5]}
                />
              )}

              {showRadiusSearch && currentLocation && (
                <Circle
                  center={currentLocation}
                  radius={searchRadius}
                  fillColor="rgba(0, 128, 255, 0.2)"
                  strokeColor="rgba(0, 128, 255, 0.5)"
                />
              )}
            </MapView>

            <View style={styles.toolsPanel}>
              <TouchableOpacity 
                style={styles.toolButton}
                onPress={getCurrentLocation}
              >
                <MaterialIcons name="my-location" size={24} color="white" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.toolButton, measuring && styles.activeToolButton]}
                onPress={startMeasuring}
              >
                <MaterialIcons name="straighten" size={24} color="white" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.toolButton, showRadiusSearch && styles.activeToolButton]}
                onPress={toggleRadiusSearch}
              >
                <MaterialIcons name="radio-button-checked" size={24} color="white" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.toolButton}
                onPress={resetMap}
              >
                <MaterialIcons name="refresh" size={24} color="white" />
              </TouchableOpacity>
            </View>

            {distance !== null && (
              <View style={styles.distancePanel}>
                <Text style={styles.distanceText}>
                  Distance: {distance.toFixed(2)} km
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  master: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  controlPanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
    elevation: 5,
  },
  mapButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
  toolsPanel: {
    position: 'absolute',
    right: 16,
    top: 16,
    backgroundColor: 'transparent',
  },
  toolButton: {
    backgroundColor: '#007AFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 3,
  },
  activeToolButton: {
    backgroundColor: '#004999',
  },
  distancePanel: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  distanceText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default ContactScreen;