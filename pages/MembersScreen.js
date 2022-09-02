import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

import MembersSquare from "../components/MembersSquare";

const ager = (birthday) => {
  const today = Date.now();
  const age = Math.floor((today - birthday) / 1000 / 60 / 60 / 24 / 365);
  return age;
};

const MembersScreen = ({ fromStack }) => {
  const [membersList, setMembersList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://backoffice.socializus.com/api/user/getuserlist?skip=0&limit=100`
      );
      setMembersList(response.data);
    } catch (error) {
      console.log("error");
    }
  };

  const renderItem = ({ item }) => {
    return item.sexe === "male" &&
      item.isPersonalAccount &&
      item.city &&
      item.firstName &&
      item.birthday &&
      item.avatar ? (
      <View style={styles.memberCard}>
        <MembersSquare
          city={item.city}
          age={ager(item.birthday)}
          name={item.firstName}
          avatar={item.avatar}
        />
      </View>
    ) : (
      <Text>non affichable</Text>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (fromStack === "male") {
    return (
      membersList.length > 0 && (
        <ScrollView>
          <View style={styles.container}>
            {membersList.map((member, index) => {
              return (
                member.sexe === "male" &&
                member.isPersonalAccount &&
                member.city &&
                member.firstName &&
                member.birthday &&
                member.avatar && (
                  <View key={index} style={styles.memberCard}>
                    <MembersSquare
                      style={styles.memberCard}
                      city={member.city}
                      age={ager(member.birthday)}
                      name={member.firstName}
                      avatar={member.avatar}
                      member={member}
                    />
                  </View>
                )
              );
            })}
          </View>
        </ScrollView>
      )
    );
  }
  if (fromStack === "pro") {
    return (
      membersList.length > 0 && (
        <ScrollView>
          <View style={styles.container}>
            {membersList.map((member, index) => {
              return (
                !member.isPersonalAccount &&
                member.city &&
                member.firstName &&
                member.birthday &&
                member.avatar && (
                  <View key={index} style={styles.memberCard}>
                    <MembersSquare
                      style={styles.memberCard}
                      city={member.city}
                      age={ager(member.birthday)}
                      name={member.firstName}
                      avatar={member.avatar}
                      member={member}
                    />
                  </View>
                )
              );
            })}
          </View>
        </ScrollView>
      )
    );
  }
  if (fromStack === "female") {
    return (
      membersList.length > 0 && (
        <ScrollView>
          <View style={styles.container}>
            {membersList.map((member, index) => {
              return (
                member.sexe === "female" &&
                member.isPersonalAccount &&
                member.city &&
                member.firstName &&
                member.birthday &&
                member.avatar && (
                  <View key={index} style={styles.memberCard}>
                    <MembersSquare
                      style={styles.memberCard}
                      city={member.city}
                      age={ager(member.birthday)}
                      name={member.firstName}
                      avatar={member.avatar}
                      member={member}
                    />
                  </View>
                )
              );
            })}
          </View>
        </ScrollView>
      )
    );
  }
};

export default MembersScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  memberCard: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
