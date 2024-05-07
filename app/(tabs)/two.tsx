import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  Text,
  Touchable,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Animated,
} from "react-native";
import * as React from "react";
import { useState } from "react";
import Styled from "styled-components/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
  Pressable,
  Badge,
  Spacer,
  Flex,
  Checkbox,
  FormControl,
  Input,
  WarningOutlineIcon,
  Icon,
  Radio,
  VStack,
  Select,
  CheckIcon,
  Slider,
  TextArea,
  Switch,
  Divider,
  Collapse,
  Alert,
  CloseIcon,
  IconButton,
  Button,
  Progress,
  Skeleton,
  Spinner,
  useToast,
  AlertDialog,
  HamburgerIcon,
  Menu,
  Modal,
  Popover,
  Actionsheet,
  useDisclose,
  Avatar,
  PresenceTransition,
  Slide,
  Stagger,
  Fab,
  useColorModeValue,
} from "native-base";

import { TabView, SceneMap } from "react-native-tab-view";
import { SwipeListView } from "react-native-swipe-list-view";

import { FontAwesome5 } from "@expo/vector-icons";

import {
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  Feather,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";

export default function TabTwoScreen() {
  // REFRESH CONTROL
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
      <Text style={styles.title}>React Native UI Framework (NativeBase)</Text>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Hamburger-Menu</Text>
        <Center flex={1} px="3">
          <Example14 />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Card</Text>
        <Box alignItems="center">
          <Box
            maxW="80"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: "gray.50",
            }}
          >
            <Box>
              <AspectRatio w="100%" ratio={16 / 9}>
                <Image
                  source={{
                    uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                  }}
                  alt="image"
                />
              </AspectRatio>
              <Center
                bg="violet.500"
                _dark={{
                  bg: "violet.400",
                }}
                _text={{
                  color: "warmGray.50",
                  fontWeight: "700",
                  fontSize: "xs",
                }}
                position="absolute"
                bottom="0"
                px="3"
                py="1.5"
              >
                PHOTOS
              </Center>
            </Box>
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1">
                  The Garden City
                </Heading>
                <Text
                  fontSize="xs"
                  _light={{
                    color: "violet.500",
                  }}
                  _dark={{
                    color: "violet.400",
                  }}
                  fontWeight="500"
                  ml="-0.5"
                  mt="-1"
                >
                  The Silicon Valley of India.
                </Text>
              </Stack>
              <Text fontWeight="400">
                Bengaluru (also called Bangalore) is the center of India's
                high-tech industry. The city is also known for its parks and
                nightlife.
              </Text>
              <HStack
                alignItems="center"
                space={4}
                justifyContent="space-between"
              >
                <HStack alignItems="center">
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                    fontWeight="400"
                  >
                    6 mins ago
                  </Text>
                </HStack>
              </HStack>
            </Stack>
          </Box>
        </Box>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Clickable Card</Text>
        <Center flex={1} px="3">
          <Example />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Checkbox</Text>
        <Center flex={1} px="3">
          <Example2 />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Form</Text>
        <Center style={{ width: wp(80) }}>
          <Example4 />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Radio Buttons</Text>
        <Center flex={1} px="3">
          <Example5 />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Select from Dropdown</Text>
        <Center flex={1} px="3">
          <Example6 />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Slider</Text>
        <Center flex={1} px="3">
          <Example7 />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>TextArea</Text>
        <Center flex={1} px="3">
          <Example8 />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Switch</Text>
        <Switch size="lg" colorScheme="cyan" />
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Divider</Text>
        <Center flex={1} px="3">
          <Example9 />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Collapse Alert</Text>
        <Center flex={1} px="3">
          <Example10 />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Progress Bar</Text>
        <Center flex={1} px="3">
          <Progress w="300" shadow={2} value={45} mx="4" />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Skeleton Loader</Text>
        <Center flex={1} px="3" width={wp(90)}>
          <Example11 />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Spinner</Text>
        <Spinner size="lg" />
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Toast</Text>
        <Center flex={1} px="3">
          <Example12 />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Alert Dialog</Text>
        <Center flex={1} px="3">
          <Example13 />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Modal</Text>
        <Center flex={1} px="3">
          <Example15 />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 20 }}>Popover</Text>
        <Center flex={1} px="3">
          <Example16 />
          <Text style={{ marginBottom: 10 }}>Tooltip (Hover)</Text>
          <Button>Tooltip (Hover)</Button>
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10, marginTop: 10 }}>
          Actionsheet (Select)
        </Text>
        <Center flex={1} px="3">
          <Example17 />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Avatar</Text>
        <Center flex={1} px="3">
          <Example18 />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>CheckIcon</Text>
        <HStack space={2}>
          <CheckIcon size="5" mt="0.5" color="emerald.500" />
          <Text color="emerald.500" fontSize="md">
            Order Placed Successfully
          </Text>
        </HStack>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Presence Transition</Text>
        <Center flex={1} px="3">
          <Example19 />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Slide (Banner)</Text>
        <Center flex={1} px="3">
          <Example20 />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Stagger (Animation)</Text>
        <Center flex={1} px="3">
          <Example21 />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Add Button</Text>
        <Center flex={1} px="3">
          <Example22 />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Todo List</Text>
        <Center flex={1} px="3">
          <Example23 />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>
          Tab View (Slide Gallery with tabs)
        </Text>
        <Center flex={1} px="3">
          <Example24 />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Scroll List View</Text>
        <Example25 />
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Form</Text>
        <Center flex={1} px="3" width={wp(90)}>
          <BuildingAFormExample />
        </Center>
      </NativeBaseProvider>
      <NativeBaseProvider>
        <Text style={{ marginBottom: 10 }}>Search Bar</Text>
        <Center flex={1} px="3" width={wp(90)}>
          <SearchBar />
        </Center>
      </NativeBaseProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

