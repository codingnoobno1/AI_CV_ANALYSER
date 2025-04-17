import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Button, Alert, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as ImagePicker from 'expo-image-picker';

export default function UploadScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState<any>(null);

  // Camera reference using useRef
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    // Ask for camera permission
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
      
      if (galleryStatus.status !== 'granted') {
        Alert.alert('Permission needed', 'We need access to your media library to pick images.');
      }
    })();
  }, []);

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <ThemedText>Requesting permissions...</ThemedText>;
  }

  if (hasCameraPermission === false) {
    return <ThemedText>No access to camera</ThemedText>;
  }

  if (hasGalleryPermission === false) {
    return <ThemedText>No access to media library</ThemedText>;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();
      setPhoto(photoData.uri); // Set the photo URI for preview
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri); // Set picked image URI for preview
    }
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Upload CV</ThemedText>
      </ThemedView>

      <ThemedText type="default">Take a photo of your CV or choose one from your gallery.</ThemedText>

      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef} // Using ref with useRef hook
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Take Picture" onPress={takePicture} />
        <Button title="Pick from Gallery" onPress={pickImage} />
      </View>

      {photo && (
        <View style={styles.previewContainer}>
          <ThemedText type="defaultSemiBold">Preview:</ThemedText>
          <Image source={{ uri: photo }} style={styles.previewImage} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  titleContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    gap: 8,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  camera: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  previewContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  previewImage: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginTop: 10,
  },
});
