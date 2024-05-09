import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Button,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Accelerometer, Barometer, LightSensor, Pedometer } from "expo-sensors";
import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";
import { useBatteryLevel } from "expo-battery";
import * as Brightness from "expo-brightness";
import * as Calendar from "expo-calendar";
import * as Clipboard from "expo-clipboard";
import * as Contacts from "expo-contacts";
import * as Crypto from "expo-crypto";
import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import * as Speech from "expo-speech";
import * as WebBrowser from "expo-web-browser";
import { WebView } from "react-native-webview";
import PagerView from "react-native-pager-view";

import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabTwoScreen() {
  // ACCELEROMETER
  const [showAccelerometer, setShowAccelerometer] = useState(false);
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [speed, setSpeed] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [isStationary, setIsStationary] = useState(false);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(({ x, y, z }) => {
        // Calculate the magnitude of the acceleration vector
        const accelerationMagnitude = Math.sqrt(x * x + y * y + z * z);
        // Convert acceleration magnitude to speed in m/s
        const newSpeed = accelerationMagnitude;
        // Convert speed from m/s to km/h
        const speedInKmh = (newSpeed - 1) * 3.6;
        if (speedInKmh < 0) {
          setSpeed(0);
          setIsStationary(true);
          return;
        }
        setSpeed(speedInKmh);
        setData({ x, y, z });

        setIsStationary(false);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  // ASYNC STORAGE
  const [data2, setData2] = useState("");
  const [data3, setData3] = useState("");

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("data", data2);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("data");
      if (value !== null) {
        setData3(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("data");
      setData2("");
      setData3("");
    } catch (e) {
      console.log(e);
    }
  };

  // AUDIO RECORDING
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [sound, setSound] = useState();

  async function startRecording() {
    try {
      if (permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    try {
      console.log("Stopping recording..");
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
      });
      const uri = recording.getURI();
      console.log("Recording stopped and stored at", uri);

      // Load the recorded sound into the sound state
      const { sound: newSound } = await Audio.Sound.createAsync({ uri });
      setSound(newSound);
      setRecording(undefined);
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  }

  async function playSound() {
    try {
      console.log("Playing sound..");
      await sound.playAsync();
    } catch (error) {
      console.error("Failed to play sound", error);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // BAROMETER
  const [showBarometer, setShowBarometer] = useState(false);
  const [{ pressure, relativeAltitude }, setPressure] = useState({
    pressure: 0,
    relativeAltitude: 0,
  });
  const [barometerSubscription, setBarometerSubscription] = useState(null);

  const subscribe = () => {
    console.log("Subscribing to barometer..");
    setSubscription(Barometer.addListener(setPressure));
  };

  const unsubscribe = () => {
    console.log("Unsubscribing from barometer..");
    barometerSubscription && barometerSubscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();

    // Unsubscribe when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  // BATTERY
  const batteryLevel = useBatteryLevel();
  const percentageBatteryLevel = batteryLevel * 100;

  // BRIGHTNESS
  const [brightness, setBrightness] = useState(0);

  const incrementBrightness = async () => {
    try {
      const currentBrightness = await Brightness.getBrightnessAsync();
      if (currentBrightness < 1) {
        const newBrightness = Math.min(1, currentBrightness + 0.1);
        await Brightness.setBrightnessAsync(newBrightness);
        setBrightness(newBrightness);
      }
    } catch (error) {
      console.error("Failed to increment brightness:", error);
    }
  };

  const decrementBrightness = async () => {
    try {
      const currentBrightness = await Brightness.getBrightnessAsync();
      if (currentBrightness > 0) {
        const newBrightness = Math.max(0, currentBrightness - 0.1);
        await Brightness.setBrightnessAsync(newBrightness);
        setBrightness(newBrightness);
      }
    } catch (error) {
      console.error("Failed to decrement brightness:", error);
    }
  };

  // CALENDAR
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        console.log("Here are all your calendars:");
        console.log({ calendars });
      }
    })();
  }, []);

  // CAMERA
  const [facing, setFacing] = useState("back");
  const [CameraPermission, requestCameraPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);

  if (!CameraPermission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!CameraPermission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestCameraPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={styles.view}>
        <Text style={styles.title}>Accelerometer:</Text>
        <TouchableOpacity
          onPress={() => setShowAccelerometer(!showAccelerometer)}
        >
          <Text style={styles.button}>
            {" "}
            {showAccelerometer ? "Hide Accelerometer" : "Show Accelerometer"}
          </Text>
        </TouchableOpacity>
        {showAccelerometer && <Text>Speed: {speed.toFixed(2)} km/h</Text>}
      </View>
      <View style={styles.view}>
        <Text style={styles.title}>AsyncStorage:</Text>
        <TextInput
          placeholder="Enter data"
          value={data2}
          onChangeText={(text) => setData2(text)}
        />
        <TouchableHighlight style={styles.button} onPress={storeData}>
          <Text>Store data</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={getData}>
          <Text>Get data</Text>
        </TouchableHighlight>
        <Text>{data3}</Text>
        <TouchableHighlight style={styles.button} onPress={removeData}>
          <Text>Remove data</Text>
        </TouchableHighlight>
      </View>
      <View>
        <Text style={styles.title}>Recorder</Text>
        <Button
          title={recording ? "Stop Recording" : "Start Recording"}
          onPress={recording ? stopRecording : startRecording}
        />
        <View>
          <Text style={styles.title}>Playback</Text>
          <Button title="Play Sound" onPress={playSound} />
        </View>
      </View>
      <View style={styles.view}>
        <Text style={styles.title}>Barometer:</Text>
        <TouchableOpacity onPress={() => setShowBarometer(!showBarometer)}>
          <Text style={styles.button}>
            {" "}
            {showBarometer ? "Hide Barometer" : "Show Barometer"}
          </Text>
        </TouchableOpacity>
        {showBarometer && (
          <>
            <Text>Pressure: {pressure.toFixed(2)} hPa</Text>
            <Text>
              Relative Altitude:{" "}
              {Platform.OS === "ios"
                ? `${relativeAltitude} m`
                : `Only available on iOS`}
            </Text>
          </>
        )}
      </View>
      <View style={styles.view}>
        <Text style={styles.title}>Battery:</Text>
        <Text>Current Battery Level: {percentageBatteryLevel.toFixed(0)}%</Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.title}>Brightness:</Text>
        <Text>Current Brightness: {brightness.toFixed(1)}</Text>
        <TouchableOpacity style={styles.button} onPress={decrementBrightness}>
          <Text>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={incrementBrightness}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.view}>
        <Text style={styles.title}>Calendar Module (ConsoleLog)</Text>
        <Button title="Create a new calendar" onPress={createCalendar} />
      </View>
      <View style={styles.view}>
        <Text style={styles.title}>Camera:</Text>
        <TouchableOpacity onPress={() => setShowCamera(!showCamera)}>
          <Text style={styles.button}>
            {" "}
            {showCamera ? "Hide Camera" : "Show Camera"}
          </Text>
        </TouchableOpacity>
      </View>
      {showCamera && (
        <View style={styles.view}>
          <Text style={styles.title}>Camera:</Text>
          <CameraView style={styles.camera} facing={facing}>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraFacing}
              >
                <Text>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      )}
      <ClipBoard />
      <View style={styles.view}>
        <Text style={styles.title}>Contacts:</Text>
        <Button onPress={contacts} title="Get Contacts (Console Log)" />
      </View>
      <CryptoComponent />
      <View style={styles.view}>
        <DateTimePickerComponent />
      </View>
      <HapticsComponent />
      <ImagePickerComponent />
      <LightSensorComponent />
      <LinearGradientComponent />
      <LocationComponent />
      <MapViewComponent />
      <PedometerComponent />
      <TextToSpeech />
      <WebBrowserRedirectComponent />
      <PagerViewComponent />
      <WebViewComponent />
    </ScrollView>
  );
}

