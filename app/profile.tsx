import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [college, setCollege] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await AsyncStorage.getItem("profile");
    if (data) {
      const p = JSON.parse(data);
      setName(p.name || "");
      setRoll(p.roll || "");
      setCollege(p.college || "");
      setAddress(p.address || "");
    }
  };

  const saveProfile = async () => {
    await AsyncStorage.setItem(
      "profile",
      JSON.stringify({ name, roll, college, address })
    );
    Alert.alert("Saved", "Your data has been saved");
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Roll No" value={roll} onChangeText={setRoll} />
      <TextInput style={styles.input} placeholder="College" value={college} onChangeText={setCollege} />
      <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />

      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", textAlign: "center" },
});
