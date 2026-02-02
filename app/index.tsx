import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function HomeScreen() {
  const router = useRouter();
  const [formLink, setFormLink] = useState("");

  const handleSubmit = () => {
    if (!formLink.trim()) {
      Alert.alert("Missing Link", "Please paste a Google Form link");
      return;
    }

    if (!formLink.includes("docs.google.com/forms")) {
      Alert.alert("Invalid Link", "Please enter a valid Google Form link");
      return;
    }

    router.push({
      pathname: "/fill",
      params: { formLink },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FillMyData</Text>
      <Text style={styles.subtitle}>
        Paste your Google Form link below
      </Text>

      <TextInput
        style={styles.input}
        placeholder="https://docs.google.com/forms/..."
        value={formLink}
        onChangeText={setFormLink}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Open & Fill</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