// PAGER VIEW
const PagerViewComponent = () => {
  return (
    <View style={styles.view}>
      <Text style={styles.title}>Pager View:</Text>
      <PagerView style={styles.camera}>
        <View key="1">
          <Text>First page (Swipe Left)</Text>
        </View>
        <View key="2">
          <Text>Second page (Swipe Left / Right)</Text>
        </View>
        <View key="3">
          <Text>Third page (Swipe Right)</Text>
        </View>
      </PagerView>
    </View>
  );
};

// WEB VIEW
const WebViewComponent = () => {
  return (
    <View style={styles.view}>
      <Text style={styles.title}>Web View:</Text>
      <WebView
        source={{ uri: "https://expo.dev" }}
        style={{
          overflow: "scroll",
          width: wp("80%"),
          height: hp("30%"),
          marginBottom: 20,
        }}
      />
    </View>
  );
};

// WEB BROWSER REDIRECT
const WebBrowserRedirectComponent = () => {
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync("https://expo.dev");
    setResult(result);
  };
  return (
    <View style={styles.view}>
      <Text style={styles.title}>WebBrowser Redirect:</Text>
      <Button title="Open WebBrowser" onPress={_handlePressButtonAsync} />
    </View>
  );
};

// TEXT TO SPEECH
const TextToSpeech = () => {
  const [text, setText] = useState("");
  const speak = () => {
    Speech.speak(text);
  };

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Text to Speech:</Text>
      <TextInput
        placeholder="Input text"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <Button title="Convert to speech" onPress={speak} />
    </View>
  );
};

