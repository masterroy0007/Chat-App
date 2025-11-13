import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { getUsers } from '../services/userService';
import { updateUserStatus } from '../services/userService';
import { initSocket } from '../services/socketService';

const HomeScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
    updateStatus(true);
    
    // Initialize socket connection
    initSocket();
    
    // Update status when leaving screen
    return () => {
      updateStatus(false);
    };
  }, []);

  const loadUsers = async () => {
    const result = await getUsers();
    if (result.success) {
      setUsers(result.data);
    } else {
      Alert.alert('Error', result.error);
    }
    setLoading(false);
  };

  const updateStatus = async (isOnline) => {
    await updateUserStatus(isOnline);
  };

  const renderUser = ({ item }) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() => navigation.navigate('Chat', { user: item })}
    >
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <View style={[styles.statusIndicator, item.isOnline && styles.online]} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={renderUser}
        refreshing={loading}
        onRefresh={loadUsers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ccc',
  },
  online: {
    backgroundColor: '#4CD964',
  },
});

export default HomeScreen;