import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

// import LikeOff from "../assets/images/like-off.svg";
// import LikeOn from "../assets/images/like-on.svg";
// import Dollar from "../assets/images/dollar.svg";
// import Free from "../assets/images/free.svg";
// import Participants from "../assets/images/participants.svg";

export default function CalendarZoomIn({
  title,
  participant,
  zipCode,
  type,
  time,
  date,
  like,
  free,
  attendee,
  image,
  event,
  maxPeople,
  author,
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Activity", {
          event: event,
        });
      }}
      style={[
        styles.container,
        {
          backgroundColor:
            attendee && participant < maxPeople
              ? "#D8EDE6"
              : attendee && participant === 15
              ? "#E1E0E0"
              : "#FDFDFD",
        },
      ]}
    >
      <View style={styles.left}>
        <View style={styles.leftTop}>
          <Image
            style={styles.leftTop}
            source={{
              uri: image,
            }}
          />
        </View>
        <View
          style={[
            styles.leftBottom,
            {
              // backgroundColor: attendee && participant < 15 ? "#59C09B" : "#616161"
              backgroundColor: participant < 15 && "#59C09B",
              // attendee && participant < 15
              //   ? "#59C09B"
              //   : attendee && participant === 15
              //     ? "#616161"
              //     : null
            },
          ]}
        >
          {participant < 15 && (
            <Text style={styles.leftBottomText}>Attendee</Text>
          )}
          {participant === 15 && (
            <Text style={styles.leftBottomText}>Waiting List</Text>
          )}
        </View>
      </View>
      <View style={styles.emoteContainer}>
        {like ? (
          <Image source={require("../assets/images/like-on.png")} style={{width: 24, height: 24}} />
        ) : (
          <Image source={require("../assets/images/like-off.png")} style={{width: 24, height: 24}} />
        )}
        {free ? (
          <Image source={require("../assets/images/free.png")} style={{width: 12, height: 12}} />
        ) : (
          <Image source={require("../assets/images/dollar.png")} style={{width: 12, height: 12}} />
        )}
      </View>
      <View style={styles.right}>
        <Text style={styles.rightTop}>{title}</Text>
        <View style={styles.rightBottom}>
          <View style={styles.rightBottomCol}>
            <Text style={styles.time}>{time}</Text>
            <View style={styles.participantContainer}>
              <Image source={require("../assets/images/participants.png")} style={{width: 22, height: 18}} />
              <Text style={styles.participant}>{participant}/15</Text>
            </View>
          </View>

          <View style={styles.rightBottomCol}>
            <Text style={styles.date}>{new Date(date).toDateString()}</Text>
            <Text style={styles.zipCode}>{zipCode}</Text>
          </View>

          <View style={styles.rightBottomCol}>
            <View style={styles.image}>
              <Image
                style={styles.authorAvatar}
                source={{
                  // uri: author,
                  uri: image,
                }}
              />
            </View>
            <Text style={styles.type}>{type}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 335,
    height: 104,
    borderRadius: 10,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  left: {
    width: "29%",
    height: 82,
    borderRadius: 10,
    backgroundColor: "green",
    marginRight: 10,
  },
  leftTop: {
    width: "100%",
    height: 66,
    backgroundColor: "yellow",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  leftBottom: {
    height: 16,
    width: "100%",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  leftBottomText: {
    fontSize: 11,
    lineHeight: 16.5,
    fontWeight: "500",
    color: "white",
  },
  emoteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    width: 79,
    position: "absolute",
    top: 10,
    left: 15,
  },
  like: {
    width: 24,
    height: 24,
    backgroundColor: "pink",
  },
  notLike: {
    width: 24,
    height: 24,
    backgroundColor: "grey",
  },
  free: {
    width: 12,
    height: 12,
    backgroundColor: "black",
  },
  notFree: {
    width: 12,
    height: 12,
    backgroundColor: "purple",
  },
  right: {
    width: "68%",
    paddingRight: 10,
  },
  rightTop: {
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 19.5,
  },
  rightBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightBottomCol: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  participantContainer: {
    flexDirection: "row",
  },
  emotePeople: {
    width: 20,
    height: 16,
    backgroundColor: "purple",
    marginRight: 3,
  },
  date: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
    color: "#F48A0D",
  },
  zipCode: {
    color: "#59C09B",
    fontSize: 13,
    lineHeight: 19.5,
    fontWeight: "600",
  },
  time: {
    color: "#A60000",
    fontSize: 13,
    lineHeight: 19.5,
    fontWeight: "600",
  },
  type: {
    fontSize: 13,
    lineHeight: 19.5,
    fontWeight: "600",
    color: "#001AFF",
  },
  participant: {
    fontWeight: "600",
    lineHeight: 19.5,
    fontSize: 13,
    marginLeft: 8,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: "red",
  },
  authorAvatar: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
});
