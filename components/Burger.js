import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image
} from "react-native";

import Avatar from "../assets/images/avatar.svg";
// import Concept from "../assets/images/concept.svg";
// import ContactUs from "../assets/images/contact-us.svg";
// import CreateActivity from "../assets/images/create-activity.svg";
// import EditProfile from "../assets/images/edit-profile.svg";
// import InviteFriends from "../assets/images/invite-friends.svg";
// import Logout from "../assets/images/logout.svg";
// import Notification from "../assets/images/notifications.svg";
// import PastActivities from "../assets/images/past-activities.svg";
// import Terms from "../assets/images/terms.svg";
// import Update from "../assets/images/update.svg";

const Burger = ({ func }) => {
  const width = 30;
  const height = 30;

  const datas = [
    { key: "Concept", img: <Image source={require("../assets/images/concept.png")} style={{width: width, height: height}} /> },
    {
      key: "Edit my Profile",
      img: <Image source={require("../assets/images/edit-profile.png")} style={{width: width, height: height}} />,
    },
    {
      key: "Create An Activity",
      img: <Image source={require("../assets/images/create-activity.png")} style={{width: width, height: height}} />,
    },
    {
      key: "Past Activities",
      img: <Image source={require("../assets/images/past-activities.png")} style={{width: width, height: height}} />,
    },
    {
      key: "Invite Friends",
      img: <Image source={require("../assets/images/invitation.png")} style={{width: width, height: height}} />,
    },
    { key: "Contact Us", img: <Image source={require("../assets/images/contact-us.png")} style={{width: width, height: height}} /> },
    {
      key: "Notification",
      img: <Image source={require("../assets/images/bell.png")} style={{width: width, height: height}} />,
    },
    { key: "Update", img: <Image source={require("../assets/images/update.png")} style={{width: width, height: height}} /> },
    {
      key: "Terms and Conditions",
      img: <Image source={require("../assets/images/update.png")} style={{width: width, height: height}} />,
    },
    { key: "Logout", img: <Image source={require("../assets/images/update.png")} style={{width: width, height: height}} /> },
  ];

  return (
    <SafeAreaView style={styles.burger}>
      <View style={styles.headBurger}>
        <View style={styles.profile}>
          <Image source={require("../assets/images/avatar2.png")} style={{width: 65, height: 65}} />
          <Text style={styles.nameProfile}>Alex</Text>
        </View>
        <TouchableOpacity onPress={func} style={styles.cross}>
          <Text style={{ color: "#ffffff" }}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <FlatList
          data={datas}
          renderItem={({ item }) => {
            return (
              <View style={styles.flex}>
                {item.img}
                <Text style={styles.itemText}>{item.key}</Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Burger;

const styles = StyleSheet.create({
  burger: {
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  headBurger: {
    backgroundColor: "#59C09B",
    paddingTop: 15,
    paddingBottom: 8,
    paddingLeft: 23,
    fontSize: 15,
    flexDirection: "row",
    position: "relative",
  },
  cross: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#001AFF",
    padding: 5,
  },
  profile: {
    width: 65,
  },
  nameProfile: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#001AFF",
    textAlign: "center",
  },
  flex: {
    paddingLeft: 23,
    paddingRight: 10,
    marginTop: 19,
    flexDirection: "row",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 15,
    marginLeft: 15,
  },
});
