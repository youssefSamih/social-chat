import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const RedirectScreen = () => {
  const navigation = useNavigation();
  return (
    <Button title="text" onPress={() => navigation.navigate("EditProfile")} />
  );
};
export default RedirectScreen;
