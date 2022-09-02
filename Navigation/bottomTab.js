import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native";

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import TopNav from "./topTab";

import BurgerButton from "../components/BurgerButton";
import Json from "../assets/json/en.json";

const { bottomNav, menu } = Json;

const BottomNav = ({ arg, setToken, func }) => {
  const navigation = useNavigation();
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarIcon: { focused: true, color: "ff0000", size: 1 },
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
        tabBarActiveBackgroundColor: "#F48225",
        tabBarInactiveBackgroundColor: "#59C09B",
      }}
    >
      {arg.map((elem, index) => {
        return (
          <BottomTab.Screen
            key={index}
            name={`BottomNav${elem.link}`}
            options={{
              headerShown: false,
              tabBarLabel: elem.link,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={elem.icon} size={size} color={color} />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name={elem.link}
                  options={{
                    title: elem.link,
                    headerStyle: { backgroundColor: "#59C09B" },
                    headerTitleStyle: {
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 30,
                      marginLeft: 20
                    },
                    headerLeft: () => (
                      <>
                        <BurgerButton onPress={func} />
                      </>
                    ),
                    headerRight:
                      elem.link === bottomNav.members.title
                        ? () => (
                          <Button
                            onPress={() =>
                              navigation.navigate("Edit Profile")
                            }
                            title={menu.editButton}
                            color="#F48225"
                          />
                        )
                        : elem.link === bottomNav.activities.title
                          ? () => (
                            // <Button
                            //   onPress={() =>
                            //     navigation.navigate("My Activities")
                            //   }
                            //   title={
                            //     bottomNav.activities.topNav.myActivities.title
                            //   }
                            // />
                            <Button
                              onPress={() => setToken(null)}
                              title="Logout"
                              color="#F48225"
                            />
                          )
                          : () => false,
                  }}
                >
                  {() => <TopNav arg={elem.topNavArg} />}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </BottomTab.Screen>
        );
      })}
    </BottomTab.Navigator>
  );
};

export default BottomNav;
