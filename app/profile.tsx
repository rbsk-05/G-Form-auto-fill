import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

type Field = {
  label: string;
  value: string;
};

export default function ProfileScreen() {
  const [fields, setFields] = useState<Field[]>([
    { label: "Name", value: "" },
    { label: "Roll No", value: "" },
    { label: "College", value: "" },
    { label: "Address", value: "" },
  ]);

  const [addingField, setAddingField] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await AsyncStorage.getItem("profile");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          setFields(parsed);
        } else {
          // fallback if old format was an object
          const fallback: Field[] = [
            { label: "Name", value: parsed.name || "" },
            { label: "Roll No", value: parsed.roll || "" },
            { label: "College", value: parsed.college || "" },
            { label: "Address", value: parsed.address || "" },
          ];
          setFields(fallback);
        }
      } catch (err) {
        console.error("Failed to parse profile:", err);
      }
    }
  };

  const saveProfile = async () => {
    await AsyncStorage.setItem("profile", JSON.stringify(fields));
    Alert.alert("Saved", "Your data has been saved");
  };

  const updateField = (index: number, text: string) => {
    const newFields = [...fields];
    newFields[index].value = text;
    setFields(newFields);
  };

  const deleteField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const confirmAddField = () => {
    if (!newLabel.trim()) {
      Alert.alert("Error", "Field label cannot be empty");
      return;
    }
    setFields([...fields, { label: newLabel.trim(), value: newValue }]);
    setAddingField(false);
    setNewLabel("");
    setNewValue("");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Existing fields with delete */}
      {Array.isArray(fields) &&
        fields.map((f, i) => (
          <View key={i} style={styles.inputGroupRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>{f.label}</Text>
              <TextInput
                style={styles.input}
                value={f.value}
                onChangeText={(text) => updateField(i, text)}
              />
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                Alert.alert(
                  "Delete Field",
                  `Are you sure you want to delete "${f.label}"?`,
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: () => deleteField(i),
                    },
                  ]
                );
              }}
            >
              <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}

      {/* Inline add new field */}
      {addingField && (
        <View style={styles.addFieldContainer}>
          <TextInput
            style={[styles.input, { marginBottom: 6 }]}
            placeholder="Field Label"
            value={newLabel}
            onChangeText={setNewLabel}
          />
          <TextInput
            style={styles.input}
            placeholder="Field Value"
            value={newValue}
            onChangeText={setNewValue}
          />
          <View style={styles.addFieldButtons}>
            <TouchableOpacity
              style={[styles.addButton, { flex: 1, marginRight: 4 }]}
              onPress={confirmAddField}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.addButton,
                { flex: 1, backgroundColor: "#999", marginLeft: 4 },
              ]}
              onPress={() => setAddingField(false)}
            >
              <Text style={styles.addButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Button to start adding field */}
      {!addingField && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setAddingField(true)}
        >
          <Text style={styles.addButtonText}>+ Add Field</Text>
        </TouchableOpacity>
      )}

      {/* Save profile */}
      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  inputGroupRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  inputLabel: { fontWeight: "600", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    borderColor: "#ccc",
  },
  deleteButton: { marginLeft: 8, padding: 8, justifyContent: "center", alignItems: "center" },
  deleteText: { fontSize: 18 },
  addFieldContainer: {
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    borderColor: "#ccc",
  },
  addFieldButtons: { flexDirection: "row", marginTop: 8, justifyContent: "space-between" },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: { color: "#fff", fontWeight: "600", textAlign: "center" },
  button: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
