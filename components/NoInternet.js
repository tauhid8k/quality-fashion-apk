import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import NoInternetImg from "../assets/no-internet.png";
import DownArrow from "../assets/down-arrow.png";

const NoInternet = () => {
  return (
    <View style={styles.noInternetContainer}>
      <View style={styles.noInternetImgContainer}>
        <Image
          source={NoInternetImg}
          contentFit="cover"
          style={styles.noInternetImg}
        />
        <Text style={styles.noInternetText}>No Internet!</Text>
        <Text style={styles.refreshText}>Pull down to refresh</Text>
        <Image source={DownArrow} contentFit="cover" style={styles.downArrow} />
      </View>
      <Text style={styles.internetStatusText}>No Internet!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noInternetContainer: {
    flex: 1,
  },
  noInternetImgContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  noInternetImg: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
  noInternetText: {
    fontSize: 20,
  },
  refreshText: {
    color: "gray",
    marginBottom: 5,
  },
  downArrow: {
    width: 20,
    height: 20,
  },
  internetStatusText: {
    width: "100%",
    color: "white",
    backgroundColor: "black",
    textAlign: "center",
    padding: 4,
  },
});

export default NoInternet;
