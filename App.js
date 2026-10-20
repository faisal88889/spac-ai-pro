import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

// Screens
import HomeScreen from './screens/HomeScreen';
import TradingViewScreen from './screens/TradingViewScreen';
import PortfolioScreen from './screens/PortfolioScreen';
import AlertsScreen from './screens/AlertsScreen';
import PremiumScreen from './screens/PremiumScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// إعداد الإشعارات
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [portfolio, setPortfolio] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // تحميل البيانات المحفوظة
  useEffect(() => {
    loadData();
    registerForPushNotifications();
  }, []);

  const loadData = async () => {
    try {
      const savedPortfolio = await AsyncStorage.getItem('portfolio');
      const savedAlerts = await AsyncStorage.getItem('alerts');

      if (savedPortfolio) setPortfolio(JSON.parse(savedPortfolio));
      if (savedAlerts) setAlerts(JSON.parse(savedAlerts));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const registerForPushNotifications = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      await Notifications.requestPermissionsAsync();
    }
  };

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'TradingView') iconName = focused ? 'analytics' : 'analytics-outline';
            else if (route.name === 'Portfolio') iconName = focused ? 'briefcase' : 'briefcase-outline';
            else if (route.name === 'Alerts') iconName = focused ? 'notifications' : 'notifications-outline';
            else if (route.name === 'Premium') iconName = focused ? 'star' : 'star-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#10b981',
          tabBarInactiveTintColor: '#6b7280',
          tabBarStyle: {
            backgroundColor: '#111827',
            borderTopColor: '#1f2937',
            paddingBottom: 5,
            paddingTop: 5,
          },
          headerStyle: {
            backgroundColor: '#0a0e1a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'الرئيسية' }} />
        <Tab.Screen name="TradingView" component={TradingViewScreen} options={{ title: 'الرسوم' }} />
        <Tab.Screen name="Portfolio" options={{ title: 'المحفظة' }}>
          {(props) => <PortfolioScreen {...props} portfolio={portfolio} setPortfolio={setPortfolio} saveData={saveData} />}
        </Tab.Screen>
        <Tab.Screen name="Alerts" options={{ title: 'التنبيهات' }}>
          {(props) => <AlertsScreen {...props} alerts={alerts} setAlerts={setAlerts} saveData={saveData} />}
        </Tab.Screen>
        <Tab.Screen name="Premium" component={PremiumScreen} options={{ title: 'الاشتراك' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}