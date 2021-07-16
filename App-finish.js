import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

const requestPermissions = async () => {
  const { status } = await Location.requestBackgroundPermissionsAsync();
  if (status === 'granted') {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 15000,
      distanceInterval: 1,
      deferredUpdatesInterval: 1,
      deferredUpdatesDistance: 1,
      showsBackgroundLocationIndicator: false,
      foregroundService: {
        notificationTitle: 'Inicialized background',
        notificationBody: 'description',
        notificationColor: '#RRGGBB'
      },
      pausesUpdatesAutomatically: false
    });
  }
};

const PermissionsButton = () => {
  // TaskManager.unregisterAllTasksAsync()
  TaskManager.getRegisteredTasksAsync()
    .then(data => {
      console.log(data)
    })

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={requestPermissions}>
      <Text>Enable background location</Text>
    </TouchableOpacity>
    </View>
  )
};

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data: { locations }, error }) => {
  if (error) {
    console.log('Error: ', error)
    return;
  }
  Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME)
    .then(data => {
      console.log(data)
    })
    console.log('Received new locations', locations);
});

export default PermissionsButton;

