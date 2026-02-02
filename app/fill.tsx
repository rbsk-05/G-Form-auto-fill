import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

export default function FillScreen() {
  const { formLink } = useLocalSearchParams();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await AsyncStorage.getItem("profile");
    if (data) {
      setProfile(JSON.parse(data));
    }
  };

  const copy = async (value: string) => {
    await Clipboard.setStringAsync(value);
    Alert.alert("Copied", "Paste it in the form");
  };

  const openForm = async () => {
    if (!formLink) {
      Alert.alert("Error", "Form link not found");
      return;
    }
    await Linking.openURL(formLink as string);
  };

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text>No profile data found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Fill Assistant</Text>

      <Field label="Name" value={profile.name} onCopy={copy} />
      <Field label="Roll No" value={profile.roll} onCopy={copy} />
      <Field label="College" value={profile.college} onCopy={copy} />
      <Field label="Address" value={profile.address} onCopy={copy} />

      <TouchableOpacity style={styles.openBtn} onPress={openForm}>
        <Text style={styles.openText}>Open Google Form</Text>
      </TouchableOpacity>
    </View>
  );
}

function Field({ label, value, onCopy }: any) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <TouchableOpacity style={styles.copyBtn} onPress={() => onCopy(value)}>
        <Text style={styles.copyText}>Copy</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  field: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  label: { fontWeight: "600" },
  value: { marginVertical: 6 },
  copyBtn: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  copyText: { color: "#fff" },
  openBtn: {
    marginTop: 20,
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 10,
  },
  openText: { color: "#fff", textAlign: "center", fontSize: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