function Example() {
  return (
    <Pressable>
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Box
            maxW="96"
            borderWidth="1"
            borderColor="coolGray.300"
            shadow="3"
            bg={
              isPressed
                ? "coolGray.200"
                : isHovered
                ? "coolGray.200"
                : "coolGray.100"
            }
            p="5"
            rounded="8"
            style={{
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}
          >
            <HStack alignItems="center">
              <Badge
                colorScheme="darkBlue"
                _text={{
                  color: "white",
                }}
                variant="solid"
                rounded="4"
              >
                Business
              </Badge>
              <Spacer />
              <Text fontSize={10} color="coolGray.800">
                1 month ago
              </Text>
            </HStack>
            <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
              Marketing License
            </Text>
            <Text mt="2" fontSize="sm" color="coolGray.700">
              Unlock powerfull time-saving tools for creating email delivery and
              collecting marketing data
            </Text>
            <Flex>
              {isFocused ? (
                <Text
                  mt="2"
                  fontSize={12}
                  fontWeight="medium"
                  textDecorationLine="underline"
                  color="darkBlue.600"
                  alignSelf="flex-start"
                >
                  Read More
                </Text>
              ) : (
                <Text
                  mt="2"
                  fontSize={12}
                  fontWeight="medium"
                  color="darkBlue.600"
                >
                  Read More
                </Text>
              )}
            </Flex>
          </Box>
        );
      }}
    </Pressable>
  );
}

const Example2 = () => {
  return (
    <HStack space={6}>
      <Checkbox
        shadow={2}
        value="test"
        accessibilityLabel="This is a dummy checkbox"
        defaultIsChecked
      >
        I accept the terms & conditions
      </Checkbox>
    </HStack>
  );
};

