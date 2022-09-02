import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import Fields from "../components/Fields";
import JSON from "../assets/json/en.json";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const NewPasswordScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { newPassword } = JSON;
  const [password, setPassword] = useState(null);
  const [passConfirm, setPassConfirm] = useState(null);
  const [error, setError] = useState(null);
  const [errorField, setErrorField] = useState(null);
  const [pressed, setPressed] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let same = true;
  const requestNewPass = async () => {
    setPressed(true);
    setErrorField(null);
    setError(null);
    setErrorMsg(null);
    if (password && passConfirm) {
      if (password.length === passConfirm.length) {
        for (let i = 0; i < password.length; i++) {
          if (password[i] !== passConfirm[i]) {
            same = false;
            break;
          }
        }
        if (same) {
          if (password.length <= 8) {
            setError("Wrong format");
          } else {
            let findNumber = false;
            let findSpecialChar = false;
            let findUpperCase = false;
            let findLowerCase = false;
            for (let i = 0; i < password.length; i++) {
              if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
                findNumber = true;
              }
              if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
                findUpperCase = true;
              }
              if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
                findLowerCase = true;
              }
              if (password.charCodeAt(i) < 48 || password.charCodeAt(i) > 122 || (password.charCodeAt(i) > 57 && password.charCodeAt(i) < 65) || (password.charCodeAt(i) > 90 && password.charCodeAt(i) < 97)) {
                findSpecialChar = true;
              }
            }
            if (findLowerCase && findNumber && findUpperCase && findSpecialChar) {
              try {
                const response = await axios.post("https://backoffice.socializus.com/api/login/changepassword", {
                  email: params.email,
                  code: params.code,
                  pass: password,
                });
                if (response.data.result === "OK") {
                  navigation.navigate("LogIn");
                }
              } catch (error) {
                if (error.response.status === 402) {
                  setErrorMsg("Code expired");
                } else if (error.response.status === 401) {
                  setErrorMsg("Email and/or Code are incorrect");
                }
              }
            }
          }
        } else {
          setError("Passwords are not the same");
        }
      } else {
        setError("Passwords are not the same");
      }
    } else {
      if (!password && !passConfirm) {
        setErrorField("Field is required");
      } else {
        setError("Passwords are not the same");
      }

    }
  };

  return <ScrollView style={styles.forgotPage}>
    <Text style={styles.title}>{newPassword.title}</Text>
    <View style={styles.container}>
      <Text style={styles.text}>{newPassword.label}</Text>
    </View>
    <View style={[styles.password, { marginBottom: 62 }]}>
      <Fields
        state={password}
        setState={setPassword}
        pressed={pressed}
        text={newPassword.password} />
      {
        (errorField && !password) ? <Text style={{ color: "red" }}>{errorField}</Text> :
          error && <Text style={{ color: "red" }}>{error}</Text>
      }
    </View>
    <View style={styles.password}>
      <Fields
        state={passConfirm}
        setState={setPassConfirm}
        pressed={pressed}
        text={newPassword.passConfirm} />
      {
        (errorField && !passConfirm) ? <Text style={{ color: "red" }}>{errorField}</Text> :
          error && <Text style={{ color: "red" }}>{error}</Text>
      }
    </View>
    <View style={styles.btnContainer}>
      {errorMsg && <Text style={{ color: "red" }}>{errorMsg}</Text>}
      <TouchableOpacity
        onPress={() => {
          requestNewPass();
        }}
        style={styles.bigBtn}>
        <Text style={styles.btnText}>{newPassword.button}</Text>
      </TouchableOpacity>
    </View>


  </ScrollView>;
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
  password: {
    alignItems: "center",
  },
  bigBtn: {
    backgroundColor: "#59c09b",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 280,
    marginTop: 77,
  },
  btnText: {
    color: "white",
    fontSize: 22,
    lineHeight: 33,
    fontWeight: "700",
  },
  btnContainer: {
    alignItems: "center"
  }
});

export default NewPasswordScreen;
