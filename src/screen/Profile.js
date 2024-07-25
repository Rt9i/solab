import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SolabContext from '../store/solabContext';
import Images from '../assets/images/images';

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { params } = useRoute();
  const { user } = React.useContext(SolabContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = params?.userId || user?.id;
        if (userId) {
          const response = await fetch(`https://solab-server.onrender.com/getUserByID/${userId}`);
          const data = await response.json();
          setProfileData(data);
        }
      } catch (error) {
        console.log('Failed to fetch user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [params, user]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={Images.profileIcon()} style={styles.profileImage} />
      <Text style={styles.userName}>{profileData?.userName || 'User Name'}</Text>
      <Text style={styles.userPhone}>{profileData?.phoneNumber || 'Phone Number'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userPhone: {
    fontSize: 16,
    color: '#666',
  },
});

export default ProfileScreen;
