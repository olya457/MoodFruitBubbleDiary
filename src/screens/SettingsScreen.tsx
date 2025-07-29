import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const MOODS_STORAGE_KEY = '@MoodsByDate'; 

const SettingsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const clearAllData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const moodKeys = keys.filter(key => key.startsWith('mood_') || key === MOODS_STORAGE_KEY);

      await AsyncStorage.multiRemove(moodKeys);

      setModalVisible(false);
      Alert.alert('Success', 'All user data (including mood notes) cleared.');
      console.log('All user data (including mood notes) cleared.');
    } catch (error) {
      console.error('Failed to clear user data:', error);
      Alert.alert('Error', 'Failed to clear user data.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background_loading.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.innerContent}>
        <Image
          source={require('../assets/settings_imadg.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Notifications:</Text>
            <TouchableOpacity
              onPress={() => setNotificationsEnabled(!notificationsEnabled)}
            >
              <Image
                source={
                  notificationsEnabled
                    ? require('../assets/notification_on.png')
                    : require('../assets/notification_off.png')
                }
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Clear progress:</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                source={require('../assets/trash_icon.png')}
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>
              Are you sure you want to clear progress?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.yes]}
                onPress={clearAllData}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.no]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
  },
  innerContent: {
    marginTop: 80,
    alignItems: 'center',
    width: '100%',
  },
  headerImage: {
    width: 170,
    height: 70,
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'rgba(247, 202, 202, 0.4)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 40,
    width: width * 0.85,
     marginTop: 60,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  icon: {
    width: 40,
    height: 40,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(247, 202, 202, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: width * 0.8,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  yes: {
    backgroundColor: '#E4297F',
  },
  no: {
    backgroundColor: '#00D856',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});