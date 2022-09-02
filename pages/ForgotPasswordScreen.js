import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import Fields from "../components/Fields";
import JSON from "../assets/json/en.json";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState(null);
  const [pressed, setPressed] = useState(false);
  const { forgotPassword } = JSON;
  const [errorEmail, setErrorEmail] = useState(null);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const requestPassword = async () => {
    setPressed(true);
    if (!email) {
      setErrorEmail("This field is required");
    } else {
      if (email.indexOf("@") === -1 || email.split("@")[1].length < 4 || email.split("@")[1].indexOf('.') === -1 || email.split("@")[1].split(".")[1].length < 2 || email.split("@")[1].split(".")[1].length > 4) {
        setError("This email address is not valid");
      } else {
        try {
          setErrorEmail(null);
          const response = await axios.post("https://backoffice.socializus.com/api/login/sendcode", {
            email: email,
            subject: forgotPassword.subject,
            message: forgotPassword.message
          });
          navigation.navigate("Verification", { email: email });
        } catch (error) {
          console.log(error.message);
          setError(error.message);
          if (error.response.status === 404) {
            setError("Email doesn't exist");
          }
        }
      }

    }
  };
  return <ScrollView style={styles.forgotPage}>
    <Text style={styles.title}>{forgotPassword.title}</Text>
    <View style={styles.container}>
      <Text style={styles.text}>{forgotPassword.label}</Text>
    </View>
    <View style={styles.email}>
      <Fields
        state={email}
        setState={setEmail}
        pressed={pressed}
        text={forgotPassword.email} />
      {
        (errorEmail && !email) ? <Text style={{ color: "red" }}>{errorEmail}</Text> :
          error && <Text style={{ color: "red" }}>{error}</Text>
      }
    </View>
    <View style={styles.btnContainer}>
      <TouchableOpacity
        onPress={() => {
          requestPassword();
        }}
        style={styles.bigBtn}>
        <Text style={styles.btnText}>{forgotPassword.button}</Text>
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
    marginTop: 260,
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
export default ForgotPasswordScreen;
