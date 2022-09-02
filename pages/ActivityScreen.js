import { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  Button,
} from "react-native";

import axios from "axios";
import LogButton from "../components/LogButtons";
import EventButton from "../components/EventButton";
import Json from "../assets/json/en.json";
// import GooglePicto from "../assets/images/googlemaps.svg";
// import ChatGroup from "../assets/images/chatGroup.svg";
// import ChatNotif from "../assets/images/chatNotif.svg";
// import Interessed from "../assets/images/interested.svg";
// import Follower from "../assets/images/follower.svg";
// import Participant from "../assets/images/participant.svg";
// import More from "../assets/images/more.svg";
// import Men from "../assets/images/men.svg";

const { activity } = Json;

import { timer } from "../utils/functionDate.js";

const ActivityScreen = ({ route }) => {
  const [display, setDisplay] = useState(1);
  const event = route.params.event;

  const [avatarList, setAvatarList] = useState([]);
  const [nbPeople, setNbPeople] = useState();
  const [loading, setLoading] = useState(true);
  console.log(event);
  useEffect(() => {
    const fetchAvatar = async () => {
      const { data } = await axios.post(
        "https://backoffice.socializus.com/api/user/getavatarlistfromids",
        {
          indexs: event.attendees,
        }
      );

      setNbPeople(data.result.length);

      let list = data.result;
      if (list.length > 5) list = list.slice(0, 5);

      setAvatarList(list);
      setLoading(false);
    };
    fetchAvatar();
  }, []);

  const attendees = [];

  if (loading) return;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.center}>
        <Image
          style={styles.photo}
          source={{
            uri: event.photo,
          }}
        />
        <View style={styles.legend}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              width: "100%",
              textAlign: "center",
            }}
          >
            {event.title}
          </Text>

          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 6,
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 16, color: "#b12020" }}
            >
              {timer(event.startTime)} - {timer(event.endTime)}
            </Text>

            <Text
              style={{ fontWeight: "bold", fontSize: 16, color: "#f48a0d" }}
            >
              {new Date(event.date).toDateString()}
            </Text>
          </View>

          <View
            style={{
              marginTop: 15,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "#59c09b",
                fontSize: 20,
                marginHorizontal: 15,
                flexShrink: 0,
              }}
            >
              750??
            </Text>
            <Image source={require("../assets/images/map.png")} style={{ marginRight: 10, flexShrink: 0, width: 20, height: 20 }} />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: "#ff0000",
                marginHorizontal: 15,
                flexShrink: 2,
                textAlign: "center",
              }}
            >
              Address available for participants only
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "#000",
            width: 340,
            borderRadius: 20,
            height: 50,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              backgroundColor: "#59c09b",
              height: 52,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#000",
              marginLeft: -2,
              marginTop: -2,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Description
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "transparent",
              height: 52,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 0.5,
              borderColor: "#000",
              marginTop: -2,
              zIndex: 1,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Address</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "transparent",
              height: 52,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#000",
              marginRight: -2,
              marginTop: -2,
            }}
          >
            <Image source={require("../assets/images/group-chat.png")} style={{width: 20, height: 20}} />
            <Image source={require("../assets/images/group-liked.png")} style={{width: 20, height: 20}}/>
          </View>
        </View>

        <View
          style={{
            style: 340,
            flexDirection: "row",
            marginVertical: 5,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 15, marginRight: 5 }}>Interessed</Text>
          <Image source={require("../assets/images/interested.png")} style={{width: 20, height: 20, marginLeft: 5, marginRight: 10}} />

          <Text style={{ fontSize: 15 }}>Followers</Text>
          <Image source={require("../assets/images/group-liked.png")} style={{width: 20, height: 20, marginLeft: 5, marginRight: 10}} />

          <Text style={{ fontSize: 15 }}>Participants</Text>
          <Image source={require("../assets/images/participant.png")} style={{width: 20, height: 20, marginLeft: 5}} />
        </View>

        <View style={{ flexDirection: "row", width: 340 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              width: 240,
            }}
          >
            {avatarList.map((o, index) => {
              return (
                <Image
                  key={index}
                  source={{ uri: o.avatar }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    marginRight: 15,
                  }}
                />
              );
            })}
          </View>

          {nbPeople > 5 && <Image source={require("../assets/images/more.png")} style={{width: 20, height: 20, marginRight: 15}} />}
          <View>
            <Image source={require("../assets/images/participants.png")} style={{width: 20, height: 20}} />
            <Text>
              {nbPeople} / {event.maxPeople}
            </Text>
          </View>
        </View>

        <View style={styles.inviteOrParticipate}>
          <EventButton type="invite" bgColor={"grey"} colorText={"white"} />
          <EventButton type="participate" bgColor={"lime"} />
        </View>
        {display === 1 && (
          <View style={styles.content}>
            <Text style={styles.about}>{activity.about}</Text>
            <View style={styles.longText}>
              <Text>
                Bonjour tout le monde La semaine est longue et tu n'en vois pas
                le bout ? Le blues du vendredi t'envahit ? Viens faire une pause
                avec nous et rompre la morosité de ton quotidien ! Au programme
                : discussion autour d'un verre - ou deux - pour faire
                connaissance, jeu pour se socialiser... Et puis si tu veux
                pratiquer ton anglais (ou toute autre langue), n'hésite surtout
                pas car beaucoup d'internationaux seront présents et nous nous
                réunissons aussi pour favoriser les échanges linguistiques et
                culturels. Au programme : discussion autour d'un verre - ou deux
                - pour faire connaissance, jeu pour se socialiser... Et puis si
                tu veux pratiquer ton anglais (ou toute autre langue), n'hésite
                surtout pas car beaucoup d'internationaux seront présents et
                nous nous réunissons aussi pour favoriser les échanges
                linguistiques et culturels.Au programme : discussion autour d'un
                verre - ou deux - pour faire connaissance, jeu pour se
                socialiser... Et puis si tu veux pratiquer ton anglais (ou toute
                autre langue), n'hésite surtout pas car beaucoup
                d'internationaux seront présents et nous nous réunissons aussi
                pour favoriser les échanges linguistiques et culturels.
              </Text>
            </View>
            <View style={styles.inviteOrParticipate}>
              <EventButton type="invite" bgColor={"grey"} />
              <EventButton type="participate" bgColor={"orange"} />
            </View>
            <View style={styles.inviteOrParticipate}>
              <EventButton type="invite" bgColor="black" colorText="white" />
              <EventButton type="participate" bgColor={"red"} />
            </View>
          </View>
        )}
        {display === 2 && (
          <View>
            <Text>{activity.how}</Text>
          </View>
        )}
        {display === 3 && (
          <View>
            <Text>chatView</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default ActivityScreen;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  center: {
    alignItems: "center",
  },
  photo: {
    height: 260,
    width: 390,
  },
  legend: {
    width: 340,

    backgroundColor: "white",
    top: -25,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  legendTextTitle: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  legendTextTime: {
    color: "darkred",
    fontWeight: "bold",
    fontSize: 15,
  },
  screenNav: {
    flexDirection: "row",
    borderRadius: 16,
    backgroundColor: "blue",
    justifyContent: "space-around",
    width: 340,
    height: 50,
    borderColor: "black",
    borderWidth: 1,
  },
  buttonNav: {
    borderColor: "black",
    borderWidth: 4,
    width: 100,
    height: 100,
    backgroundColor: "white",
  },
  stats: {
    width: 340,
    height: 50,
    backgroundColor: "pink",
  },
  participants: {
    width: 340,
    height: 50,
    backgroundColor: "yellow",
  },
  inviteOrParticipate: {
    width: 340,
    flexDirection: "row",
    justifyContent: "space-around",
    height: 60,
    paddingTop: 10,
    alignItems: "flex-end",
  },
  content: {
    width: 340,
  },
  about: {
    paddingVertical: 10,
    paddingLeft: 10,
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "left",
  },
  longText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "white",
  },
});