// PEDOMETER
const PedometerComponent = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      return Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result.steps);
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    // return () => subscription && subscription.remove();
  }, []);

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Pedometer:</Text>
      <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
      <Text>Walk! And watch this go up: {currentStepCount}</Text>
    </View>
  );
};

// MAP VIEW
const MapViewComponent = () => {
  const [showMap, setShowMap] = useState(false);
  return (
    <View style={styles.view}>
      <Text style={styles.title}>Map View:</Text>
      <TouchableOpacity onPress={() => setShowMap(!showMap)}>
        <Text style={styles.button}>
          {" "}
          {showMap ? "Hide Map View" : "Show Map View"}
        </Text>
      </TouchableOpacity>
      {showMap && <MapView mapType="satellite" style={styles.camera} />}
    </View>
  );
};

// LINEAR GRADIENT
const LinearGradientComponent = () => {
  return (
    <View style={styles.view}>
      <Text style={styles.title}>Linear Gradient:</Text>
      <LinearGradient
        // Button Linear Gradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.button}
      >
        <Text style={{ color: "white" }}>Linear Gradient</Text>
      </LinearGradient>
    </View>
  );
};

// LIGHT SENSOR
const LightSensorComponent = () => {
  const [{ illuminance }, setData] = useState({ illuminance: 0 });
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (isSubscribed) {
      _subscribe();
    } else {
      _unsubscribe();
    }

    return () => {
      _unsubscribe();
    };
  }, [isSubscribed]);

  const _subscribe = () => {
    LightSensor.setUpdateInterval(1000);
    LightSensor.addListener((data) => {
      setData(data);
    });
  };

  const _unsubscribe = () => {
    LightSensor.removeAllListeners();
  };

  const _toggle = () => {
    setIsSubscribed(!isSubscribed);
  };

  const getLightStatus = () => {
    const maxIlluminance = 1000; // Maximum illuminance value (lux)
    const percentage = (illuminance / maxIlluminance) * 100;

    if (percentage < 1) {
      return "VERY DARK";
    } else if (percentage >= 2 && percentage <= 10) {
      return "DARK";
    } else if (percentage > 10 && percentage <= 50) {
      return "NORMAL";
    } else if (percentage > 50 && percentage <= 80) {
      return "BRIGHT";
    } else {
      return "VERY BRIGHT";
    }
  };

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Light Sensor:</Text>
      <Text>
        Illuminance:{" "}
        {Platform.OS === "android"
          ? `${illuminance} lx`
          : `Only available on Android`}
      </Text>
      <Text>Light Status: {getLightStatus()}</Text>
      <View style={styles.view}>
        <TouchableOpacity onPress={_toggle} style={styles.button}>
          <Text>{isSubscribed ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// LOCATION
const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Location:</Text>
      <Text>{text}</Text>
    </View>
  );
};

