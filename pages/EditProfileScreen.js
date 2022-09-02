import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Fields from "../components/Fields";
import TwinSelectButton from "../components/TwinSelectButton";
import LogButton from "../components/LogButtons";
import EditBigSquare from "../components/EditBigSquare";
import MultilineFields from "../components/MultilineFields";
//import Camera from "../assets/images/camera.svg";
import Json from "../assets/json/en.json";
import SelectLanguage from "../components/SelectLanguage";
const { editProfile } = Json;

const saveProfileEntries = async () => {
  try {
    axios.post("");
  } catch (error) { }
};

const EditProfileScreen = ({ flags }) => {
  const [profilData, setProfilData] = useState(null);
  const [step, setStep] = useState(1);
  const [leftActive, setLeftActive] = useState(false);
  const [rightActive, setRightActive] = useState(false);
  const [accountType, setAccountType] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [nickName, setNickName] = useState(null);
  const [city, setCity] = useState(null);
  const [language, setLanguage] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pressed, setPressed] = useState(false);
  const [selected, setSelected] = useState(true);
  const [selectAccount, setSelectedAccount] = useState(true);
  const [picture, setPicture] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [errorCity, setErrorCity] = useState(null);
  const [errorNikName, setErrorNikName] = useState(null);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(null);
  const profileState = {
    accountType,
    setAccountType,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    nickName,
    setNickName,
    city,
    setCity,
    language,
    setLanguage,
  };

  //useEffect(() => { setisLoading(false); }, [step]);

  const initScreen = () => {
    if (!profilData.isPersonalAccount) {
      setLeftActive(true);
      setRightActive(false);
    } else {
      setLeftActive(false);
      setRightActive(true);
    }

    setFirstName(profilData.firstName);
    setCity(profilData.city);
    setLastName(profilData.lastName);
    setNickName(profilData.userName);
    setLanguage(profilData.nativeLanguage);
  };

  useEffect(() => {

    const getProfileData = async () => {
      console.log("getProfilData");
      setProfilData(JSON.parse(await AsyncStorage.getItem("Profile")));

      setisLoading(false);
    };

    if (!profilData) getProfileData();
    else {
      console.log(profilData);

      initScreen();
      setisLoading(false);

    }

  }, [profilData]);

  if (isLoading) return;

  if (step === 1) {


    const data = [
      { key: '0', value: 'French' },
      { key: '1', value: 'English' },
      { key: '2', value: 'Spanish' },
      { key: '3', value: 'Portugese' },
      { key: '4', value: 'German' },
      { key: '5', value: 'Italian' },
      { key: '6', value: 'Russian' },
      { key: '7', value: 'Chinese' },
      { key: '8', value: 'Indian' },
      { key: '9', value: 'Japanese' },
      { key: '10', value: 'Hebrew' },
      { key: '11', value: 'Hungarian' },
      { key: '12', value: 'Polish' },
      { key: '13', value: 'Romanian' },
      { key: '14', value: 'Greek' },
      { key: '15', value: 'Arab' },
    ];


    //console.log("AVATAR = ", profilData.avatar);
    return (

      <ScrollView style={styles.container}>
        {/* ----------------Titles---------------- */}
        <View style={styles.center}>
          <View style={styles.temporaryUserIcon}>
            <View style={styles.imgContainer}>

              <Image
                style={styles.img}
                source={require("../assets/images/avatar.png")}
              />

              <TouchableOpacity
                onPress={() => { getPermissionAndGetPicture(); }}
                style={styles.logo}>
                <Image source={require("../assets/images/camera.png")} style={{width: 30, height: 30}} />
              </TouchableOpacity>

            </View>
          </View>
          <View style={styles.proOrPerso}>
            <TwinSelectButton
              firstTitle={editProfile.step1.personal}
              secondTitle={editProfile.step1.pro}
              secondActive={rightActive}
              setSecondActive={setRightActive}
              profileState={profileState}
              active={leftActive}
              setActive={setLeftActive}
              setRightActive={setRightActive}
              setIsSelect={setSelectedAccount}
            />
          </View>
          {/* ----------------Fields---------------- */}
          <View style={styles.fields}>
            <Fields
              pressed={pressed}
              state={firstName}
              text={editProfile.step1.firstName}
              setState={setFirstName} />
          </View>
          {
            (errorMsg && !firstName) ? <Text style={{ color: "red", marginBottom: 10 }}>{errorMsg}</Text> :
              error && <Text style={{ color: "red" }}>{error}</Text>
          }
          <View style={styles.fields}>
            <Fields
              pressed={pressed}
              state={nickName}
              text={editProfile.step1.nickname}
              setState={setNickName} />
          </View>
          {
            (errorMsg && !nickName) ? <Text style={{ color: "red", marginBottom: 10 }}>{errorMsg}</Text> :
              errorNikName && <Text style={{ color: "red", }}>{errorNikName}</Text>
          }
          <View style={styles.fields}>
            <Fields
              pressed={pressed}
              state={city}
              text={editProfile.step1.city}
              setState={setCity} />
          </View>
          {
            (errorMsg && !city) ? <Text style={{ color: "red" }}>{errorMsg}</Text> :
              errorCity && <Text style={{ color: "red", }}>{errorCity}</Text>
          }
          <View style={styles.fields}>
            {<SelectLanguage
              pressed={pressed}
              selected={selected}
              setSelected={setSelected}
              data={data}
              setLanguage={setLanguage}
              flags={flags}
              index={index}
              setIndex={setIndex} />}
          </View>
          <View style={[styles.textContainer, { width: editProfile.step1.nativeLanguage.length * 9, top: (!city && errorMsg) ? 373 : 426 }]}>
            <Text style={[styles.inputText, { color: (pressed && !selected) ? "red" : "black" }]}>{editProfile.step1.nativeLanguage}</Text>
          </View>
        </View>

        {/* ----------------ValidationButtons---------------- */}
        <View style={styles.testEcarteur}></View>
        <View style={styles.savOrConButtons}>
          <TouchableOpacity style={styles.bigBtn}>
            <Text style={styles.btnText}>{editProfile.step2.save}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log(profilData);
              let errorFormat = false;
              let errorFields = false;
              setPressed(true);
              if (!firstName) {
                setErrorMsg("Field is required");
                errorFields = true;
              } else {
                for (let i = 0; i < firstName.length; i++) {
                  if (!((firstName.charCodeAt(i) > 64 && firstName.charCodeAt(i) < 91) || (firstName.charCodeAt(i) > 96 && firstName.charCodeAt(i) < 123))) {
                    setError("Fields must not contain numbers or special characters");
                    if (errorFormat === false) {
                      errorFormat = true;
                    }
                    break;
                  }
                }
              }
              if (!nickName) {
                setErrorMsg("Field is required");
                errorFields = true;
              } else {
                for (let i = 0; i < nickName.length; i++) {
                  if (!((nickName.charCodeAt(i) > 64 && nickName.charCodeAt(i) < 91) || (nickName.charCodeAt(i) > 96 && nickName.charCodeAt(i) < 123))) {
                    setErrorNikName("Fields must not contain numbers or special characters");
                    if (errorFormat === false) {
                      errorFormat = true;
                    }
                    break;
                  }
                }
              }
              if (!city) {
                setErrorMsg("Field is required");
                errorFields = true;
              } else {
                for (let i = 0; i < city.length; i++) {
                  if (!((city.charCodeAt(i) > 64 && city.charCodeAt(i) < 91) || (city.charCodeAt(i) > 96 && city.charCodeAt(i) < 123))) {
                    setErrorCity("Fields must not contain numbers or special characters");
                    if (errorFormat === false) {
                      errorFormat = true;
                    }
                    break;
                  }
                }
              }
              if (!errorFormat && !errorFields) {
                setStep(step + 1);
              }
            }
            }
            style={styles.bigBtn}>
            <Text style={styles.btnText}>{editProfile.step2.continue}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  if (step === 2) {
    return (
      <ScrollView style={styles.container}>
        {/* ----------------Titles---------------- */}
        <View style={styles.center}>
          <Text style={styles.title}>{editProfile.step2.secret}</Text>
          <Text style={styles.subTitle}>{editProfile.step2.info}</Text>
          <Text style={styles.important}>{editProfile.step2.warning}</Text>
        </View>
        <View style={styles.membership}>
          <Text style={styles.bold}>{editProfile.step2.membership}</Text>
          <Text style={styles.membershipNumber}>?????</Text>
        </View>
        {/* ----------------Fields---------------- */}
        <View style={styles.center}>
          <View style={styles.fields}>
            <Fields
              text={`${editProfile.step2.lastName}${editProfile.step2.noWorries}`}
              state={lastName}
              setState={setLastName}
            />
          </View>
          <View style={styles.fields}>
            <Fields text={editProfile.step2.phone} />
          </View>
          <View style={styles.fields}>
            <Fields text={editProfile.step2.birthday} />
          </View>
          <View style={styles.fields}>
            <Fields text={editProfile.step2.email} />
          </View>
        </View>
        {/* ----------------FriendsInfo---------------- */}
        <View style={styles.friendsNote}>
          <Text style={styles.bold}>{editProfile.step2.label}</Text>
        </View>
        <View style={styles.friendInfo}>
          <View style={styles.wrapped}>
            <EditBigSquare />
          </View>
          <View style={styles.wrapped}>
            <EditBigSquare style={styles.wrapped} />
          </View>
          <View style={styles.wrapped}>
            <EditBigSquare style={styles.wrapped} />
          </View>
          <View style={styles.wrapped}>
            <EditBigSquare style={styles.wrapped} />
          </View>
          <View style={styles.wrapped}>
            <EditBigSquare style={styles.wrapped} />
          </View>
        </View>
        {/* ----------------ValidationButtons---------------- */}
        <View style={styles.savOrConButtons}>
          <TouchableOpacity style={styles.bigBtn}>
            <Text style={styles.btnText}>{editProfile.step2.save}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setStep(step + 1)}
            style={styles.bigBtn}>
            <Text style={styles.btnText}>{editProfile.step2.continue}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  if (step === 3) {
    return (
      <ScrollView>
        {/* ----------------Titles---------------- */}
        <View>
          <Text style={styles.title}>{editProfile.step3.public}</Text>
        </View>
        <View>
          <Text style={styles.subTitle}>{editProfile.step3.info}</Text>
        </View>
        <View>
          <Text style={styles.bold}>{editProfile.step3.more}</Text>
        </View>
        {/* ----------------Fields---------------- */}
        <View style={styles.fields}>
          <MultilineFields lines={3} title={editProfile.step3.about} />
        </View>
        {/* ----------------Selects---------------- */}
        <View>
          <Text style={styles.bold}>{editProfile.step3.what}</Text>
        </View>
        <View>
          <Text style={styles.bold}>{editProfile.step3.spoken}</Text>
        </View>
        <View>
          <Text style={styles.bold}>{editProfile.step3.children}</Text>
        </View>
        <View>
          <Text style={styles.bold}>{editProfile.step3.tobacco}</Text>
        </View>
        <View>
          <Text style={styles.bold}>{editProfile.step3.alcohol}</Text>
        </View>
        {/* ----------------ValidationButtons---------------- */}
        <View style={styles.center}>
          <TouchableOpacity style={styles.bigBtn}>
            <Text style={styles.btnText}>{editProfile.step3.submit}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "white",
    flex: 1,
  },
  center: {
    alignItems: "center",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
  },
  title: {
    color: "#3A8569",
    marginTop: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitle: {
    color: "#3A8569",
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  important: {
    color: "red",
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  temporaryUserIcon: {
    backgroundColor: "lightgrey",
    width: 125,
    height: 125,
    borderRadius: 70,
    marginVertical: 20,
  },
  proOrPerso: {
    marginVertical: 15,
  },
  membership: {
    flexDirection: "row",
  },
  membershipNumber: {
    color: "#3A8569",
    marginLeft: 10,
    marginBottom: 15,
    fontWeight: "bold",
  },
  fields: {
    marginVertical: 10,
  },
  friendsNote: {
    marginTop: 30,
    marginBottom: 10,
  },
  friendInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
  },
  wrapped: {
    marginVertical: 10,
  },
  testEcarteur: {
    height: 30,
  },
  savOrConButtons: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
  },
  textContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    left: 95,
  },
  inputText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "300",
  },
  imgContainer: {
    width: 120,
    height: 120,
    marginTop: 180,
    marginBottom: 23,
    position: 'relative'
  },
  logo: {
    position: "absolute",
    left: 90,
    bottom: 183,
  },
  bigBtn: {
    backgroundColor: "#59c09b",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 150,
  },
  btnText: {
    color: "white",
    fontSize: 22,
    lineHeight: 33,
    fontWeight: "700",
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: -178,
    marginLeft: 3
  },
});
