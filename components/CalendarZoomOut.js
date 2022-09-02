import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

export default function CalendarZoomOut({
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
}) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.clock}>{time}</Text>
      </View>
      <View
        style={[
          styles.eventInfoContainer,
          {
            backgroundColor:
              attendee && participant < 15
                ? "#D8EDE6"
                : attendee && participant === 15
                ? "#E1E0E0"
                : "#FDFDFD",
          },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
        <View style={styles.infosLine}>
          <Text style={styles.date}>{date}</Text>
          <View style={styles.participantContainer}>
            <View style={styles.emotePeople}></View>
            <Text style={styles.participant}>{participant}/15</Text>
          </View>
          {like ? (
            <View style={styles.like}></View>
          ) : (
            <View style={styles.notLike}></View>
          )}

          <Text style={styles.zipCode}>{zipCode}</Text>
          {free ? (
            <View style={styles.free}></View>
          ) : (
            <View style={styles.notFree}></View>
          )}
          <Text style={styles.type}>{type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeContainer: {
    backgroundColor: "#A60000",
    width: 41,
    height: 22,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  clock: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 17,
    color: "white",
  },
  eventInfoContainer: {
    backgroundColor: "#DDDDDD",
    width: 284,
    height: 74,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
  title: {
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 19.5,
  },
  infosLine: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
    color: "#F48A0D",
    marginRight: 3,
  },
  participantContainer: {
    flexDirection: "row",
    marginRight: 3,
  },
  emotePeople: {
    width: 20,
    height: 16,
    backgroundColor: "purple",
    marginRight: 3,
  },
  like: {
    width: 18,
    height: 18,
    backgroundColor: "pink",
    marginRight: 3,
  },
  notLike: {
    width: 18,
    height: 18,
    backgroundColor: "grey",
    marginRight: 3,
  },
  zipCode: {
    color: "#59C09B",
    fontSize: 13,
    lineHeight: 19.5,
    fontWeight: "600",
    marginRight: 3,
  },
  free: {
    width: 15,
    height: 15,
    backgroundColor: "black",
    marginRight: 3,
  },
  notFree: {
    width: 15,
    height: 15,
    backgroundColor: "yellow",
    marginRight: 3,
  },
  type: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600",
    color: "#001AFF",
  },
  participant: {
    fontWeight: "600",
    lineHeight: 19.5,
    fontSize: 13,
  },
});
