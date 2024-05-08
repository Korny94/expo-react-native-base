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
import { Accelerometer, Barometer } from "expo-sensors";
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

import styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabTwoScreen() {
  // ACCELEROMETER
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
        <Text>Speed: {speed.toFixed(2)} km/h</Text>
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
        <Text>Pressure: {pressure.toFixed(2)} hPa</Text>
        <Text>
          Relative Altitude:{" "}
          {Platform.OS === "ios"
            ? `${relativeAltitude} m`
            : `Only available on iOS`}
        </Text>
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
        <Text>Calendar Module (ConsoleLog)</Text>
        <Button title="Create a new calendar" onPress={createCalendar} />
      </View>
      <View style={styles.view}>
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
        <Button onPress={contacts} title="Get Contacts (Console Log)" />
      </View>
      <CryptoComponent />
      <View style={styles.view}>
        <DateTimePickerComponent />
      </View>
    </ScrollView>
  );
}
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