const Example4 = () => {
  const [show, setShow] = React.useState(false);
  return (
    <Stack space={4} w="100%" alignItems="center">
      <Input
        w={{
          base: "75%",
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
        placeholder="Name"
      />
      <Input
        w={{
          base: "75%",
          md: "25%",
        }}
        type={show ? "text" : "password"}
        InputRightElement={
          <Pressable onPress={() => setShow(!show)}>
            <Icon
              as={
                <MaterialIcons name={show ? "visibility" : "visibility-off"} />
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
  );
};

const Example5 = () => {
  const [value, setValue] = React.useState("one");
  return (
    <Radio.Group
      name="myRadioGroup"
      accessibilityLabel="favorite number"
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue);
      }}
    >
      <Radio shadow={2} value="one" my="2">
        One
      </Radio>
      <Radio shadow={2} value="two" my="2">
        Two
      </Radio>
    </Radio.Group>
  );
};

const Example6 = () => {
  let [service, setService] = React.useState("");
  return (
    <VStack alignItems="center" space={4}>
      <Select
        shadow={2}
        selectedValue={service}
        minWidth="200"
        accessibilityLabel="Choose Service"
        placeholder="Choose Service"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />,
        }}
        _light={{
          bg: "coolGray.100",
          _hover: {
            bg: "coolGray.200",
          },
          _focus: {
            bg: "coolGray.200:alpha.70",
          },
        }}
        _dark={{
          bg: "coolGray.800",
          _hover: {
            bg: "coolGray.900",
          },
          _focus: {
            bg: "coolGray.900:alpha.70",
          },
        }}
        onValueChange={(itemValue) => setService(itemValue)}
      >
        <Select.Item shadow={2} label="UX Research" value="ux" />
        <Select.Item shadow={2} label="Web Development" value="web" />
        <Select.Item
          shadow={2}
          label="Cross Platform Development"
          value="cross"
        />
        <Select.Item shadow={2} label="UI Designing" value="ui" />
        <Select.Item shadow={2} label="Backend Development" value="backend" />
      </Select>
    </VStack>
  );
};

const Example7 = () => {
  const [onChangeValue, setOnChangeValue] = React.useState(70);
  const [onChangeEndValue, setOnChangeEndValue] = React.useState(70);
  return (
    <Box alignItems="center" w="100%">
      <Stack
        space={4}
        alignItems="center"
        w="75%"
        maxW="300"
        style={{ width: wp(80) }}
      >
        <Text textAlign="center">onChangeValue - {onChangeValue}</Text>
        <Text textAlign="center">onChangeEndValue - {onChangeEndValue}</Text>
        <Slider
          defaultValue={70}
          colorScheme="cyan"
          onChange={(v) => {
            setOnChangeValue(Math.floor(v));
          }}
          onChangeEnd={(v) => {
            v && setOnChangeEndValue(Math.floor(v));
          }}
        >
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
      </Stack>
    </Box>
  );
};

const Example8 = () => {
  return (
    <TextArea
      shadow={2}
      h={20}
      placeholder="Text Area Placeholder"
      w="200"
      _light={{
        placeholderTextColor: "trueGray.700",
        bg: "coolGray.100",
        _hover: {
          bg: "coolGray.200",
        },
        _focus: {
          bg: "coolGray.200:alpha.70",
        },
      }}
      _dark={{
        bg: "coolGray.800",
        _hover: {
          bg: "coolGray.900",
        },
        _focus: {
          bg: "coolGray.900:alpha.70",
        },
      }}
    />
  );
};

const Example9 = () => {
  return (
    <Box alignItems="center">
      <Flex direction="row" h="58" p="4">
        <Text>Simple</Text>
        <Divider bg="emerald.500" thickness="2" mx="2" orientation="vertical" />
        <Text>Easy</Text>
        <Divider bg="amber.500" thickness="2" mx="2" orientation="vertical" />
        <Text>Beautiful</Text>
      </Flex>
    </Box>
  );
};

