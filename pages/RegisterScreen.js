import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import Json from "../assets/json/en.json";
import Fields from "../components/Fields";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = ({ navigation, setToken, setProfile, setUserProfile }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passConfirm, setPassConfirm] = useState(null);
  const [pressed, setPressed] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [emptyFields, setEmptyFields] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);

  const { register } = Json;

  const requestRegister = async () => {
    setProfile(null);

    /*
    await AsyncStorage. removeItem("userProfile")
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("Profile");
    */
    let same = true;
    setErrorMsg(null);
    if (email) {

      if (email.indexOf("@") === -1 || email.split("@")[1].length < 4 || email.split("@")[1].indexOf('.') === -1 || email.split("@")[1].split(".")[1].length < 2 || email.split("@")[1].split(".")[1].length > 4) {
        setErrorEmail("This email address is not valid");
      }
    } else {
      setEmptyFields("This field is required");
    }
    if (password && passConfirm) {
      if (password.length === passConfirm.length) {
        for (let i = 0; i < password.length; i++) {
          if (password[i] !== passConfirm[i]) {
            same = false;
            break;
          }
        }
        if (same) {
          try {
            const response = await axios.post("https://backoffice.socializus.com/api/login/signup", {
              email: email,
              pass: password,
            });
            if (response) {
              console.log(response.data);
              setToken(response.data.user.token);
            }
          } catch (error) {
            console.error(error)
            if (error.response.status === 400) {
             // setErrorMsg("Wrong format on Email and/or Password");
             setErrorMsg(error.response.data);
            } else if (error.response.status === 401) {
             // setErrorMsg("Wrong Email and/or Password");
             setErrorMsg(error.response.data);
            }
          }
        } else {
          setErrorPassword("Passwords are not the same");
        }
      } else {
        setErrorPassword("Passwords are not the same");
      }
    }
  };

  return <ScrollView style={styles.Register}>
    <Text style={styles.title}>{register.title}</Text>
    <View style={styles.email}>
      <Fields text={register.email} state={email} setState={setEmail} pressed={pressed} setPressed={setPressed} errorEmail={errorEmail} />
    </View>
    {
      !email && <View style={styles.center}>
        <Text style={styles.error}>{emptyFields}</Text>
      </View>
    }
    {
      (errorEmail && email) && <View style={styles.center}>
        <Text style={styles.error}>{errorEmail}</Text>
      </View>
    }
    <View style={styles.password}>
      <Fields text={register.password} state={password} setState={setPassword} pressed={pressed} setPressed={setPressed} errorPass={errorPassword} />
    </View>
    {
      (!password && !errorPassword) && <View style={styles.center}>
        <Text style={styles.error}>{emptyFields}</Text>
      </View>
    }
    <View style={styles.confirmPassword}>
      <Fields text={register.passConfirm} state={passConfirm} setState={setPassConfirm} pressed={pressed} setPressed={setPressed} errorPass={errorPassword} />
    </View>
    {
      (!passConfirm && !errorPassword) && <View style={styles.center}>
        <Text style={styles.error}>{emptyFields}</Text>
      </View>
    }
    {
      errorPassword && <View style={styles.center}>
        <Text style={styles.error}>{errorPassword}</Text>
      </View>
    }
    <View style={styles.centerTerms}>
      <View style={styles.termsContainer}>
        <Text style={styles.terms}>{register.label_1}<Text style={styles.underline}> {register.label_2}</Text>{register.label_3}<Text style={styles.underline}>{register.label_4}</Text> </Text>
      </View>
    </View>
    <View style={styles.btn}>
      {errorMsg && <View style={[styles.center, { marginBottom: 10 }]}>
        <Text style={styles.error}>{errorMsg}</Text>
      </View>}
      <TouchableOpacity
        style={styles.bigBtn}
        onPress={() => {
          setPressed(true);
          requestRegister();
        }}>
        <Text style={styles.btnText}>{register.button_1}</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.centerBot}>
      <View style={[styles.bottomBoxTop, { marginBottom: 20 }]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("LogIn");
          }}
          style={styles.smallBtn}>
          <Text style={styles.smallBtnText}>{register.button_2}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>;
};

const styles = StyleSheet.create({
  Register: {
    backgroundColor: "white",
    width: 450,
    alignSelf: 'center'
  },
  title: {
    fontSize: 41,
    fontWeight: "600",
    lineHeight: 45,
    color: "#59C09B",
    marginLeft: 38,
  },
  email: {
    marginTop: 48,
    alignItems: "center",
  },
  password: {
    marginTop: 60,
    alignItems: "center",
  },
  confirmPassword: {
    marginTop: 29,
    alignItems: "center",
  },
  centerTerms: {
    marginTop: 53,
    alignItems: 'center',
    marginBottom: 24
  },
  center: {
    alignItems: "center"
  },
  termsContainer: {
    alignItems: "center",
    width: 270,
  },
  terms: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center"
  },
  underline: {
    textDecorationLine: "underline"
  },
  btn: {
    alignItems: "center",
    marginBottom: 70,
  },
  centerBot: {
    alignItems: 'center',
    marginBottom: 30
  },
  bottomText: {
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 18,
    marginRight: 30
  },
  bottomBoxTop: {
    flexDirection: "row",
    alignItems: "center",

  },
  error: {
    color: "red"
  },
  bigBtn: {
    backgroundColor: "#59c09b",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 280
  },
  btnText: {
    color: "white",
    fontSize: 22,
    lineHeight: 33,
    fontWeight: "700",
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

export default RegisterScreen;
