import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveMoodForDate = async (date: string, moodKey: string) => {
  try {
    await AsyncStorage.setItem(`mood_${date}`, moodKey);
  } catch (e) {
    console.error('Error saving mood:', e);
  }
};

export const getMoodForDate = async (date: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(`mood_${date}`);
  } catch (e) {
    console.error('Error reading mood:', e);
    return null;
  }
};