function Example10() {
  const [show, setShow] = React.useState(true);
  return (
    <Box w="100%" alignItems="center">
      <Collapse isOpen={show}>
        <Alert maxW="400" status="error">
          <VStack space={1} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  _dark={{
                    color: "coolGray.800",
                  }}
                >
                  Please try again later!
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                _focus={{
                  borderWidth: 0,
                }}
                icon={<CloseIcon size="3" />}
                _icon={{
                  color: "coolGray.600",
                }}
                onPress={() => setShow(false)}
              />
            </HStack>
            <Box
              pl="6"
              _dark={{
                _text: {
                  color: "coolGray.600",
                },
              }}
            >
              Your coupon could not be processed at this time.
            </Box>
          </VStack>
        </Alert>
      </Collapse>
      <Button size={"sm"} onPress={() => setShow(true)} mt={8} mx="auto">
        Re-Open
      </Button>
    </Box>
  );
}

const Example11 = () => {
  return (
    <Center w="100%">
      <VStack
        w="90%"
        maxW="400"
        borderWidth="1"
        space={6}
        rounded="md"
        alignItems="center"
        _dark={{
          borderColor: "coolGray.500",
        }}
        _light={{
          borderColor: "coolGray.200",
        }}
      >
        <Skeleton h="40" />
        <Skeleton
          borderWidth={1}
          borderColor="coolGray.200"
          endColor="warmGray.50"
          size="20"
          rounded="full"
          mt="-70"
        />
        <HStack space="2">
          <Skeleton size="5" rounded="full" />
          <Skeleton size="5" rounded="full" />
          <Skeleton size="5" rounded="full" />
          <Skeleton size="5" rounded="full" />
          <Skeleton size="5" rounded="full" />
        </HStack>
        <Skeleton.Text lines={3} alignItems="center" px="12" />
        <Skeleton mb="3" w="40" rounded="20" />
      </VStack>
    </Center>
  );
};

const Example12 = () => {
  const toast = useToast();
  return (
    <Center>
      <VStack space={2}>
        <Button
          onPress={() =>
            toast.show({
              title: "Hello world",
              placement: "bottom",
            })
          }
        >
          Bottom
        </Button>

        <Button
          onPress={() =>
            toast.show({
              title: "Hello world",
              placement: "top",
            })
          }
        >
          Top
        </Button>

        <Button
          onPress={() =>
            toast.show({
              title: "Hello world",
              placement: "top-left",
            })
          }
        >
          Top left
        </Button>

        <Button
          onPress={() =>
            toast.show({
              title: "Hello world",
              placement: "top-right",
            })
          }
        >
          Top right
        </Button>

        <Button
          onPress={() =>
            toast.show({
              title: "Hello world",
              placement: "bottom-left",
            })
          }
        >
          Bottom left
        </Button>

        <Button
          onPress={() =>
            toast.show({
              title: "Hello world",
              placement: "bottom-right",
            })
          }
        >
          Bottom right
        </Button>
      </VStack>
    </Center>
  );
};

