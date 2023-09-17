import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanArray, setScanArray] = useState([])
  const [activeStyle, setActiveStyle] = useState(styles.container)
  const [scanning, setScanning] = useState(true)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(data)
    console.log(scanArray)
    setScanning(false)
    if (scanArray.includes(data)) setActiveStyle(styles.containerRed)
    else {
      setActiveStyle(styles.containerGreen)
      setScanArray([...scanArray, data])
    }
    setTimeout(() => {
      setActiveStyle(styles.container)
      setScanning(true)
    }, 1000)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={activeStyle}>
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanning ? handleBarCodeScanned : undefined}
          style={StyleSheet.absoluteFillObject}
        />
        {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerGreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#05e62e'
  },

  containerRed: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e60505'
  },

  scannerContainer: {
    width: 400,
    height: 400,
  },

  text: {
    color: '#fff',
  },
});
