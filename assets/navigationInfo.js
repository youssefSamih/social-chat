import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import ActivitiesScreen from "../pages/ActivitiesScreen";
import MembersScreen from "../pages/MembersScreen";
import MapsScreen from "../pages/MapsScreen";
import NotificationsScreen from "../pages/NotificationsScreen";
import NotificationsInteractScreen from "../pages/NotificationsInteractScreen";
import MessagesScreen from "../pages/MessagesScreen";

import NotReady from "../pages/NotReady";

import Json from "../assets/json/en.json";
import EditActivityScreen from "../pages/EditActivityScreen";

const { bottomNav } = Json;

const navigation = [
  {
    link: bottomNav.activities.title,
    icon: "ios-home",
    topNavArg: [
      {
        link: bottomNav.activities.topNav.calendar.title,
        to: () => <ActivitiesScreen fromStack="calendar" />,
      },
      { link: "organize", to: () => <EditActivityScreen /> },
      { link: "filter", to: () => <NotReady /> },
      {
        link: "filtered view",
        to: () => <ActivitiesScreen fromStack="filtered" />,
      },
    ],
  },
  {
    link: bottomNav.members.title,
    icon: "ios-people",
    topNavArg: [
      { link: "male", to: () => <MembersScreen fromStack="male" /> },
      {
        link: bottomNav.members.topNav.pro,
        to: () => <MembersScreen fromStack="pro" />,
      },
      { link: "female", to: () => <MembersScreen fromStack="female" /> },
    ],
  },
  {
    link: bottomNav.maps.title,
    icon: "ios-map-outline",
    topNavArg: [
      // {
      //   link: bottomNav.maps.topNav.users,
      //   to: () => <MapsScreen fromStack="users" />,
      // },
      {
        link: bottomNav.maps.topNav.activities,
        to: () => <MapsScreen fromStack="activities" />,
      },
    ],
  },
  {
    link: bottomNav.notifications.title,
    icon: "ios-notifications-circle",
    topNavArg: [
      {
        link: bottomNav.notifications.topNav.info.title,
        to: () => <NotificationsScreen />,
      },
      {
        link: bottomNav.notifications.topNav.manage.title,
        to: () => <NotificationsScreen />,
      },
      {
        link: bottomNav.notifications.topNav.interaction.title,
        to: () => <NotificationsInteractScreen />,
      },
    ],
  },
  {
    link: bottomNav.messages.title,
    icon: "ios-settings",
    topNavArg: [
      { link: "first", to: () => <MessagesScreen /> },
      { link: "second", to: () => <MessagesScreen /> },
      { link: "third", to: () => <MessagesScreen /> },
      { link: "fourth", to: () => <MessagesScreen /> },
      { link: "fifth", to: () => <MessagesScreen /> },
    ],
  },
];

export default navigation;