// HAPTICS (VIBRATION)
const HapticsComponent = () => {
  return (
    <View style={styles.view}>
      <Text style={styles.title}>Haptics (VIBRATION):</Text>
      <Text>Haptics.selectionAsync</Text>
      <View>
        <Button title="Selection" onPress={() => Haptics.selectionAsync()} />
      </View>
      <Text>Haptics.notificationAsync</Text>
      <View>
        <Button
          title="Success"
          onPress={() =>
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
          }
        />
        <Button
          title="Error"
          onPress={() =>
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
          }
        />
        <Button
          title="Warning"
          onPress={() =>
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
          }
        />
      </View>
      <Text>Haptics.impactAsync</Text>
      <View>
        <Button
          title="Light"
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        />
        <Button
          title="Medium"
          onPress={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          }
        />
        <Button
          title="Heavy"
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
        />
        <Button
          title="Rigid"
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)}
        />
        <Button
          title="Soft"
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)}
        />
      </View>
    </View>
  );
};

// IMAGE PICKER
const ImagePickerComponent = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Image Picker:</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

// DATE TIME PICKER
const DateTimePickerComponent = () => {
  const [date, setDate] = useState(new Date()); // Initialize with the current date
  const [showPicker, setShowPicker] = useState(false);
  const [datePicked, setDatePicked] = useState("");

  const handleDateChange = ({ type }, selectedDate) => {
    if (type === "set") {
      setShowPicker(false);
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setDatePicked(currentDate.toString());
    } else {
      setShowPicker(false);
    }
  };

  return (
    <>
      <Text style={styles.title}>Date Time Picker:</Text>
      <Button title="Show Date Picker" onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={handleDateChange}
        />
      )}
      <Text>{datePicked}</Text>
    </>
  );
};

// CRYPTO (HASHING)
const CryptoComponent = () => {
  const [password, setPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");

  const handleChange = (text) => {
    setPassword(text);
  };

  const handleHash = async () => {
    try {
      const hashed = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );
      setHashedPassword(hashed);
    } catch (error) {
      console.error("Error hashing password:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.title}>Crypto (Hashing):</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        placeholder="Enter password"
        onChangeText={handleChange}
        value={password}
        secureTextEntry={true}
      />
      <Button title="Hash Password" onPress={handleHash} />
      {hashedPassword ? (
        <View style={{ marginTop: 20 }}>
          <Text>Hashed Password:</Text>
          <Text>{hashedPassword}</Text>
        </View>
      ) : null}
    </View>
  );
};

// CONTACTS
const contacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === "granted") {
    const { data } = await Contacts.getContactsAsync();

    if (data.length > 0) {
      data.forEach((contact) => {
        console.log(contact);
      });
    }
  }
};

// CLIPBOARD
const ClipBoard = () => {
  const [copiedText, setCopiedText] = useState("");
  const [pastedText, setPastedText] = useState("");

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(copiedText);
  };

  const fetchCopiedText = async () => {
    console.log("Fetching copied text");
    const text = await Clipboard.getStringAsync();
    setPastedText(text);
  };

  return (
    <View>
      <Text style={styles.title}>Clipboard:</Text>
      <TextInput
        value={copiedText}
        onChangeText={(text) => setCopiedText(text)}
        placeholder="Enter text to copy"
      />
      <Button
        title="Click here to copy to Clipboard"
        onPress={copyToClipboard}
      />
      <Button title="View copied text" onPress={fetchCopiedText} />
      <Text>{pastedText}</Text>
    </View>
  );
};

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === "ios"
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: "Expo Calendar" };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: "Expo Calendar",
    color: "blue",
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: "internalCalendarName",
    ownerAccount: "personal",
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}

const styles = StyleSheet.create({
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    display: "flex",
    flexDirection: "column",
    width: wp("80%"),
    alignSelf: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  view: {
    padding: 20,
  },
  button: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  camera: {
    width: wp("80%"),
    height: hp("40%"),
  },
});
