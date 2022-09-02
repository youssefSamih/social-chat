import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { Dimensions } from 'react-native';
//import Logo from "../assets/images/LogoSocializus.png";
import JSON from "../assets/json/en.json";

const width = 450;
const height = '100%';
const HomeScreen = ({ navigation }) => {
  const { home } = JSON;
  return (<View style={styles.container}>

    <View style={styles.mousse}>
      <Image style={{ width: "100%", height: "100%" }} source={require("../assets/images/mousses.png")} />
    </View>
    <View style={[styles.mousse, { flexDirection: 'row' }]}>
      <View style={styles.topLeft}>
        <Image style={{ width: "130%", height: "100%" }} source={require("../assets/images/group.png")} />
      </View>
      <View style={styles.topRight}>
        <Image style={{ width: "100%", height: "100%" }} source={require("../assets/images/concept-image.png")} />
      </View>
    </View>
    <View style={styles.bottomContainer}>
      <View style={styles.bottomUpper}>
        <Image style={{ width: "100%", height: "100%" }} source={require("../assets/images/picnic.png")} />
      </View>
      <View style={styles.bottomLower}>
        <View style={styles.bottomLowercontent}>
          <Image style={{ width: "100%", height: "100%" }} source={require("../assets/images/fluo.png")} />
        </View>
        <View style={styles.bottomLowercontent}>
          <Image style={{ width: "100%", height: "100%" }} source={require("../assets/images/halloween.png")} />
        </View>
      </View>
    </View>
    <Image source={require("../assets/images/LogoSocializus.png")} style={styles.logo} />
    <View style={styles.btnContainer}>
      <View style={{ width: "50%", justifyContent: "center", alignItems: "center", borderRightWidth: 1, marginLeft: 20 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("LogIn");
          }}
          style={styles.leftBtn}>
          <Text style={styles.btnText}>{home.login}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnRight}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
          style={styles.leftBtn}>
          <Text style={styles.btnText}>{home.register}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomBox}>
        <View style={styles.textContainer}>
          <Text style={styles.infoLine}>{home.info_line1}</Text>
          <Text style={styles.infoLine}>{home.info_line2}</Text>
        </View>
      </View>

    </View>
  </View >);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: width,
    height: height,
    alignSelf: 'center',
  },
  mousse: {
    width: width,
    height: "28%",
    backgroundColor: "red"
  },
  topLeft: {
    height: "100%",
    backgroundColor: "green",
    width: "50%"
  },
  topRight: {
    height: "100%",
    backgroundColor: "purple",
    width: "50%"
  },
  bottomContainer: {
    width: width,
    height: "44%",
    backgroundColor: "orange"
  },
  bottomUpper: {
    width: width,
    height: "50%",
    backgroundColor: "yellow"
  },
  bottomLower: {
    width: width,
    height: "50%",
    backgroundColor: "blue",
    flexDirection: "row"
  },
  bottomLowercontent: {
    width: "50%",
    height: "100%",
    backgroundColor: "black"
  },
  logo: {
    width: 350,
    height: 221,
    position: "absolute",
    alignSelf: 'center',
    marginTop: 100
  },
  btnContainer: {
    width: 204,
    height: 35,
    borderRadius: 15,
    position: "absolute",
    flexDirection: "row",
    backgroundColor: "white",
    top: 414,
    left: 103.8, 
    alignSelf: 'center'
  },
  btnText: {
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 29,
    textAlign: "center"
  },
  btnRight: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    width: "58%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3A8569"
  },
  infoLine: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 18.46,
    textAlign: "center"
  },
  textContainer: {
    width: 305,
    height: 58,
    backgroundColor: "white",
    marginLeft: 20
  },
  bottomBox: {
    position: "absolute",
    top: 165,
    left: -57
  }

});


export default HomeScreen;
