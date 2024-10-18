// app/index.tsx
import { Button, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import SolabContext from "../src/store/solabContext";
import { getUserByID, getUserProducts, getDataFromDataBase } from "../src/res/api";
import { useRouter } from "expo-router";

const Index = () => {
  const nav = useRouter();
  const { setUser, saveUserProducts, setData } = useContext(SolabContext);
  const currentUserId = useContext(SolabContext).user?._id;
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataFromDataBase();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const updateUserAndFetchProducts = async () => {
      if (!currentUserId) {
        setLoading(false); // Set loading to false if no user ID
        return;
      }

      try {
        const newUser = await getUserByID(currentUserId);
        if (!newUser || !newUser.role) {
          console.error('User data is invalid:', newUser);
          setLoading(false); // Set loading to false for invalid user
          return;
        }

        setUser(newUser);

        const response = await getUserProducts(currentUserId);
        saveUserProducts(response);

        // Navigate based on user role
        switch (newUser.role) {
          case 'client':
            nav.replace('Home'); // Navigate to Home if client
            break;
          case 'worker':
            nav.replace('WorkersHome'); // Navigate to WorkersHome if worker
            break;
          case 'staff':
            nav.replace('StaffHome'); // Navigate to StaffHome if staff
            break;
          default:
            console.error('Unknown user role:', newUser.role);
            break;
        }
      } catch (error) {
        console.error('Error fetching user or products:', error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    // Fetch data and update user if user ID is present
    if (currentUserId) {
      fetchData();
      updateUserAndFetchProducts();
    } else {
      setLoading(false); // No user ID, just stop loading
    }
  }, [currentUserId]);

  // Show loading indicator while processing
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  // If the user is not authenticated, show the index view
  return (
    <View style={styles.container}>

      <Button title="Go to Splash" onPress={() => nav.replace('Splash')} />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
