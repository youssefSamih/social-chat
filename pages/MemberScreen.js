import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";

import TopNav from "../Navigation/topTab";
import MembersScreen from "./MembersScreen";
import ActivitiesScreen from "./ActivitiesScreen";

import { ager } from "../utils/functionDate.js";

const MemberScreen = ({ route }) => {
  const member = route.params.member;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          style={styles.photo}
          source={{
            uri: member.avatar,
          }}
        />
        <View style={styles.legend}>
          <Text style={styles.legendTextName}>{member.firstName}</Text>
          <Text style={styles.legendTextAge}>
            , {ager(member.birthday)} years
          </Text>
        </View>
        <TopNav
          arg={[
            {
              link: "Profile",
              to: () => <MembersScreen fromStack="male" />,
            },
            {
              link: "My activities",
              to: () => <ActivitiesScreen fromStack="male" />,
              topNavArg: [
                {
                  link: "test",
                  to: () => (
                    <ActivitiesScreen fromStack="upcomming activities" />
                  ),
                },
                {
                  link: "toast",
                  to: () => <ActivitiesScreen fromStack="past activities" />,
                },
                {
                  link: "tist",
                  to: () => (
                    <ActivitiesScreen fromStack="organized activities" />
                  ),
                },
              ],
            },
            {
              link: "Friends",
              to: () => <MembersScreen fromStack="male" />,
            },
          ]}
        />
        <View style={{ backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>
          <Image style={{ marginTop: 20 }} source={require("../assets/images/profileContent.jpg")} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default MemberScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: 450,
    alignSelf: 'center'
  },
  photo: {
    height: 300,
    width: "100%",
  },
  legend: {
    height: 110,
    backgroundColor: "black",
    flexDirection: "row",
    paddingTop: 10,
    paddingLeft: 12
  },
  legendTextName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    paddingTop: 5,
  },
  legendTextAge: {
    color: "white",
    fontSize: 20,
    paddingTop: 10,
  },
});
