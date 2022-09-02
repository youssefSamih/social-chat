import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import CalendarZoomOut from "../components/CalendarZoomOut.js";
import CalendarZoomIn from "../components/CalendarZoomIn.js";

const timer = (time) => {
  let stringTime = time.toString();
  let displayedTime = "";
  if (stringTime.length === 3) {
    for (let i = 0; i < stringTime.length; i++) {
      if (i === 0) {
        displayedTime += "0" + stringTime[i];
      }
      if (i === 1) {
        displayedTime += "h" + stringTime[i];
      }
      if (i > 1) {
        displayedTime += stringTime[i];
      }
    }
  }
  if (stringTime.length === 4) {
    for (let i = 0; i < stringTime.length; i++) {
      if (i < 2) {
        displayedTime += stringTime[i];
      }
      if (i === 2) {
        displayedTime += "h" + stringTime[i];
      }
      if (i > 2) {
        displayedTime += stringTime[i];
      }
    }
  }
  return displayedTime;
};

const ActivitiesScreen = ({ fromStack }) => {
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://backoffice.socializus.com/api/activities/getlist`
      );
      setEvents(response.data);
    } catch (error) {
      error.message;
    }
  };
  const fetchAvatar = async (id) => {
    const data = await axios.post(
      "https://backoffice.socializus.com/api/user/getavatarlistfromids",
      {
        indexs: ["630384f749c2200016e6c2a6"],
      }
    );

    let list = data.result;
    if (data.result > 0) {
      return list[0];
    }
  };
  const renderItem = ({ item }) => {
    const avatar = fetchAvatar(item.author);
    return (
      <View style={styles.eventCard}>
        <CalendarZoomIn
          title={item.title}
          date={item.date}
          participant={item.attendees.length}
          time={timer(item.startTime)}
          image={item.photo}
          event={item}
          author={avatar}
        />
      </View>
    );
  };
  useEffect(() => {
    fetchData();
  }, []);
  // return events.length > 0 && <Text>Activities page {fromStack}</Text>;
  if (fromStack === "calendar") {
    return (
      events.length > 0 && (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={events}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        </SafeAreaView>
      )
    );
  }
  if (fromStack === "upcomming activities") {
    return (
      events.length > 0 &&
      avatar.length !== null && (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={events}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        </SafeAreaView>
      )
    );
  }
  if (fromStack === "past activities") {
    return (
      events.length > 0 && (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={events}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        </SafeAreaView>
      )
    );
  }
  if (fromStack === "organized activities") {
    return (
      events.length > 0 && (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={events}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        </SafeAreaView>
      )
    );
  }
  if (fromStack === "filtered") {
    return (
      events.length > 0 && (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={events}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        </SafeAreaView>
      )
    );
  }
};
export default ActivitiesScreen;
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  eventCard: {
    marginVertical: 5,
    paddingHorizontal: 20,
  },
});
