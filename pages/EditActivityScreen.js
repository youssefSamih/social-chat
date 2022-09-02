import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import MapView from "react-native-maps";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Fields from "../components/Fields";
import LogButton from "../components/LogButtons";
import MultilineFields from "../components/MultilineFields";
import axios from "axios";
import Json from "../assets/json/en.json";
import activities from "../assets/json/activityList.json";

//import { SvgUri } from "react-native-svg";
import CalendarField from "../components/CalendarField";
import SwitchBtn from "../components/SwitchBtn";
import TimePickerComponent from "../components/TimePickerComponent";
import BasicNumericStepper from "../components/BasicNumericStepper";
import InputField from "../components/InputField";

// import PhotoSvg from "../assets/images/photo.svg"
// import CheckboxSvg from "../assets/images/checkbox.svg"
import { useNavigation } from "@react-navigation/native";

const { createActivity, editProfile } = Json;

const EditActivityScreen = ({ userToken }) => {
  const defaultLongitude = 2.347;
  const defaultLatitude = 48.859;

  const [step, setStep] = useState(1);
  const [forbiddenPeople, setForbiddenPeople] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [online, setOnline] = useState(false);
  const [mapLatitude, setMapLatitude] = useState(defaultLatitude);
  const [mapLongitude, setMapLongitude] = useState(defaultLongitude);
  const [date, setDate] = useState("");

  const [startTime, setStartTime] = useState({ hours: 18, minutes: 30 });
  const [endTime, setEndTime] = useState({ hours: 22, minutes: 30 });

  const [maxPeople, setMaxPeople] = useState(10);
  const [nbFriend, setNbFriend] = useState(0);

  const [hasPrice, setHasPrice] = useState(false);
  const [priceValue, setPriceValue] = useState();
  const [ticketLink, setTicketLink] = useState("");

  const [topic, setTopic] = useState(-1);
  const [description, setDescription] = useState("");
  const [howToFind, setHowToFind] = useState("");
  const [fake, setFake] = useState(true);
  const [unlimited, setUnlimited] = useState(false);

  const [activityList, setActivityList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [allowCoOrg, setAllowCoOrg] = useState(true);
  const [restriction, setRestriction] = useState(false);
  const [useSocial, setUseSocial] = useState(false);

  const navigation = useNavigation();

  const showError = (text) => {
    setErrorMessage(text);
    setStep(step - 1);
  };

  useEffect(() => {
    if (step === 2) {
      //quand on passe de l'étape 1 a l'étape 2
      if (title === "") return showError("You must enter a title");
      else if (address === "")
        return showError(
          "You must enter an address or select a point on the map"
        );
      else if (date === "") return showError("You must select a date");
      else if (hasPrice && isNaN(priceValue))
        return showError("the price value is invalid");
      else if (hasPrice && ticketLink === "")
        return showError(
          "An event with a price require a link to buy a ticket"
        );
    }

    if (step === 3) {
      //quand on passe de l'étape 2 a l'étape 3
      if (topic === -1) return showError("You must select a topic");
    }

    if (step === 4) {
      //quand on passe de l'étape 3 a l'étape 4
      if (description === "") return showError("You must write a description");
      if (howToFind === "")
        return showError("You must explain how to find the event");
    }

    if (activityList === null) {
      const fetchActivityList = async () => {
        const { data } = await axios.get(
          "https://backoffice.socializus.com/api/assets/activities"
        );
        setActivityList(data);
        setLoading(false);
      };

      fetchActivityList();
    }

    if (step === 1 && address != "" && address.substr(0, 3) !== "GPS") {
      const fetchAddressCoord = async () => {
        let paris = "";
        if (address.indexOf("paris") === -1 && address.indexOf("Paris") === -1)
          paris = "+Paris";

        const addressParam = address.split(" ").join("+");
        const { data } = await axios.get(
          "https://api-adresse.data.gouv.fr/search/?q=" + addressParam + paris
        );

        const coords = data.features[0].geometry.coordinates;
        setMapLongitude(coords[0]);
        setMapLatitude(coords[1]);
      };

      fetchAddressCoord();
    }
  }, [step, address]);

  if (loading) return;

  if (step === 1) {
    return (
      <ScrollView style={[styles.container]}>
        {/* ----------------Titles---------------- */}
        <Text
          style={[
            styles.bold,
            { width: "100%", textAlign: "center", marginVertical: 10 },
          ]}
        >
          {createActivity.step1.create}
        </Text>

        <View style={styles.fields}>
          <InputField
            {...{
              title: createActivity.step1.activity,
              width: 340,
              state: title,
              setState: setTitle,
              style: { marginBottom: 5 },
            }}
          />
        </View>

        <View style={styles.fields}>
          <InputField
            {...{
              title: createActivity.step1.info,
              width: 340,
              state: address,
              setState: setAddress,
            }}
          />
        </View>
        <View>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: mapLatitude,
              longitude: mapLongitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            onPress={(e) => {
              setMapLongitude(e.nativeEvent.coordinate.longitude);
              setMapLatitude(e.nativeEvent.coordinate.latitude);
              setAddress(
                "GPS latitude:" +
                  e.nativeEvent.coordinate.latitude.toFixed(4) +
                  " - longitude : " +
                  e.nativeEvent.coordinate.latitude.toFixed(4)
              );
            }}
          >
            <MapView.Marker
              coordinate={{ latitude: mapLatitude, longitude: mapLongitude }}
            />
          </MapView>
        </View>

        <CalendarField
          {...{
            width: 340,
            title: "Date",
            state: date,
            setState: setDate,
            style: { marginBottom: 25, marginTop: 15 },
          }}
        />
        <TimePickerComponent
          {...{
            title: "Start",
            width: 220,
            state: startTime,
            setState: setStartTime,
            style: { marginBottom: 25 },
          }}
        />
        <TimePickerComponent
          {...{
            title: "End  ",
            width: 220,
            state: endTime,
            setState: setEndTime,
          }}
        />

        <View style={{ marginTop: 20, flexDirection: "row", width: 340 }}>
          <Text style={[styles.bold, { fontSize: 18 }]}>
            {createActivity.step1.unlimited}
          </Text>
          <SwitchBtn
            {...{
              state: unlimited,
              setState: setUnlimited,
              style: { marginLeft: 25, marginBottom: 8 },
            }}
          />
        </View>

        <Text style={{ marginBottom: 20 }}>{createActivity.step1.theOnly}</Text>

        <View>
          {unlimited && (
            <View
              style={{
                backgroundColor: "#ffffff",
                width: 340,
                height: 85,
                opacity: 0.75,
                position: "absolute",
                zIndex: 3,
              }}
            />
          )}
          <Text style={[styles.bold, { fontSize: 18, marginBottom: 10 }]}>
            {createActivity.step1.attendee}
          </Text>
          <BasicNumericStepper
            {...{
              width: 340,
              minVal: 2,
              maxVal: 20,
              state: maxPeople,
              setState: setMaxPeople,
              style: { marginBottom: 15 },
            }}
          />
        </View>

        <View style={{ flexDirection: "row", width: 340 }}>
          <Text style={[styles.bold, { fontSize: 18 }]}>
            {createActivity.step1.price}
          </Text>
          <SwitchBtn
            {...{
              state: hasPrice,
              setState: setHasPrice,
              style: { marginLeft: 25, marginBottom: 8 },
            }}
          />
        </View>

        <View>
          {!hasPrice && (
            <View
              style={{
                backgroundColor: "#ffffff",
                width: 340,
                height: 130,
                opacity: 0.75,
                position: "absolute",
                zIndex: 3,
              }}
            />
          )}

          <View style={styles.fields}>
            <Fields
              text={createActivity.step1.price}
              state={priceValue}
              setState={setPriceValue}
            />
          </View>
          <View style={styles.fields}>
            <Fields
              text={createActivity.step1.buyTicket}
              state={ticketLink}
              setState={setTicketLink}
            />
          </View>
        </View>

        <Text style={[styles.bold, { fontSize: 18, marginTop: 10 }]}>
          {createActivity.step1.howMuch}
        </Text>

        <BasicNumericStepper
          {...{
            width: 340,
            minVal: 0,
            maxVal: 10,
            state: nbFriend,
            setState: setNbFriend,
            style: { marginBottom: 15 },
          }}
        />
        {/* ------------Save or Continue------------ */}
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            fontWeight: "bold",
            color: "#ff0000",
          }}
        >
          {errorMessage}
        </Text>
        <View style={styles.savOrConButtons}>
          <LogButton
            text={editProfile.step2.continue}
            width={150}
            func={(n) => {
              setErrorMessage("");
              setStep(n);
            }}
            arg={step + 1}
          />
        </View>
      </ScrollView>
    );
  }
  if (step === 2) {
    return (
      <ScrollView style={[styles.container]}>
        {/* ----------------Titles---------------- */}
        <Text style={styles.bold}>{createActivity.step2.choose}</Text>
        <Text>{createActivity.step2.inOrder}</Text>

        <View
          style={{
            flexWrap: "wrap",
            marginTop: 15,
            width: "100%",
            flexDirection: "row",
          }}
        >
          {activityList.map((obj, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  margin: 3,
                  borderColor: "#000000",
                  borderWidth: 1,
                  borderRadius: 10,
                  width: 80,
                  height: 100,
                  backgroundColor: topic === index ? "#59c09b" : "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  setTopic(index);
                }}
              >
                {/*<SvgUri width="60" height="60" uri={obj.urls[1]} />*/}
                <Text
                  style={{
                    fontSize: 12.5,
                    fontWeight: topic === index ? "bold" : "400",
                    marginTop: 4,
                  }}
                >
                  {activities.liste[index].name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ------------Save or Continue------------ */}
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            fontWeight: "bold",
            color: "#ff0000",
          }}
        >
          {errorMessage}
        </Text>
        <View style={styles.savOrConButtons}>
          <LogButton
            text={createActivity.step3.goBack}
            width={150}
            func={(n) => {
              setErrorMessage("");
              setStep(n);
            }}
            arg={step - 1}
          />
          <LogButton
            text={createActivity.step3.continue}
            width={150}
            func={(n) => {
              setErrorMessage("");
              setStep(n);
            }}
            arg={step + 1}
          />
        </View>
      </ScrollView>
    );
  }
  if (step === 3) {
    return (
      <ScrollView style={styles.container}>
        {/* ----------------Titles---------------- */}
        <Text
          style={[
            styles.bold,
            { width: "100%", textAlign: "center", marginVertical: 10 },
          ]}
        >
          {createActivity.step3.please}
        </Text>

        <Text style={{ marginLeft: 20, marginTop: 10 }}>
          {createActivity.step3.addPhoto}
        </Text>

        <TouchableOpacity
          style={{
            width: 300,
            height: 90,
            backgroundColor: "#dcf1ea",
            borderRadius: 10,
            marginLeft: 20,
            marginTop: 10,
            marginBottom: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: "#59bf9b",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/images/camera-rond.png")}
              style={{ width: 20, height: 20 }}
            />
          </View>
        </TouchableOpacity>

        <View style={[styles.fields, { marginLeft: 10, marginBottom: 20 }]}>
          <MultilineFields
            title={createActivity.step3.description}
            state={description}
            setState={setDescription}
            lines={10}
          />
        </View>
        <View style={[styles.fields, { marginLeft: 10 }]}>
          <MultilineFields
            title={createActivity.step3.how}
            state={howToFind}
            setState={setHowToFind}
            lines={7}
          />
        </View>
        {/* ------------Save or Continue------------ */}

        <Text
          style={{
            width: "100%",
            textAlign: "center",
            fontWeight: "bold",
            color: "#ff0000",
          }}
        >
          {errorMessage}
        </Text>

        <View style={styles.savOrConButtons}>
          <LogButton
            text={createActivity.step3.goBack}
            width={150}
            func={(n) => {
              setErrorMessage("");
              setStep(n);
            }}
            arg={step - 1}
          />
          <LogButton
            text={createActivity.step3.continue}
            width={150}
            func={(n) => {
              setErrorMessage("");
              setStep(n);
            }}
            arg={step + 1}
          />
        </View>
      </ScrollView>
    );
  }
  if (step === 4) {
    return (
      <ScrollView style={styles.container}>
        {/* ----------------Titles---------------- */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 25,
          }}
        >
          <Text style={[styles.bold, { color: "#1e7354", fontSize: 16 }]}>
            {createActivity.step4.allow}
          </Text>
          <SwitchBtn
            {...{
              state: allowCoOrg,
              setState: setAllowCoOrg,
              style: { marginRight: 10 },
            }}
          />
        </View>

        <View style={{ flexDirection: "row", marginTop: 30, marginBottom: 15 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {createActivity.step4.manage}
          </Text>
          <SwitchBtn
            {...{
              state: restriction,
              setState: setRestriction,
              style: { marginLeft: 15 },
            }}
          />
        </View>

        {restriction && (
          <View
            style={{
              width: 150,
              height: 40,
              borderColor: "#59c09b",
              borderWidth: 1,
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/images/checkbox.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text style={{ marginLeft: 10 }}>Select People</Text>
          </View>
        )}

        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <Text style={[styles.bold, { color: "#1e7354", fontSize: 16 }]}>
            {createActivity.step4.other}
          </Text>
          <SwitchBtn
            {...{
              state: useSocial,
              setState: setUseSocial,
              style: { marginLeft: 15 },
            }}
          />
          {/*  */}
        </View>

        {useSocial && (
          <View style={{ marginLeft: 10, marginTop: 15 }}>
            <View style={styles.fields}>
              <Fields text={createActivity.step4.whatsapp} />
            </View>
            <View style={styles.fields}>
              <Fields text={createActivity.step4.fbGroup} />
            </View>
            <View style={styles.fields}>
              <Fields text={createActivity.step4.fbPage} />
            </View>
            <View style={styles.fields}>
              <Fields text={createActivity.step4.meetup} />
            </View>
            <View style={styles.fields}>
              <Fields text={createActivity.step4.telegram} />
            </View>
            <View style={styles.fields}>
              <Fields text={createActivity.step4.link} />
            </View>
          </View>
        )}

        {/* ------------Save or Continue------------ */}
        <View style={[styles.savOrConButtons, { marginTop: 40 }]}>
          <LogButton
            text={createActivity.step3.goBack}
            width={150}
            func={setStep}
            arg={step - 1}
          />
          <LogButton
            text={createActivity.step4.publish}
            width={150}
            func={() => {
              const sendRequest = async () => {
                try {
                  const token = await AsyncStorage.getItem("userToken");

                  const t = date.split("-");
                  const dateTime = new Date(t[0], t[1], t[2]).getTime();
                  const timeStart = startTime.hours + "" + startTime.minutes;
                  const timeEnd = endTime.hours + "" + endTime.minutes;

                  const formData = new FormData();
                  formData.append("title", title);
                  formData.append("isOnline", false);
                  formData.append("address", address);
                  formData.append("latitude", mapLatitude);
                  formData.append("longitude", mapLongitude);
                  formData.append("date", dateTime);
                  formData.append("start", timeStart);
                  formData.append("end", timeEnd);
                  formData.append("attendeeLimit", maxPeople);
                  formData.append("price", hasPrice ? priceValue : "zero");
                  formData.append("ticketLink", ticketLink);
                  formData.append("topic", topic);
                  formData.append("description", description);
                  formData.append("howToFind", howToFind);
                  formData.append("fbPage", "");
                  formData.append("fbGroup", "");
                  formData.append("whatsapp", "");
                  formData.append("meetup", "");
                  formData.append("telegram", "");
                  formData.append("otherPage", "");
                  formData.append("allowCoOrganiser", allowCoOrg);

                  const { data } = await axios.post(
                    "https://backoffice.socializus.com/api/activities/createactivity",
                    formData,
                    {
                      headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );

                  console.log("REQUEST RESPONSE = ", data);

                  navigation.navigate("Activity", {
                    event: data.activity,
                  });
                } catch (e) {
                  console.log("REQUEST ERROR : ", e);
                }
              };

              sendRequest();
            }}
            arg={null}
          />
        </View>
      </ScrollView>
    );
  }
};

export default EditActivityScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
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
    borderRadius: "70%",
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
  map: {
    height: 150,
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
});
