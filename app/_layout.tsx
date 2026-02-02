import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  const router = useRouter();

  return (
    <Stack>
      {/* Home Page */}
      <Stack.Screen
        name="index"
        options={{
          title: "FillMyData",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/profile")}
              style={{ paddingHorizontal: 4 }}
            >
              <Ionicons name="person-circle-outline" size={26} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Profile Page */}
      <Stack.Screen
        name="profile"
        options={{ title: "My Data" }}
      />

      {/* Fill Page */}
      <Stack.Screen
        name="fill"
        options={{
          title: "Fill Assistant", // <-- now your header shows this instead of "Fill"
          headerShown: true,      // ensure header is visible
        }}
      />
    </Stack>
  );
}
