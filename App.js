import { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import NetInfo from "@react-native-community/netinfo";
import NoInternet from "./components/NoInternet";

// Website Configuration
const webUrl = "https://qualityfashionbd.com/";
const primaryColor = "#2C9649";

// Loading Indicator
const ActivityIndicatorElement = () => {
  return (
    <ActivityIndicator
      color={primaryColor}
      style={styles.activityIndicatorStyle}
      size="large"
    />
  );
};

const App = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [refresherEnabled, setEnableRefresher] = useState(true);

  // Handle Scroll
  const handleScroll = (event) => {
    const offsetY = Number(event.nativeEvent.contentOffset.y);
    if (offsetY === 0) {
      setEnableRefresher(true);
    } else {
      setEnableRefresher(false);
    }
  };

  // Refresh
  const pullToRefresh = useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);

    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        setIsConnected(true);
      }
    });
  }, []);

  // Check Internet Connection
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        setIsConnected(false);
      }
    });

    // unsubscribe
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={primaryColor} />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={pullToRefresh}
              enabled={refresherEnabled}
            />
          }
        >
          {isConnected ? (
            <WebView
              source={{ uri: webUrl }}
              javaScriptEnabled
              domStorageEnabled
              startInLoadingState
              renderLoading={ActivityIndicatorElement}
              onScroll={handleScroll}
            />
          ) : (
            <NoInternet isConnected={isConnected} />
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

// Styles
const styles = StyleSheet.create({
  activityIndicatorStyle: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

export default App;
