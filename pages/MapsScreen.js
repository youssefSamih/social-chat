import axios from "axios";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import MapView from "react-native-maps";

const MapsScreen = ({ fromStack }) => {
  const [markers, setMarkers] = useState([]);
  // return <Text>Maps page</Text>;

  const fetchActivitiesLocations = async () => {
    try {
      const response = await axios.get(
        "https://backoffice.socializus.com/api/activities/getlist"
      );
      const stepArray = [];
      response.data.forEach((event) => {
        stepArray.push({
          id: event._id,
          latitude: event.mapLatitude,
          longitude: event.mapLongitude,
          title: event.title,
          description: "no",
        });
      });
      setMarkers(stepArray);
      console.log(markers);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchActivitiesLocations();
  }, []);

  if ((fromStack = "activities")) {
    return (
      markers.length > 0 && (
        <MapView
          // La MapView doit obligatoirement avoir des dimensions
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 48.856614,
            longitude: 2.3522219,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
          showsUserLocation={true}
        >
          {console.log(markers)}
          {markers.map((marker) => {
            return (
              <MapView.Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.longitude,
                  longitude: marker.latitude,
                }}
                title={marker.title}
                description={marker.description}
              />
            );
          })}
        </MapView>
      )
    );
  }
};

export default MapsScreen;