const Example13 = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);
  return (
    <Center>
      <Button
        shadow={2}
        colorScheme="danger"
        onPress={() => setIsOpen(!isOpen)}
      >
        Delete Customer
      </Button>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Customer</AlertDialog.Header>
          <AlertDialog.Body>
            This will remove all data relating to Alex. This action cannot be
            reversed. Deleted data can not be recovered.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={onClose}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

const StyledHamburgerIcon = Styled(HamburgerIcon)`
  transform: scale(2);`;

function Example14() {
  return (
    <Box w="90%" alignItems="center">
      <Menu
        closeOnSelect={false}
        w="190"
        onOpen={() => console.log("opened")}
        onClose={() => console.log("closed")}
        trigger={(triggerProps) => {
          return (
            <Pressable {...triggerProps}>
              <StyledHamburgerIcon />
            </Pressable>
          );
        }}
      >
        <Menu.OptionGroup defaultValue="Arial" title="free" type="radio">
          <Menu.ItemOption value="Arial">Arial</Menu.ItemOption>
          <Menu.ItemOption value="Nunito Sans">Nunito Sans</Menu.ItemOption>
          <Menu.ItemOption value="Roboto">Roboto</Menu.ItemOption>
        </Menu.OptionGroup>
        <Divider mt="3" w="100%" />
        <Menu.OptionGroup title="paid" type="checkbox">
          <Menu.ItemOption value="SF Pro">SF Pro</Menu.ItemOption>
          <Menu.ItemOption value="Helvetica">Helvetica</Menu.ItemOption>
        </Menu.OptionGroup>
      </Menu>
    </Box>
  );
}

const Example15 = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button shadow={2} onPress={() => setShowModal(true)}>
        Modal
      </Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

function Example16() {
  return (
    <Box h="60%" w="100%" alignItems="center">
      <Popover
        trigger={(triggerProps) => {
          return (
            <Button {...triggerProps} shadow={2} colorScheme={"danger"}>
              Popover
            </Button>
          );
        }}
      >
        <Popover.Content accessibilityLabel="Delete Customerd" w="56">
          <Popover.Arrow />
          <Popover.CloseButton />
          <Popover.Header>Delete Customer</Popover.Header>
          <Popover.Body>
            This will remove all data relating to Alex. This action cannot be
            reversed. Deleted data can not be recovered.
          </Popover.Body>
          <Popover.Footer justifyContent="flex-end">
            <Button.Group space={2}>
              <Button colorScheme="coolGray" variant="ghost">
                Cancel
              </Button>
              <Button colorScheme="danger">Delete</Button>
            </Button.Group>
          </Popover.Footer>
        </Popover.Content>
      </Popover>
    </Box>
  );
}

function Example17() {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <>
      <Button onPress={onOpen} shadow={2}>
        Actionsheet
      </Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: "gray.300",
              }}
            >
              Albums
            </Text>
          </Box>
          <Actionsheet.Item>Delete</Actionsheet.Item>
          <Actionsheet.Item>Share</Actionsheet.Item>
          <Actionsheet.Item>Play</Actionsheet.Item>
          <Actionsheet.Item>Favourite</Actionsheet.Item>
          <Actionsheet.Item>Cancel</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}

const Example18 = () => {
  return (
    <HStack justifyContent="center" space={2}>
      <Avatar
        bg="green.500"
        source={{
          uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        }}
      >
        AJ
      </Avatar>
      <Avatar
        bg="cyan.500"
        source={{
          uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        }}
      >
        TE
      </Avatar>
      <Avatar
        bg="indigo.500"
        source={{
          uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        }}
      >
        JB
      </Avatar>
      <Avatar
        bg="amber.500"
        source={{
          uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        }}
      >
        TS
      </Avatar>
    </HStack>
  );
};

const Example19 = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Center>
      <Button onPress={() => setIsOpen(!isOpen)}>
        {isOpen ? "Hide" : "Show"}
      </Button>
      <PresenceTransition
        visible={isOpen}
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 250,
          },
        }}
      >
        <Center w="200" h="100" mt="7" bg="teal.500" rounded="md">
          ScaleFade
        </Center>
      </PresenceTransition>
    </Center>
  );
};

