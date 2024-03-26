import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScannedData(data);
  };

  const handleScanAgain = () => {
    setScannedData('');
  };

  const getMeaning = (code) => {
    switch (code) {
      case '12345':
        return 'Good for health!';
      case '67890':
        return 'Not recommended.';
      case '54321':
        return 'Good for health!';
      case '90978':
        return 'Good for health!';
      // Add more cases for additional codes
      default:
        return 'Meaning not found.';
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#2c3e50',
      paddingTop: 40,
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#ecf0f1',
    },
    cameraContainer: {
      flex: 1,
      width: '80%', // Adjusted width
      aspectRatio: 4/3, // Set the aspect ratio to your preference
      borderRadius: 20,
      overflow: 'hidden',
      marginBottom: 20,
    },
    scanResultContainer: {
      backgroundColor: '#3498db',
      borderRadius: 20,
      padding: 20,
      width: '80%',
      alignItems: 'center',
      elevation: 5,
    },
    scanResultText: {
      color: '#ecf0f1',
      fontSize: 20,
      marginBottom: 10,
    },
    codeInfoText: {
      color: '#ecf0f1',
      fontSize: 18,
      textAlign: 'center',
      marginTop: 10,
    },
    scanAgainButton: {
      marginTop: 20,
      backgroundColor: '#2ecc71',
      borderRadius: 10,
    },
    scanAgainButtonText: {
      color: '#ecf0f1',
      fontSize: 18,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SustainableShop</Text>
      <View style={styles.cameraContainer}>
        <Camera onBarCodeScanned={scannedData ? undefined : handleBarCodeScanned} style={{ flex: 1 }} />
      </View>
      {scannedData ? (
        <View style={styles.scanResultContainer}>
          <Text style={styles.scanResultText}>{scannedData}</Text>
          <Text style={styles.codeInfoText}>{getMeaning(scannedData)}</Text>
          <Button
            title="Scan Again"
            onPress={handleScanAgain}
            style={styles.scanAgainButton}
            color="#2ecc71"
          />
        </View>
      ) : null}
    </View>
  );
}
