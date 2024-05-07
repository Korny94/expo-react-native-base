import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Modal,
  Pressable,
  Switch,
  Alert,
  Button,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  RefreshControl,
  SectionList,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  VirtualizedList,
} from "react-native";
import * as React from "react";
import { useState } from "react";
import Styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Text, View } from "@/components/Themed";
import haley from "@/assets/images/1170.jpg";

// FLATLIST
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

// SECTIONLIST
const DATA2 = [
  {
    title: "Main dishes",
    data: ["Pizza", "Burger", "Risotto"],
  },
  {
    title: "Sides",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"],
  },
  {
    title: "Drinks",
    data: ["Water", "Coke", "Beer"],
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"],
  },
];

// STATUSBAR
const STYLES = ["default", "dark-content", "light-content"];
const TRANSITIONS = ["fade", "slide", "none"];

// VIRTUALIZEDLIST
const getItem = (_data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index + 1}`,
});

const getItemCount = (_data) => 5;

const Item2 = ({ title }) => (
  <View>
    <Text>{title}</Text>
  </View>
);

export default function TabOneScreen() {
  // TOUCHABLEHIGHLIGHT
  const [count, setCount] = useState(0);
  const onPress = () => setCount(count + 1);

  // MODAL
  const [modalVisible, setModalVisible] = useState(false);

  // SWITCH
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  // PRESSABLE
  const [timesPressed, setTimesPressed] = useState(0);

  let textLog = "";
  if (timesPressed > 1) {
    textLog = timesPressed + "x onPress";
  } else if (timesPressed > 0) {
    textLog = "onPress";
  }

  // REFRESH CONTROL
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // STATUSBAR
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0]
  );

  const changeStatusBarVisibility = () => setHidden(!hidden);

  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    if (styleId === STYLES.length) {
      setStatusBarStyle(STYLES[0]);
    } else {
      setStatusBarStyle(STYLES[styleId]);
    }
  };

  const changeStatusBarTransition = () => {
    const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
    if (transition === TRANSITIONS.length) {
      setStatusBarTransition(TRANSITIONS[0]);
    } else {
      setStatusBarTransition(TRANSITIONS[transition]);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 25,
        paddingBottom: 25,
        gap: 15,
        display: "flex",
        alignItems: "center",
        width: wp("100%"),
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text>Drag down to see RefreshControl indicator (RefreshControl)</Text>
      <Text style={styles.header}>Standard Components</Text>
      <StyledView>
        <StyledText>P (Text)</StyledText>
      </StyledView>
      <StyledView>
        <StyledText>DIV (View)</StyledText>
      </StyledView>
      <StyledView>
        <StyledText>IMG (Image)</StyledText>
        <StyledImage source={haley} />
      </StyledView>
      <StyledView>
        <StyledText>A list like UL or OL (FlatList)</StyledText>
        <StyledFlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={(item) => item.id}
        />
      </StyledView>
      <StyledView>
        <StyledText>UL with sections (SectionList)</StyledText>
        <StyledSectionList
          sections={DATA2}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item}</Text>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </StyledView>
      <StyledView>
        <StyledText>Virtualized List (VirtualizedList)</StyledText>
        <StyledVirtualizedList
          initialNumToRender={4}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={(item) => item.id}
          getItemCount={getItemCount}
          getItem={getItem}
        />
      </StyledView>
      <StyledTextInput placeholder="INPUT (TextInput)" />
      <Button
        title="BUTTON (Button) & Alert"
        onPress={() => Alert.alert("Simple Button pressed")}
      />
      <StyledView>
        <Pressable
          onPress={() => {
            setTimesPressed((current) => current + 1);
          }}
          style={{
            padding: 10,
            backgroundColor: "blue",
            width: wp("50%"),
          }}
        >
          {({ pressed }) => (
            <StyledText style={{ textAlign: "center" }}>
              {pressed ? "Pressed!" : "Press Me"}
            </StyledText>
          )}
        </Pressable>
        <View>
          <Text testID="pressable_press_console">{textLog}</Text>
        </View>
      </StyledView>
      <StyledTouchableOpacity onPress={onPress}>
        <StyledText>Button (TouchableOpacity)</StyledText>
      </StyledTouchableOpacity>

      <StyledTouchableHighlight onPress={onPress}>
        <StyledText>Button (TouchableHighlight)</StyledText>
      </StyledTouchableHighlight>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>Button (TouchableOpacity)</Text>
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.button}>
          <Text>Button (TouchableWithoutFeedback)</Text>
        </View>
      </TouchableWithoutFeedback>
      <View>
        <Text>{count || null}</Text>
      </View>

      <StyledView>
        <StyledText>Spinner (ActivityIndicator)</StyledText>
        <ActivityIndicator />
      </StyledView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Modal</Text>
      </Pressable>
      <StyledView>
        <StyledText>Switch</StyledText>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </StyledView>
      <StyledView>
        <StyledText>BACKGROUND-IMAGE (ImageBackground)</StyledText>

        <ImageBackground
          source={haley}
          resizeMode="cover"
          style={{ width: wp(70), height: hp(10) }}
        ></ImageBackground>
      </StyledView>
      <StyledView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <Text>Keyboard Avoiding View</Text>
              <TextInput placeholder="(KeyboardAvoidingView)" />
              <View>
                <Button title="Submit" onPress={() => null} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </StyledView>
      <StyledView>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <Text style={styles.textStyle}>
          StatusBar Visibility:{"\n"}
          {hidden ? "Hidden" : "Visible"}
        </Text>
        <Text style={styles.textStyle}>
          StatusBar Style:{"\n"}
          {statusBarStyle}
        </Text>
        {Platform.OS === "ios" ? (
          <Text style={styles.textStyle}>
            StatusBar Transition:{"\n"}
            {statusBarTransition}
          </Text>
        ) : null}
        <StyledView>
          <Button
            title="Toggle StatusBar"
            onPress={changeStatusBarVisibility}
          />
        </StyledView>
        <Button title="Change StatusBar Style" onPress={changeStatusBarStyle} />
        {Platform.OS === "ios" ? (
          <Button
            title="Change StatusBar Transition"
            onPress={changeStatusBarTransition}
          />
        ) : null}
      </StyledView>
    </ScrollView>
  );
}

const StyledView = Styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  padding: 10px;
  border-radius: 5px;
  width: ${wp("80%")};

`;

const StyledText = Styled.Text`
  color: white;
  font-size: 15px;
  `;

const StyledImage = Styled.Image`
height: ${hp("20%")};
width: ${wp("80%")};
  `;

const StyledFlatList = Styled.FlatList`
max-height: ${hp("20%")};
width: ${wp("80%")};
  background-color: white;
  padding: 10px;
  margin-top: 10px;
  `;

const StyledTextInput = Styled.TextInput`
  border: 1px solid black;
  padding: 5px 10px;
width: ${wp("80%")};
  `;

const StyledTouchableOpacity = Styled.TouchableOpacity`
  background-color: blue;
  padding: 10px;
  border-radius: 5px;

width: ${wp("80%")};
  `;

const StyledTouchableHighlight = Styled.TouchableHighlight`
  borderRadius: 5px;
  padding: 10px;
  background-color: blue;
  width: ${wp("80%")};

`;

const StyledSectionList = Styled.SectionList`
  max-height: 180px;
  width: ${wp("80%")};
`;

const StyledVirtualizedList = Styled.VirtualizedList`
  max-height: 110px;
  width: ${wp("80%")};

  background-color: white;
  padding: 10px;
  margin-top: 10px;
  `;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    width: wp("90%"),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: wp("80%"),
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  header: {
    fontSize: 25,
  },
});
