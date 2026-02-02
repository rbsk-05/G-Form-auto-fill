import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

export default function FillScreen() {
  const { formLink } = useLocalSearchParams();
  const [profile, setProfile] = useState<any>(null);
  const [step, setStep] = useState(0);
  const [orderedFields, setOrderedFields] = useState<{ label: string; value: string }[]>([]);


  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
  const data = await AsyncStorage.getItem("profile");
  if (data) {
    const parsed = JSON.parse(data);
    setProfile(parsed);

    // Dynamically generate orderedFields
    const fields: { label: string; value: string }[] = [];

    // If profile is an array of {label, value} (dynamic fields)
    if (Array.isArray(parsed)) {
      parsed.forEach((f) => {
        fields.push({ label: f.label, value: f.value });
      });
    } else if (typeof parsed === "object") {
      // For standard object keys
      Object.keys(parsed).forEach((key) => {
        fields.push({ label: key, value: parsed[key] });
      });
    }

    setOrderedFields(fields);
  }
};


  const openForm = async () => {
    if (!formLink) {
      Alert.alert("Error", "Form link not found");
      return;
    }
    await Linking.openURL(formLink as string);
  };

  const copy = async (value: string) => {
    await Clipboard.setStringAsync(value);
    Alert.alert("Copied", "Paste it in the form");
  };

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>No profile data found</Text>
        <Text style={{ color: "#666" }}>Please add your data in My Data first.</Text>
      </View>
    );
  }

  const prevField = () => {
    setStep((prev) => (prev === 0 ? orderedFields.length - 1 : prev - 1));
  };

  const nextField = () => {
    setStep((prev) => (prev === orderedFields.length - 1 ? 0 : prev + 1));
  };

  const copyCurrent = async () => {
    await Clipboard.setStringAsync(orderedFields[step].value);
    Alert.alert("Copied", `"${orderedFields[step].label}" copied`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Fill Assistant</Text>

      {/* 🔹 GUIDED FILL */}
      <Text style={styles.sectionTitle}>Guided Fill</Text>

      <Text style={styles.step}>
        Step {step + 1} / {orderedFields.length}
      </Text>

      <View style={styles.field}>
        <Text style={styles.label}>{orderedFields[step].label}</Text>
        <Text style={styles.value}>{orderedFields[step].value}</Text>
      </View>

      <View style={styles.guidedButtons}>
        <TouchableOpacity style={styles.prevNextBtn} onPress={prevField}>
          <Text style={styles.prevText}>⬅️ Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.copyBtn} onPress={copyCurrent}>
          <Text style={styles.copyText}>📋 Copy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.prevNextBtn} onPress={nextField}>
          <Text style={styles.nextText}>Next ➡️</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.openBtn} onPress={openForm}>
        <Text style={styles.openText}>Open Google Form</Text>
      </TouchableOpacity>

      {/* 🔹 QUICK COPY CARDS */}
      <Text style={styles.sectionTitle}>Quick Copy</Text>
      <View style={styles.quickContainer}>
        {orderedFields.map((f) => (
          <TouchableOpacity key={f.label} style={styles.quickCard} onPress={() => copy(f.value)}>
            <Text style={styles.quickText}>{f.label}</Text>
            <Text style={{ marginTop: 4, fontSize: 12, color: "#555" }}>{f.value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },

  sectionTitle: { fontSize: 16, fontWeight: "600", marginTop: 16, marginBottom: 8 },
  step: { color: "#666", marginBottom: 8 },

  field: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  label: { fontWeight: "600" },
  value: { marginTop: 6 },

  guidedButtons: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },

  prevNextBtn: {
    backgroundColor: "#d1d5db", // soft gray (muted, non-distracting)
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 4,
  },
  prevText: {color: "#000", textAlign: "center", fontWeight: "600"},
  nextText: {color: "#000", textAlign: "center", fontWeight: "600"},
  copyBtn: {
    backgroundColor: "#007AFF", // bright blue for Copy
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 4,
  },
  copyText: { color: "#fff", textAlign: "center", fontWeight: "600" },


  openBtn: { backgroundColor: "#000", padding: 14, borderRadius: 10, marginBottom: 16 },
  openText: { color: "#fff", textAlign: "center", fontSize: 16 },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  quickContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },
  quickCard: {
    width: "48%", // 2 cards per row
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  quickText: { fontWeight: "600" },
});
