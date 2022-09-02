import ActivitiesScreen from "../pages/ActivitiesScreen";

import Json from "../assets/json/en.json";

const { bottomNav } = Json;

const navigationBis = [
  {
    link: bottomNav.activities.topNav.myActivities.topNav.upcoming,
    to: () => <ActivitiesScreen fromStack="upcomming activities" />,
  },
  {
    link: bottomNav.activities.topNav.myActivities.topNav.past,
    to: () => <ActivitiesScreen fromStack="past activities" />,
  },
  {
    link: bottomNav.activities.topNav.myActivities.topNav.organized,
    to: () => <ActivitiesScreen fromStack="organized activities" />,
  },
];

export default navigationBis;
