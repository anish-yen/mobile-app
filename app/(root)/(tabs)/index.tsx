import BarberCard from "@/components/BarberCard";
import { SafeAreaView, Text, View } from "react-native";

const barber = {
  name: "John Smith",
  specialty: "Fade Specialist",
  image: "https://randomuser.me/api/portraits/men/32.jpg",
  nextAvailableTime: "2:30 PM",
  price: 25,
};

const Home = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="px-5 mt-5">
        <Text className="text-2xl font-rubik-bold mb-5">Your Barber</Text>
        <BarberCard barber={barber} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
