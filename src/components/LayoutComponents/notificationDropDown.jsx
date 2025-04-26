import bell from "../../images/bell.svg";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useState, useEffect } from "react";
import { usePassenger } from "../../context/passengerContext";

const NotificationDropDown = ({
  showNotifications,
  setShowNotifications,
  notifications,
}) => {
  const { markNotification, refreshNotifications } = usePassenger();

  // Separate unread and read notifications
  const unreadNotifications = notifications.filter((n) => !n.isRead);
  const readNotifications = notifications.filter((n) => n.isRead);

  // Combine with unread first
  const sortedNotifications = [...unreadNotifications, ...readNotifications];

  const unreadCount = unreadNotifications.length;
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);
  const hasMoreNotifications = notifications.length > 1;

  // Reset index when notifications change or dropdown is opened
  useEffect(() => {
    setCurrentNotificationIndex(0);
  }, [notifications, showNotifications]);

  const handleMarkAsRead = (id) => {
    markNotification(id);
  };

  const markAllAsRead = () => {
    unreadNotifications.forEach((notification) => {
      markNotification(notification.id);
    });
  };

  const formatNotificationDate = (dateString) => {
    try {
      const date =
        typeof dateString === "string" ? parseISO(dateString) : dateString;
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "some time ago";
    }
  };

  const showNextNotification = () => {
    setCurrentNotificationIndex(
      (prevIndex) => (prevIndex + 1) % sortedNotifications.length
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          setShowNotifications(!showNotifications);
          refreshNotifications(); // Refresh when opening
        }}
        className="p-1 rounded-full hover:bg-gray-100 transition-colors relative"
        aria-label="Notifications"
      >
        <img className="w-5 h-5" src={bell} alt="Notifications" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                Mark all as read
              </button>
            )}
          </div>
          <div>
            {sortedNotifications.length > 0 ? (
              <div
                key={sortedNotifications[currentNotificationIndex].id}
                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                  !sortedNotifications[currentNotificationIndex].isRead
                    ? "bg-blue-50"
                    : ""
                }`}
                onClick={() =>
                  handleMarkAsRead(
                    sortedNotifications[currentNotificationIndex].id
                  )
                }
              >
                <div className="flex items-start gap-2">
                  {!sortedNotifications[currentNotificationIndex].isRead && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium text-gray-900">
                        {sortedNotifications[currentNotificationIndex].subject}
                      </h4>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatNotificationDate(
                          sortedNotifications[currentNotificationIndex]
                            .createdAt
                        )}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1 space-y-1">
                      {sortedNotifications[currentNotificationIndex].body
                        .split("\n")
                        .map((line, i) => (
                          <p
                            key={i}
                            className={line.trim() === "" ? "h-4" : ""}
                          >
                            {line.trim() === "" ? "\u00A0" : line}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-4 py-3 text-center text-sm text-gray-500">
                No notifications
              </div>
            )}
          </div>

          {hasMoreNotifications && (
            <div className="px-4 py-2 border-t border-gray-200 text-center">
              <button
                onClick={showNextNotification}
                className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                View next notification ({currentNotificationIndex + 1}/
                {sortedNotifications.length})
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropDown;
