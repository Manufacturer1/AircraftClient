// passengerContext.js
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
  getNotificationByEmail,
  markNotificationAsRead,
} from "../services/notificationService";

const PASSENGER_KEY = "passengerEmail";
const EXPIRATION_DAYS = 7;

const PassengerContext = createContext();

export const PassengerProvider = ({ children }) => {
  const [passengerEmail, setPassengerEmail] = useState("");
  const [notifications, setNotifications] = useState([]);

  // Load email and notifications
  useEffect(() => {
    const storedData = localStorage.getItem(PASSENGER_KEY);
    if (storedData) {
      try {
        const { value, expiry } = JSON.parse(storedData);
        if (!expiry || new Date().getTime() < expiry) {
          setPassengerEmail(value);
          fetchNotifications(value);
        } else {
          localStorage.removeItem(PASSENGER_KEY);
        }
      } catch (e) {
        setPassengerEmail(storedData);
        fetchNotifications(storedData);
      }
    }
  }, []);

  // Save email when changed
  useEffect(() => {
    if (passengerEmail) {
      const expiry =
        new Date().getTime() + EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
      const data = { value: passengerEmail, expiry };
      localStorage.setItem(PASSENGER_KEY, JSON.stringify(data));
      fetchNotifications(passengerEmail);
    } else {
      localStorage.removeItem(PASSENGER_KEY);
      setNotifications([]);
    }
  }, [passengerEmail]);

  const fetchNotifications = async (email) => {
    if (!email) return;
    try {
      const response = await getNotificationByEmail(email);
      setNotifications(response);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  const markNotification = async (id) => {
    try {
      await markNotificationAsRead(id);

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const value = useMemo(
    () => ({
      passengerEmail,
      setPassengerEmail,
      clearPassengerEmail: () => setPassengerEmail(""),
      notifications,
      markNotification,
      refreshNotifications: () => fetchNotifications(passengerEmail),
    }),
    [passengerEmail, notifications]
  );

  return (
    <PassengerContext.Provider value={value}>
      {children}
    </PassengerContext.Provider>
  );
};

export const usePassenger = () => {
  const context = useContext(PassengerContext);
  if (!context) {
    throw new Error("usePassenger must be used within PassengerProvider");
  }
  return context;
};
