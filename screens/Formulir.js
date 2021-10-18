import React, { useState } from "react";
import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { AntDesign } from "@expo/vector-icons";
import InputText from "../components/InputText";
import InputRadio from "../components/InputRadio";
import InputImage from "../components/InputImage";
import Overlay from "../components/Overlay";
import InputCheckbox from "../components/InputCheckbox";
import Button from "../components/Button";

const Formulir = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [messageFailed, setMessageFailed] = useState("");

  const initials = {
    nama: "",
    nik: "",
    nokk: "",
    fotoKtp: {},
    fotoKk: {},
    umur: "",
    jk: "",
    alamat: "",
    rt: "",
    rw: "",
    penghasilanSebelumPandemi: "",
    penghasilanSetelahPandemi: "",
    alasanMembutuhkan: "",
    alasanLainnya: "",
    tanggungJawabRw: [],
  };

  const validation = Yup.object().shape({
    nama: Yup.string().required("Harap masukkan nama"),
    nik: Yup.string()
      .required("Harap masukkan nik")
      .max(18, "Harap tidak lebih dari 16 karakter")
      .min(18, "Harap tidak kurang dari 16 karakter"),
    nokk: Yup.string()
      .required("Harap masukkan nomor kartu keluarga")
      .max(18, "Harap tidak lebih dari 16 karakter")
      .min(18, "Harap tidak kurang dari 16 karakter"),
    fotoKtp: Yup.mixed().test(
      "is-object-required",
      "Harap menyisipkan foto KTP",
      (value) => Object.keys(value).length !== 0
    ),
    fotoKk: Yup.mixed().test(
      "is-object-required",
      "Harap menyisipkan foto kartu keluarga",
      (value) => Object.keys(value).length !== 0
    ),
    umur: Yup.number()
      .required("Harap masukkan umur penerima")
      .min(25, "Minimal umur penerima diatas 25 tahun"),
    jk: Yup.string().required("Harap pilih jenis kelamin"),
    alamat: Yup.string()
      .max(255, "Harap alamat tidak lebih dari 255 karakter")
      .required("Harap masukkan alamat"),
    rt: Yup.number()
      .min(0, "RT harus berupa angka positif")
      .required("Harap masukkan RT"),
    rw: Yup.number()
      .min(0, "RW harus berupa angka positif")
      .required("Harap masukkan RW"),
    penghasilanSebelumPandemi: Yup.string().required(
      "Harap masukkan penghasilan sebelum pandemi"
    ),
    penghasilanSetelahPandemi: Yup.string().required(
      "Harap masukkan penghasilan setelah pandemi"
    ),
    alasanMembutuhkan: Yup.string().required("Harap pilih alasan"),
    alasanLainnya: Yup.string().when(
      ["alasanMembutuhkan"],
      (alasanMembutuhkan, schema) => {
        return alasanMembutuhkan === "Lainnya"
          ? schema.required("Harap masukkan alasan lainnya")
          : schema;
      }
    ),
    tanggungJawabRw: Yup.array().min(
      1,
      "Harap mencentang untuk dapat mengirimkan data"
    ),
  });

  const numberOnly = (value) => {
    return Number(value.replace(/[^0-9]/g, ""));
  };

  const rupiah = (value) => {
    let angka = parseInt(value.replace(/,.*|[^0-9]/g, ""), 10);
    if (angka > -1) {
      let rupiah = "";
      let angkarev = angka.toString().split("").reverse().join("");
      for (let i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
      return rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("");
    } else {
      return "";
    }
  };

  const nikAndKk = (value) => {
    let angka = value
      .toString()
      .split("")
      .join("")
      .replace(/[^0-9]/g, "");
    let result = "";
    result.length < 6 ? (result += angka.substring(0, 6) + " ") : null;
    result.length < 12 ? (result += angka.substring(6, 12) + " ") : null;
    result.length < 16 ? (result += angka.substring(12, 16) + " ") : null;

    return result
      .split("", result.length - 1)
      .join("")
      .trim();
  };

  const timeout = (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(reject, ms, Error("Internal server error"));
    });
  };

  const save = (values) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1500, values);
    });
  };

  const handleSubmit = (values, { resetForm }) => {
    setIsLoading(true);
    const overTime = Math.floor(Math.random() * (1600 - 1400) + 1400);
    const data = {
      ...values,
      nik: Number(values.nik.replace(/ /g, "")),
      nokk: Number(values.nokk.replace(/ /g, "")),
      penghasilanSebelumPandemi: Number(
        values.penghasilanSebelumPandemi.replace(/\./g, "")
      ),
      penghasilanSetelahPandemi: Number(
        values.penghasilanSetelahPandemi.replace(/\./g, "")
      ),
      alasanMembutuhkan:
        values.alasanMembutuhkan === "Lainnya"
          ? values.alasanLainnya
          : values.alasanMembutuhkan,
      tanggungJawabRw: values.tanggungJawabRw[0],
    };
    delete data.alasanLainnya;
    Promise.race([timeout(overTime), save(data)])
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setIsSucceed(true);
        setTimeout(() => setIsSucceed(false), 4000);
        resetForm({});
      })
      .catch((error) => {
        console.log(error.message);
        setMessageFailed(
          `${error.message}, Pengiriman data mangalami masalah cobalah mengirimkan kembali untuk beberapa saat kemudian.`
        );
        setIsLoading(false);
        setIsFailed(true);
      });
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Formulir Penerima Bansos</Text>
          <View style={styles.titleBorderContainer}>
            <View style={styles.titleBorderGreen}></View>
            <View style={styles.titleBorderYellow}></View>
            <View style={styles.titleBorderBlue}></View>
          </View>

          <Formik
            initialValues={initials}
            validationSchema={validation}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, ...rest }) => {
              return (
                <View>
                  <InputText
                    name="nama"
                    label="Nama"
                    placeholder="Masukkan nama penerima"
                    rest={rest}
                  />
                  <InputText
                    name="nik"
                    label="NIK"
                    keyboardType="numeric"
                    placeholder="Masukkan NIK penerima"
                    formating={nikAndKk}
                    rest={rest}
                  />
                  <InputText
                    name="nokk"
                    label="Nomor Kartu Keluarga"
                    keyboardType="numeric"
                    placeholder="Masukkan nomor kartu keluarga"
                    formating={nikAndKk}
                    rest={rest}
                  />
                  <InputImage
                    name="fotoKtp"
                    label="Foto KTP"
                    description="Ukuran maksimal file adalah 2 Mb. File yang didukung adalah .jpg, .jpeg, .png dan .bmp"
                    maxSize={2}
                    availableExtensions={["jpg", "jpeg", "png", "bmp"]}
                    rest={rest}
                  />
                  <InputImage
                    name="fotoKk"
                    label="Foto Kartu Keluarga"
                    description="Ukuran maksimal file adalah 2 Mb. File yang didukung adalah .jpg, .jpeg, .png dan .bmp"
                    maxSize={2}
                    availableExtensions={["jpg", "jpeg", "png", "bmp"]}
                    rest={rest}
                  />
                  <InputText
                    name="umur"
                    label="Umur"
                    description="Penerima wajib diatas 25 tahun"
                    keyboardType="numeric"
                    suffix={<Text style={{ fontSize: 13 }}>Tahun</Text>}
                    placeholder="Masukkan umur penerima"
                    formating={numberOnly}
                    rest={rest}
                  />
                  <InputRadio
                    name="jk"
                    label="Jenis Kelamin"
                    placeholder="Masukkan umur penerima"
                    options={[
                      { value: "Laki-laki", text: "Laki-laki" },
                      { value: "Perempuan", text: "Perempuan" },
                    ]}
                    inlineStyle={true}
                    rest={rest}
                  />
                  <InputText
                    name="alamat"
                    label="Alamat"
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Masukkan alamat penerima"
                    rest={rest}
                  />
                  <View style={styles.containerFlexRow}>
                    <View style={styles.widthHalf}>
                      <InputText
                        name="rt"
                        label="RT"
                        keyboardType="numeric"
                        placeholder="Masukkan rt"
                        formating={numberOnly}
                        rest={rest}
                      />
                    </View>
                    <View style={styles.widthHalf}>
                      <InputText
                        name="rw"
                        label="RW"
                        keyboardType="numeric"
                        placeholder="Masukkan rw"
                        formating={numberOnly}
                        rest={rest}
                      />
                    </View>
                  </View>
                  <InputText
                    name="penghasilanSebelumPandemi"
                    label="Penghasilan Sebelum Pandemi"
                    keyboardType="numeric"
                    prefix="Rp."
                    placeholder="Masukkan penghasilan sebelum pandemi"
                    rest={rest}
                    formating={rupiah}
                  />
                  <InputText
                    name="penghasilanSetelahPandemi"
                    label="Penghasilan Setelah Pandemi"
                    keyboardType="numeric"
                    prefix="Rp."
                    placeholder="Masukkan penghasilan setelah pandemi"
                    rest={rest}
                    formating={rupiah}
                  />
                  <InputRadio
                    name="alasanMembutuhkan"
                    label="Alasan Membutuhkan Bantuan"
                    description="Pilih salah satu"
                    placeholder="Masukkan alasan"
                    options={[
                      "Kehilangan pekerjaan",
                      "Kepala keluarga terdampak atau korban Covid",
                      "Tergolong fakir/miskin semenjak sebelum Covid",
                      "Lainnya",
                    ]}
                    rest={rest}
                  />
                  {rest.values.alasanMembutuhkan === "Lainnya" && (
                    <InputText
                      onChange={(event) =>
                        scrollingError({
                          errors: errors,
                          y: event.nativeEvent.layout.y,
                        })
                      }
                      name="alasanLainnya"
                      label="Alasan lainnya :"
                      multiline={true}
                      numberOfLines={3}
                      placeholder="Masukkan alasan lainnya disini"
                      rest={rest}
                    />
                  )}
                  <InputCheckbox
                    name="tanggungJawabRw"
                    label="Pernyataan"
                    options={[
                      {
                        value: true,
                        text: "Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut.",
                      },
                    ]}
                    rest={rest}
                  />
                  <Button
                    onPress={handleSubmit}
                    title="Kirim"
                    variant="primary"
                  />
                </View>
              );
            }}
          </Formik>
        </ScrollView>
      </TouchableWithoutFeedback>

      {isLoading && (
        <Overlay>
          <Image
            source={require("../assets/rocket-icon.gif")}
            style={styles.loadingImage}
          />
          <Text style={styles.overlayText}>Mengirimkan Data</Text>
        </Overlay>
      )}
      {isSucceed && (
        <Overlay>
          <AntDesign
            name="checkcircle"
            size={50}
            color="#069550"
            style={styles.overlayIcon}
          />
          <Text style={styles.overlayText}>Berhasil Dikirim</Text>
        </Overlay>
      )}
      {isFailed && (
        <Overlay>
          <AntDesign
            name="exclamationcircle"
            size={50}
            color="#D32F2F"
            style={styles.overlayIcon}
          />
          <Text style={styles.overlayText}>Gagal Mengirim Data</Text>
          <Text style={styles.failedMessage}>{messageFailed}</Text>
          <Button
            variant="secondary"
            title="Ya, Dimengerti"
            onPress={() => setIsFailed(false)}
          />
        </Overlay>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
  containerFlexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  widthHalf: {
    width: "48%",
  },
  title: {
    color: "#212121",
    fontWeight: "bold",
    fontSize: 25,
    width: "80%",
    marginVertical: 20,
  },
  titleBorderContainer: {
    flex: 1,
    flexDirection: "row",
  },
  titleBorderGreen: {
    flex: 1,
    height: 5,
    backgroundColor: "#009457",
    marginBottom: 30,
  },
  titleBorderYellow: {
    flex: 1,
    height: 5,
    backgroundColor: "#FFC630",
  },
  titleBorderBlue: {
    flex: 1,
    height: 5,
    backgroundColor: "#1BACE3",
  },
  loadingImage: {
    width: 170,
    height: 170,
  },
  overlayText: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  failedMessage: {
    width: "80%",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
  overlayIcon: {
    marginBottom: 20,
  },
});

export default Formulir;
