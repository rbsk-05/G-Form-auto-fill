import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "USER_PROFILE";

export default function ProfileScreen() {
  const [fullName, setFullName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [college, setCollege] = useState("");
  const [address, setAddress] = useState("");

  // Load saved data on screen mount
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setFullName(parsed.fullName || "");
        setRollNo(parsed.rollNo || "");
        setCollege(parsed.college || "");
        setAddress(parsed.address || "");
      }
    } catch (error) {
      console.error("Failed to load profile", error);
    }
  };

  const saveProfile = async () => {
    try {
      const profileData = {
        fullName,
        rollNo,
        college,
        address,
      };

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(profileData)
      );

      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Failed to save profile", error);
      alert("Something went wrong while saving");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Enter your full name"
      />

      <Text style={styles.label}>Roll Number</Text>
      <TextInput
        style={styles.input}
        value={rollNo}
        onChangeText={setRollNo}
        placeholder="Enter roll number"
      />

      <Text style={styles.label}>College</Text>
      <TextInput
        style={styles.input}
        value={college}
        onChangeText={setCollege}
        placeholder="Enter college name"
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter address"
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Save My Data</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
    marginTop: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 24,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