const Example20 = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Center>
      <Box w={["250", "300"]} justifyContent="center">
        <VStack space={3}>
          <HStack alignItems="flex-end">
            <Heading>Order</Heading>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <Text fontWeight="medium">Sub Total</Text>
            <Text color="blueGray.400">$298.77</Text>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <Text fontWeight="medium">Tax</Text>
            <Text color="blueGray.400">$38.84</Text>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <Text fontWeight="medium">Total Amount</Text>
            <Text color="emerald.600">$337.61</Text>
          </HStack>
          <VStack space={2} mt="2">
            <Text bold>Promo Code</Text>
            <HStack space={3}>
              <Input flex="1" />
              <Button variant="outline">Apply</Button>
            </HStack>
          </VStack>
          <Button my="2" onPress={() => setIsOpen(!isOpen)}>
            Place Order
          </Button>
        </VStack>
        <Slide in={isOpen} placement="top">
          <Box
            w="100%"
            position="absolute"
            p="2"
            borderRadius="xs"
            bg="emerald.100"
            alignItems="center"
            justifyContent="center"
            _dark={{
              bg: "emerald.200",
            }}
            safeArea
          >
            <HStack space={2}>
              <CheckIcon
                size="4"
                color="emerald.600"
                mt="1"
                _dark={{
                  color: "emerald.700",
                }}
              />
              <Text
                color="emerald.600"
                textAlign="center"
                _dark={{
                  color: "emerald.700",
                }}
                fontWeight="medium"
              >
                Order Placed Successfully.
              </Text>
            </HStack>
          </Box>
        </Slide>
      </Box>
    </Center>
  );
};

