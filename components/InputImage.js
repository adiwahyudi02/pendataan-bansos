import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Label from "./Label";
import Errormessage from "./ErrorMessage";

const InputImage = (props) => {
  const { name, label, description, maxSize, availableExtensions, rest } =
    props;
  const { setFieldValue, values, errors, touched } = rest;

  const [fileName, setFileName] = useState("");

  const getFileInfo = async (fileURI) => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI);
    return fileInfo;
  };

  const isLessThanTheMB = (fileSize, smallerThanSizeMB) => {
    const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB;
    return isOk;
  };

  const isAvailableExtensions = (fileUri, availableExtensions) => {
    const extensions = availableExtensions.map((name) => name.toLowerCase());
    const isOk = extensions.includes(
      fileUri.substr(fileUri.lastIndexOf(".") + 1).toLowerCase()
    );
    return isOk;
  };

  const handleUploadPhoto = async () => {
    try {
      let permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Ijin untuk mengakses kamera diperlukan!");
        return;
      }

      let file = await ImagePicker.launchImageLibraryAsync();
      if (file.cancelled) return;

      const fileInfo = await getFileInfo(file.uri);
      if (!fileInfo?.size) {
        alert("Tidak dapat memilih file ini karena ukurannya tidak diketahui.");
        return;
      }

      const checkSize = isLessThanTheMB(fileInfo.size, maxSize);
      if (!checkSize) {
        alert(
          `Ukuran file melebihi maksimal, Ukuran maximal adalah ${maxSize} Mb!`
        );
        return;
      }

      const checkExtension = isAvailableExtensions(
        file.uri,
        availableExtensions
      );
      if (!checkExtension) {
        alert(`Jenis gambar tidak didukung!`);
        return;
      }

      let filename = file.uri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      setFileName(
        filename.length > 15
          ? filename.substr(0, 15) +
              "..." +
              filename.substr(
                filename.length - match[1].length - 5,
                filename.length - match[1].length
              )
          : filename
      );

      setFieldValue(name, {
        uri: file.uri,
        type,
        filename,
      });
    } catch (error) {
      console.info(error);
    }
  };

  return (
    <View style={styles.container}>
      <Label
        label={label}
        description={description}
        isError={errors[name] && touched[name]}
      />
      <Errormessage
        isError={errors[name] && touched[name]}
        message={errors[name]}
      />

      {Object.keys(values[name]).length !== 0 ? (
        <View style={styles.choosedFileContainer}>
          <Text style={styles.choosedFileText}>{fileName}</Text>
          <Text
            onPress={() => setFieldValue(name, {})}
            style={styles.deleteChoosedFileIcon}
          >
            x
          </Text>
        </View>
      ) : (
        <TouchableOpacity onPress={handleUploadPhoto} style={styles.button}>
          <Text style={styles.buttonText}>Tambahkan Foto</Text>
          <Text style={styles.buttonIcon}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
  },
  button: {
    width: 150,
    backgroundColor: "#069550",
    paddingHorizontal: 16,
    paddingVertical: 9,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    width: "85%",
    fontSize: 14,
    color: "#fff",
  },
  buttonIcon: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  choosedFileContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 9,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  choosedFileText: {
    width: "90%",
    color: "black",
    fontWeight: "500",
  },
  deleteChoosedFileIcon: {
    paddingHorizontal: 8,
    color: "black",
    fontWeight: "500",
    fontSize: 20,
  },
});

export default InputImage;
