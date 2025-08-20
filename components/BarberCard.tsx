import { useState } from "react";
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Barber {
  name: string;
  specialty: string;
  image: string;
  nextAvailableTime: string;
  price: number;
}

interface Props {
  barber: Barber;
}

const BarberCard = ({ barber }: Props) => {
  const [inQueue, setInQueue] = useState(false);
  const [queueSize, setQueueSize] = useState(3); // mock starting queue size
  const [isBaller, setIsBaller] = useState(false);
  const [bringingFriend, setBringingFriend] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleJoinQueue = () => {
    if (inQueue) {
      // leave queue
      setInQueue(false);
      setIsBaller(false);
      setBringingFriend(false);
      setQueueSize(queueSize - 1);
    } else {
      // join queue
      setInQueue(true);
      setQueueSize(queueSize + 1);
    }
  };

  const handleBallerPress = () => {
    if (isBaller) {
      setIsBaller(false);
    } else {
      setModalVisible(true);
    }
  };

  const confirmBaller = () => {
    setIsBaller(true);
    setModalVisible(false);
  };

  const toggleFriend = () => {
    if (bringingFriend) {
      setBringingFriend(false);
      setQueueSize(queueSize - 1);
    } else {
      setBringingFriend(true);
      setQueueSize(queueSize + 1);
    }
  };

  // calculate wait time
  const clientsAhead = isBaller ? 0 : queueSize - 1;
  const waitTime = clientsAhead * 15;

  return (
    <View className="w-full mt-6 px-4 py-5 rounded-2xl bg-white border border-black/10">
      {/* Barber Image */}
      <Image
        source={{ uri: barber.image }}
        className="w-full h-52 rounded-2xl"
      />

      <View className="flex flex-col mt-4">
        {/* Name & Specialty */}
        <Text className="text-xl font-rubik-bold text-black-300">
          {barber.name}
        </Text>
        <Text className="text-sm font-rubik text-black-100">
          {barber.specialty}
        </Text>

        {/* Next Available Appointment */}
        <View className="flex flex-row items-center justify-between mt-4">
          <Text className="text-sm font-rubik text-black-100">
            Next available:
          </Text>
          <Text className="text-lg font-rubik-bold text-black-300">
            {barber.nextAvailableTime}
          </Text>
        </View>

        {/* Price */}
        <View className="flex flex-row items-center justify-between mt-3">
          <Text className="text-base font-rubik-bold text-black-300">
            ${barber.price}
          </Text>
        </View>

        {/* Queue Info */}
        {inQueue && (
          <View className="mt-4 p-3 rounded-lg border border-black/20">
            <Text className="text-sm font-rubik text-black-300">
              You are in the queue {isBaller && "(Baller Mode)"}.
            </Text>
            <Text className="text-sm font-rubik text-black-300">
              Clients ahead: {clientsAhead}
            </Text>
            <Text className="text-sm font-rubik text-black-300">
              Approx wait: {waitTime} mins
            </Text>
            {bringingFriend && (
              <Text className="text-sm font-rubik text-black-300">
                (+1 Friend Added)
              </Text>
            )}
          </View>
        )}

        {/* Join/Leave Queue Button */}
        <TouchableOpacity
          onPress={handleJoinQueue}
          className="mt-4 py-3 rounded-xl border border-black"
        >
          <Text className="text-center text-black font-rubik-bold">
            {inQueue ? "Leave Queue" : "Join Queue Now"}
          </Text>
        </TouchableOpacity>

        {/* Baller Button */}
        {inQueue && (
          <TouchableOpacity
            onPress={handleBallerPress}
            className="mt-3 py-3 rounded-xl border border-black"
          >
            <Text className="text-center text-black font-rubik-bold">
              {isBaller ? "Cancel Baller Mode" : "Baller 🏆"}
            </Text>
          </TouchableOpacity>
        )}

        {/* +1 Friend Toggle */}
        {inQueue && (
          <TouchableOpacity
            onPress={toggleFriend}
            className="mt-3 py-3 rounded-xl border border-black"
          >
            <Text className="text-center text-black font-rubik-bold">
              {bringingFriend ? "Remove +1 Friend" : "Add +1 Friend"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Modal Popup for Baller */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-80 bg-white rounded-2xl p-6 border border-black/10">
            <Text className="text-lg font-rubik-bold text-black-300 mb-3">
              Baller Mode
            </Text>
            <Text className="text-sm font-rubik text-black-100 mb-5">
              You will be placed in the front of the queue for{" "}
              <Text className="font-rubik-bold text-black-300">$30</Text> (not
              including haircut price).
            </Text>

            <TouchableOpacity
              onPress={confirmBaller}
              className="border border-black py-3 rounded-xl mb-3"
            >
              <Text className="text-center text-black font-rubik-bold">
                Confirm Baller
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="border border-black py-3 rounded-xl"
            >
              <Text className="text-center text-black font-rubik-bold">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BarberCard;