const Example21 = () => {
  const { isOpen, onToggle } = useDisclose();
  return (
    <Box>
      <Box alignItems="center">
        <Stagger
          visible={isOpen}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 34,
          }}
          animate={{
            translateY: 0,
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring",
              mass: 0.8,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
          exit={{
            translateY: 34,
            scale: 0.5,
            opacity: 0,
            transition: {
              duration: 100,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
        >
          <IconButton
            mb="4"
            variant="solid"
            bg="indigo.500"
            colorScheme="indigo"
            borderRadius="full"
            icon={
              <Icon
                as={MaterialIcons}
                size="6"
                name="location-pin"
                _dark={{
                  color: "warmGray.50",
                }}
                color="warmGray.50"
              />
            }
          />
          <IconButton
            mb="4"
            variant="solid"
            bg="yellow.400"
            colorScheme="yellow"
            borderRadius="full"
            icon={
              <Icon
                as={MaterialCommunityIcons}
                _dark={{
                  color: "warmGray.50",
                }}
                size="6"
                name="microphone"
                color="warmGray.50"
              />
            }
          />
          <IconButton
            mb="4"
            variant="solid"
            bg="teal.400"
            colorScheme="teal"
            borderRadius="full"
            icon={
              <Icon
                as={MaterialCommunityIcons}
                _dark={{
                  color: "warmGray.50",
                }}
                size="6"
                name="video"
                color="warmGray.50"
              />
            }
          />
          <IconButton
            mb="4"
            variant="solid"
            bg="red.500"
            colorScheme="red"
            borderRadius="full"
            icon={
              <Icon
                as={MaterialIcons}
                size="6"
                name="photo-library"
                _dark={{
                  color: "warmGray.50",
                }}
                color="warmGray.50"
              />
            }
          />
        </Stagger>
      </Box>
      <HStack justifyContent="center">
        <IconButton
          variant="solid"
          borderRadius="full"
          size="lg"
          onPress={onToggle}
          bg="cyan.400"
          icon={
            <Icon
              as={MaterialCommunityIcons}
              size="6"
              name="dots-horizontal"
              color="warmGray.50"
              _dark={{
                color: "warmGray.50",
              }}
            />
          }
        />
      </HStack>
    </Box>
  );
};

const Example22 = () => {
  return (
    <Box
      height={hp(20)}
      width={wp(80)}
      shadow="2"
      rounded="lg"
      bg="white:alpha.20"
    >
      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
      />
    </Box>
  );
};

const Example23 = () => {
  const instState = [
    {
      title: "Code",
      isCompleted: true,
    },
    {
      title: "Meeting with team at 9",
      isCompleted: false,
    },
    {
      title: "Check Emails",
      isCompleted: false,
    },
    {
      title: "Write an article",
      isCompleted: false,
    },
  ];
  const [list, setList] = React.useState(instState);
  const [inputValue, setInputValue] = React.useState("");
  const toast = useToast();

  const addItem = (title) => {
    if (title === "") {
      toast.show({
        title: "Please Enter Text",
        status: "warning",
      });
      return;
    }

    setList((prevList) => {
      return [
        ...prevList,
        {
          title: title,
          isCompleted: false,
        },
      ];
    });
  };

  const handleDelete = (index) => {
    setList((prevList) => {
      const temp = prevList.filter((_, itemI) => itemI !== index);
      return temp;
    });
  };

  const handleStatusChange = (index) => {
    setList((prevList) => {
      const newList = [...prevList];
      newList[index].isCompleted = !newList[index].isCompleted;
      return newList;
    });
  };

  return (
    <Center w="100%">
      <Box maxW="300" w="100%">
        <Heading mb="2" size="md">
          Wednesday
        </Heading>
        <VStack space={4}>
          <HStack space={2}>
            <Input
              flex={1}
              onChangeText={(v) => setInputValue(v)}
              value={inputValue}
              placeholder="Add Task"
            />
            <IconButton
              borderRadius="sm"
              variant="solid"
              icon={
                <Icon as={Feather} name="plus" size="sm" color="warmGray.50" />
              }
              onPress={() => {
                addItem(inputValue);
                setInputValue("");
              }}
            />
          </HStack>
          <VStack space={2}>
            {list.map((item, itemI) => (
              <HStack
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                key={item.title + itemI.toString()}
              >
                <Checkbox
                  isChecked={item.isCompleted}
                  onChange={() => handleStatusChange(itemI)}
                  value={item.title}
                ></Checkbox>
                <Text
                  width="100%"
                  flexShrink={1}
                  textAlign="left"
                  mx="2"
                  strikeThrough={item.isCompleted}
                  _light={{
                    color: item.isCompleted ? "gray.400" : "coolGray.800",
                  }}
                  _dark={{
                    color: item.isCompleted ? "gray.400" : "coolGray.50",
                  }}
                  onPress={() => handleStatusChange(itemI)}
                >
                  {item.title}
                </Text>
                <IconButton
                  size="sm"
                  colorScheme="trueGray"
                  icon={
                    <Icon
                      as={Entypo}
                      name="minus"
                      size="xs"
                      color="trueGray.400"
                    />
                  }
                  onPress={() => handleDelete(itemI)}
                />
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Box>
    </Center>
  );
};

const FirstRoute = () => (
  <Center flex={1} my="4">
    This is Tab 1
  </Center>
);

const SecondRoute = () => (
  <Center flex={1} my="4">
    This is Tab 2
  </Center>
);

const ThirdRoute = () => (
  <Center flex={1} my="4">
    This is Tab 3
  </Center>
);

const FourthRoute = () => (
  <Center flex={1} my="4">
    This is Tab 4{" "}
  </Center>
);

const initialLayout = {
  width: Dimensions.get("window").width,
};
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
});

function Example24() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "first",
      title: "Tab 1",
    },
    {
      key: "second",
      title: "Tab 2",
    },
    {
      key: "third",
      title: "Tab 3",
    },
    {
      key: "fourth",
      title: "Tab 4",
    },
  ]);

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          const color =
            index === i
              ? useColorModeValue("#000", "#e5e5e5")
              : useColorModeValue("#1f2937", "#a1a1aa");
          const borderColor =
            index === i
              ? "cyan.500"
              : useColorModeValue("coolGray.200", "gray.400");
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              cursor="pointer"
            >
              <Pressable
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    color,
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <TabView
      navigationState={{
        index,
        routes,
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{
        marginTop: StatusBar.currentHeight,
        width: wp(90),
      }}
    />
  );
}

