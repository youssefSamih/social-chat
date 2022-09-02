import axios from 'axios';

import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";


import Fields from "../components/Fields";
import Json from "../assets/json/en.json";



const LogInScreen = ({ navigation, setToken }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMsg, setErrormsg] = useState(null);
  const [emptyFields, setEmptyFields] = useState(null);
  const [pressed, setPressed] = useState(false);
  const { login } = Json;
  const requestLogin = async () => {
    setPressed(true);
    if (!email || !password) {
      setEmptyFields("This field is required");
    } else {
      try {
        setEmptyFields(null);
        const response = await axios.post("https://backoffice.socializus.com/api/login/signin", {
          email: email,
          pass: password
        });
        console.log(response.data);
        setToken(response.data.user.token);
      } catch (error) {
        if (error.response.status === 400) {
          setErrormsg("Wrong format on Email and/or Password");
        } else if (error.response.status === 401) {
          setErrormsg("Wrong Email and/or Password");
        }
      }
    }
  };
  return (
    <ScrollView style={styles.LogIn}>
    <Text style={styles.title}>{login.title}</Text>
    <Text style={styles.text}>{login.label_1}</Text>
    <View style={styles.center}>
      <View style={styles.email}>
        <Fields text={login.email} state={email} setState={setEmail} pressed={pressed} setPressed={setPressed} />
      </View>
      {
        (!email && emptyFields) && <View style={styles.center}>
          <Text style={styles.error}>{emptyFields}</Text>
        </View>
      }
      <View style={styles.password}>
        <Fields text={login.password} state={password} setState={setPassword} pressed={pressed} setPressed={setPressed} />
      </View>
    </View>
    {
      (!password && emptyFields) && <View style={styles.center}>
        <Text style={styles.error}>{emptyFields}</Text>
      </View>
    }
    <View style={styles.centerTerms}>
      <View style={styles.termsContainer}>
        <Text style={styles.terms}>{login.label_2} <Text style={styles.underline}>{login.label_3}</Text>{login.label_4}<Text style={styles.underline}>{login.label_5}</Text> </Text>
      </View>
    </View>
    {
      errorMsg && <View style={styles.center}>
        <Text style={styles.error}>{errorMsg}</Text>
      </View>
    }
    <View style={styles.btn}>
      <TouchableOpacity
        style={styles.bigBtn}
        onPress={() => {
          setPressed(true);
          requestLogin();
        }}>
        <Text style={styles.btnText}>{login.button_1}</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.centerBot}>
      <View style={[styles.bottomBoxTop, { marginBottom: 20 }]}>
        <Text style={styles.bottomText}>{login.label_6}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
          style={styles.smallBtn}>
          <Text style={styles.smallBtnText}>{login.button_2}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomBoxTop}>
        <Text style={styles.bottomText}>{login.label_7}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ForgotPassword");
          }}
          style={[styles.smallBtn, { width: 150 }]}>
          <Text style={styles.smallBtnText}>{login.button_3}</Text>
        </TouchableOpacity>
      </View>
    </View>

  </ScrollView>

  )
};

const styles = StyleSheet.create({
  LogIn: {
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
  text: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 12,
    marginTop: 46,
    marginLeft: 38,
  },
  email: {
    marginTop: 45,
  },
  password: {
    marginTop: 24,
  },
  centerTerms: {
    marginTop: 15,
    alignItems: 'center'
  },
  center: {
    alignItems: "center"
  },
  termsContainer: {
    alignItems: "center",
    width: 270,
    marginBottom: 35
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
    marginBottom: 90,
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
    color: "red",
    marginBottom: 20
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

export default LogInScreen;
