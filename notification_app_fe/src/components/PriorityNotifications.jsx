import { useEffect, useState } from "react";
import { fetchNotifications } from "../services/notificationService";

const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function PriorityNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const data = await fetchNotifications();

    const sortedNotifications = [...data]
      .sort((a, b) => {
        if (priorityMap[b.Type] !== priorityMap[a.Type]) {
          return priorityMap[b.Type] - priorityMap[a.Type];
        }

        return (
          new Date(b.Timestamp) -
          new Date(a.Timestamp)
        );
      })
      .slice(0, 10);

    setNotifications(sortedNotifications);
  };

  return (
    <div>
      <h2>Top 10 Priority Notifications</h2>

      {notifications.map((notification) => (
        <div
          key={notification.ID}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h4>{notification.Type}</h4>

          <p>{notification.Message}</p>

          <small>
            {notification.Timestamp}
          </small>
        </div>
      ))}
    </div>
  );
}

export default PriorityNotifications;