function Example25() {
  const [mode, setMode] = useState("Basic");
  return (
    <Box flex="1" bg="white">
      <Heading p="4" pb="3" size="lg">
        Inbox
      </Heading>
      <ScrollView style={{ maxHeight: 100 }}>
        <Basic />
      </ScrollView>
    </Box>
  );
}

function Basic() {
  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      fullName: "Afreen Khan",
      timeStamp: "12:47 PM",
      recentText: "Good Day!",
      avatarUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      fullName: "Sujita Mathur",
      timeStamp: "11:11 PM",
      recentText: "Cheer up, there!",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      fullName: "Anci Barroco",
      timeStamp: "6:22 PM",
      recentText: "Good Day!",
      avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
    },
    {
      id: "68694a0f-3da1-431f-bd56-142371e29d72",
      fullName: "Aniket Kumar",
      timeStamp: "8:56 PM",
      recentText: "All the best",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
    },
    {
      id: "28694a0f-3da1-471f-bd96-142456e29d72",
      fullName: "Kiara",
      timeStamp: "12:47 PM",
      recentText: "I will call today.",
      avatarUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    },
  ];
  const [listData, setListData] = useState(data);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = ({ item, index }) => (
    <Box>
      <Pressable
        onPress={() => console.log("You touched me")}
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "white",
        }}
      >
        <Box pl="4" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <Avatar
              size="48px"
              source={{
                uri: item.avatarUrl,
              }}
            />
            <VStack>
              <Text
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
                bold
              >
                {item.fullName}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                {item.recentText}
              </Text>
            </VStack>
            <Spacer />
            <Text
              fontSize="xs"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              alignSelf="flex-start"
            >
              {item.timeStamp}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        cursor="pointer"
        bg="coolGray.200"
        justifyContent="center"
        onPress={() => closeRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon
            as={<Entypo name="dots-three-horizontal" />}
            size="xs"
            color="coolGray.800"
          />
          <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
            More
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <Box bg="white" safeArea flex="1">
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-130}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    </Box>
  );
}

function BuildingAFormExample() {
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    if (formData.name === undefined) {
      setErrors({ ...errors, name: "Name is required" });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({ ...errors, name: "Name is too short" });
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    validate() ? console.log("Submitted") : console.log("Validation Failed");
  };

  return (
    <VStack width="90%" mx="3" maxW="300px">
      <FormControl isRequired isInvalid={"name" in errors}>
        <FormControl.Label
          _text={{
            bold: true,
          }}
        >
          Name
        </FormControl.Label>
        <Input
          placeholder="John"
          onChangeText={(value) => setData({ ...formData, name: value })}
        />
        {"name" in errors ? (
          <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
        ) : (
          <FormControl.HelperText>
            Name should contain atleast 3 character.
          </FormControl.HelperText>
        )}
      </FormControl>
      <Button onPress={onSubmit} mt="5" colorScheme="cyan">
        Submit
      </Button>
    </VStack>
  );
}

function SearchBar() {
  return (
    <VStack
      my="4"
      space={5}
      w="100%"
      maxW="300px"
      divider={
        <Box px="2">
          <Divider />
        </Box>
      }
    >
      <VStack w="100%" space={5} alignSelf="center">
        <Heading fontSize="lg">Cupertino</Heading>
        <Input
          placeholder="Search"
          variant="filled"
          width="100%"
          borderRadius="10"
          py="1"
          px="2"
          InputLeftElement={
            <Icon
              ml="2"
              size="4"
              color="gray.400"
              as={<Ionicons name="ios-search" />}
            />
          }
        />
      </VStack>

      <VStack w="100%" space={5} alignSelf="center">
        <Heading fontSize="lg">Material</Heading>
        <Input
          placeholder="Search People & Places"
          width="100%"
          borderRadius="4"
          py="3"
          px="1"
          fontSize="14"
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
          InputRightElement={
            <Icon
              m="2"
              mr="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="mic" />}
            />
          }
        />
      </VStack>
    </VStack>
  );
}
