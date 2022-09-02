import { Text, StyleSheet, View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import axios from "axios";
import JSON from "../assets/json/en.json";
import { useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const VerificationScreen = () => {
  const navigation = useNavigation();
  const { verificationCode } = JSON;
  const { params } = useRoute();
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  const pin5Ref = useRef(null);
  const pin6Ref = useRef(null);

  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");
  const [pin5, setPin5] = useState("");
  const [pin6, setPin6] = useState("");
  const [error, setError] = useState(null);
  const requestCode = async () => {
    await axios.post("https://backoffice.socializus.com/api/login/sendcode", {
      email: params.email,
      subject: verificationCode.subject,
      message: verificationCode.message
    });
  };

  const requestPassword = async () => {
    let code = `${pin1}${pin2}${pin3}${pin4}${pin5}${pin6}`;
    try {
      const response = await axios.post("https://backoffice.socializus.com/api/login/checkcode", {
        email: params.email,
        code: code
      });
      if (response.data.result === "OK") {
        navigation.navigate("NewPassword", { email: params.email, code: code });
      }
    } catch (error) {
      if (error.response.status === 402) {
        setError("Code incorrect or expired");
      } else if (error.response.status === 404) {
        setError("Email doesn't exist");
      }
    }
  };
  return <ScrollView style={styles.forgotPage}>
    <Text style={styles.title}>{verificationCode.title}</Text>
    <View style={styles.container}>
      <Text style={styles.text}>{verificationCode.label_1}</Text>
    </View>
    <View style={{ flexDirection: "row", marginLeft: 58 }}>

      <TextInput
        ref={pin1Ref}
        style={styles.opt}
        keyboardType={"number-pad"}
        maxLength={1}
        onChangeText={(pin1) => {
          setPin1(pin1);
          if (pin1) {
            pin2Ref.current.focus();
          }
        }}
      />


      <TextInput
        ref={pin2Ref}
        style={styles.opt}
        keyboardType={"number-pad"}
        maxLength={1}
        onChangeText={(pin2) => {
          setPin2(pin2);
          if (pin2) {
            pin3Ref.current.focus();
          } else {
            pin1Ref.current.focus();
          }
        }}
      />


      <TextInput
        ref={pin3Ref}
        style={styles.opt}
        keyboardType={"number-pad"}
        maxLength={1}
        onChangeText={(pin3) => {
          setPin3(pin3);
          if (pin3) {
            pin4Ref.current.focus();
          } else {
            pin2Ref.current.focus();
          }
        }}
      />

      <TextInput
        ref={pin4Ref}
        style={styles.opt}
        keyboardType={"number-pad"}
        maxLength={1}
        onChangeText={(pin4) => {
          setPin4(pin4);
          if (pin4) {
            pin5Ref.current.focus();
          } else {
            pin3Ref.current.focus();
          }
        }}
      />
      <TextInput
        ref={pin5Ref}
        style={styles.opt}
        keyboardType={"number-pad"}
        maxLength={1}
        onChangeText={(pin5) => {
          setPin5(pin5);
          if (pin5) {
            pin6Ref.current.focus();
          } else {
            pin4Ref.current.focus();
          }
        }}
      />
      <TextInput
        ref={pin6Ref}
        style={styles.opt}
        keyboardType={"number-pad"}
        maxLength={1}
        onChangeText={(pin6) => {
          setPin6(pin6);
          if (!pin6) {
            pin5Ref.current.focus();
          }
        }}
      />
    </View>
    <View style={styles.btnContainer}>
      {
        error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
      }
      <TouchableOpacity

        onPress={() => {
          setError(null);
          requestPassword();
        }}
        style={styles.bigBtn}>
        <Text style={styles.btnText}>{verificationCode.button_1}</Text>
      </TouchableOpacity>

      <View style={{ alignItems: "center", marginTop: 63, marginBottom: 10 }}>
        <Text style={[styles.text, { width: 250, textAlign: "center", marginBottom: 0 }]}>{verificationCode.label_3}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          requestCode();
        }}
        style={styles.smallBtn}>
        <Text style={styles.smallBtnText}>{verificationCode.button_2}</Text>
      </TouchableOpacity>
    </View>


  </ScrollView >;
};


const styles = StyleSheet.create({
  forgotPage: {
    backgroundColor: "white",
    flex: 1,
    width: 450,
    alignSelf: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    lineHeight: 45,
    color: "#59C09B",
    marginLeft: 48,
    marginBottom: 66,
  },
  container: {
    width: 320,
    marginLeft: 48,
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18.46,
    marginBottom: 64
  },
  email: {
    alignItems: "center",
  },
  bigBtn: {
    backgroundColor: "#59c09b",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 280,
    marginTop: 55,
  },
  btnText: {
    color: "white",
    fontSize: 22,
    lineHeight: 33,
    fontWeight: "700",
  },
  btnContainer: {
    alignItems: "center"
  },
  opt: {
    width: 38.02,
    height: 35.24,
    backgroundColor: "white",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    marginRight: 12,
  },
  smallBtn: {
    height: 37,
    width: 88,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  smallBtnText: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
    color: "#59C09B",
  }


});
export default VerificationScreen;
