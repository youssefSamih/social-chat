import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

//import MapLocation from '../assets/images/map-location.svg';

export default function MembersSquare({ name, age, city, avatar, member }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("Member", {
          member: member,
        });
      }}
    >
      <Image
        style={styles.top}
        source={{
          uri: avatar,
        }}
      />
      <View style={styles.bottom}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.infosContainer}>
          <Text style={[styles.infos, { marginRight: 14 }]}>{age} ans</Text>
          <View style={styles.cityContainer}>
            <Image source={require("../assets/images/maps-location.png")} style={{width: 14, height: 12}} />

            <Text style={styles.infos}>{city}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 184,
    borderRadius: 15,
    borderColor: "grey",
    borderWidth: 1,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
  },
  top: {
    width: 150,
    height: 113,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  bottom: {
    width: 150,
    height: 71,
    backgroundColor: "white",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    paddingLeft: 10,
    justifyContent: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 17,
    marginBottom: 5,
  },
  infosContainer: {
    flexDirection: "row",
  },
  cityContainer: {
    flexDirection: "row",
  },
  infos: {
    fontSize: 12,
    fonttWeight: "300",
    lineHeight: 14,
  },
  emote: {
    width: 14,
    height: 12,
    backgroundColor: "blue",
    marginRight: 2,
  },
});
