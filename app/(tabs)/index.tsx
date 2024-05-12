import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  ScrollView,
  Stack,
  Icon,
  Pressable,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

export default function loginRegister() {
  const [activeTab, setActiveTab] = React.useState("login"); // 'login' or 'register'

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  return (
    <NativeBaseProvider>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => handleTabPress("login")}
            style={[activeTab === "login" && styles.activeTab]}
          >
            <Text
              style={[
                styles.title,
                activeTab === "register" && styles.inactiveText,
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
          <Text style={styles.separator}>|</Text>
          <TouchableOpacity
            onPress={() => handleTabPress("register")}
            style={[activeTab === "register" && styles.activeTab]}
          >
            <Text
              style={[
                styles.title,
                activeTab === "login" && styles.inactiveText,
              ]}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
  },
  title: {
    fontSize: wp("7.5%"),
    fontWeight: "bold",
  },

  separator: {
    marginHorizontal: 5,
    fontSize: wp("5%"),
    color: "black",
  },
  activeTab: {
    backgroundColor: "#c7d2fe",
    borderRadius: 5,
    paddingHorizontal: 7.5,
    paddingVertical: 3,
  },
  inactiveText: {
    color: "gray",
  },
});

// LOGIN FORM
const LoginForm = () => {
  const [show, setShow] = React.useState(false);
  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        {/* <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading> */}

        <VStack space={3} mt="5">
          <Stack space={4} w="100%" alignItems="center">
            <Input
              w={{
                base: "100%",
                md: "25%",
              }}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="person" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              placeholder="Username or Email"
            />
            <Input
              w={{
                base: "100%",
                md: "25%",
              }}
              type={show ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              placeholder="Password"
            />
          </Stack>

          <Button mt="2" colorScheme="indigo">
            Sign in
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

// REGISTER FORM
const RegisterForm = () => {
  const [show, setShow] = React.useState(false);
  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        {/* <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          fontWeight="semibold"
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
        </Heading> */}
        <VStack space={3} mt="5">
          <VStack space={3} mt="5">
            <Stack space={4} w="100%" alignItems="center">
              <Input
                w={{
                  base: "100%",
                  md: "25%",
                }}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="person" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                placeholder="Username or Email"
              />
              <Input
                w={{
                  base: "100%",
                  md: "25%",
                }}
                type={show ? "text" : "password"}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? "visibility" : "visibility-off"}
                        />
                      }
                      size={5}
                      mr="2"
                      color="muted.400"
                    />
                  </Pressable>
                }
                placeholder="Password"
              />
              <Input
                w={{
                  base: "100%",
                  md: "25%",
                }}
                type={show ? "text" : "password"}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? "visibility" : "visibility-off"}
                        />
                      }
                      size={5}
                      mr="2"
                      color="muted.400"
                    />
                  </Pressable>
                }
                placeholder="Confirm Password"
              />
            </Stack>
          </VStack>
          <Button mt="2" colorScheme="indigo">
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};
