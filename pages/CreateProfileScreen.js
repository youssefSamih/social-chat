import { useState } from "react";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import Json from '../assets/json/en.json';
import LogButton from "../components/LogButtons";

import TwinSelectButton from "../components/TwinSelectButton";

const CreateProfileScreen = ({ profileState, navigation }) => {
  const [pressed, setPressed] = useState(false);
  const [isSelectOne, setIsSelectOne] = useState(false);
  const [isSelectTwo, setIsSelectTwo] = useState(false);
  const [firstLeftActive, setFirstLeftActive] = useState(false);
  const [firstRightActive, setFirstRightActive] = useState(false);
  const [secondLeftActive, setSecondLeftActive] = useState(false);
  const [secondRightActive, setSecondRightActive] = useState(false);

  const { createProfile } = Json;
  const obj = {
    width: 318,
    profileState,
    isSelectOne,
    isSelectTwo,
    setPressed,
    currentPage: "Profile",
    navigate: navigation.navigate,
    path: "Step 2"
  };
  return (<SafeAreaView style={styles.profil}>
    <Text style={styles.title}>{createProfile.title}</Text>
    <View style={styles.gender}>
      <TwinSelectButton
        firstTitle={createProfile.male}
        secondTitle={createProfile.female}
        profileState={profileState}
        setIsSelect={setIsSelectOne}
        active={firstLeftActive}
        setActive={setFirstLeftActive}
        secondActive={firstRightActive}
        setSecondActive={setFirstRightActive}
        currentPAge={"Profile"}
      />
    </View>
    {
      (pressed && !isSelectOne) && <Text style={{ color: "red" }} >{"You need to select one in order to continue"}</Text>
    }
    <View style={styles.account}>
      <TwinSelectButton
        style={styles.account}
        firstTitle={createProfile.perso}
        secondTitle={createProfile.pro}
        profileState={profileState}
        setIsSelect={setIsSelectTwo}
        active={secondLeftActive}
        setActive={setSecondLeftActive}
        secondActive={secondRightActive}
        setSecondActive={setSecondRightActive}
        currentPAge={"Profile"}
      />
    </View>
    {
      (pressed && !isSelectTwo) && <Text style={{ color: "red" }} >{"You need to select one in order to continue"}</Text>
    }
    <View style={styles.btn}>
      <LogButton
        text={createProfile.button_1}
        width={318}
        profileState={profileState}
        isSelectOne={isSelectOne}
        isSelectTwo={isSelectTwo}
        setPressed={setPressed}
        currentPage={"Profile"}
        navigate={navigation.navigate}
        path={"Step 2"}

      />
    </View>

  </SafeAreaView>);

};

export default CreateProfileScreen;

const styles = StyleSheet.create({
  profil: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center"
  },
  gender: {
    marginTop: 257,
  },
  account: {
    marginTop: 24,
  },
  btn: {
    marginTop: 196
  },
  title: {
    fontSize: 41,
    fontWeight: "600",
    lineHeight: 45,
    color: "#59C09B",
    marginLeft: 38,
  }
});
