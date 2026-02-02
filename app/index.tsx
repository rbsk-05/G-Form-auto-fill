import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function HomeScreen() {
  const [formLink, setFormLink] = useState("");

  const handleSubmit = () => {
    if (!formLink.trim()) {
      alert("Please paste a Google Form link");
      return;
    }

    console.log("GForm link:", formLink);
    // later → trigger autofill logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Autofill Google Forms</Text>
      <Text style={styles.description}>
        Paste your Google Form link below and we’ll fill it using your saved profile.
      </Text>

      <TextInput
        placeholder="https://docs.google.com/forms/..."
        value={formLink}
        onChangeText={setFormLink}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Use this Form</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: "#555",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
