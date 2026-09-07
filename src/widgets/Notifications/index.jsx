import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/entities/auth';
import {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
} from '@/entities/notification';
import { buildRecipePath } from '@/shared/config/routerPaths';
import { Button, Modal } from '@/shared/ui';
import NotificationIcon from '@/assets/icons/notification.svg?react';

function getNotificationText(notification) {
  if (notification.type === 'recipe_favorited') {
    return `${notification.actor?.name ?? 'Someone'} added your recipe to favorites.`;
  }

  if (notification.type === 'comment_replied') {
    return `${notification.actor?.name ?? 'Someone'} replied to your comment.`;
  }

  return 'You have a new notification.';
}

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { data, isLoading, isError } = useGetNotificationsQuery(
    { page: 1, pageSize: 20 },
    { skip: !isAuthenticated },
  );
  const [markNotificationRead] = useMarkNotificationReadMutation();
  const notifications = data?.items ?? [];
  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      void markNotificationRead(notification.id);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="relative shrink-0 bg-card"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Open notifications"
        title="Notifications"
      >
        <NotificationIcon aria-hidden="true" className="size-5" />
        {unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 min-w-4 rounded-full bg-secondary px-1 text-[10px] leading-4 text-secondary-foreground">
            {unreadCount}
          </span>
        ) : null}
      </Button>

      <Modal isOpen={isOpen} title="Notifications" onClose={() => setIsOpen(false)}>
        {isLoading ? <p className="text-sm text-muted-foreground">Loading...</p> : null}
        {isError ? (
          <p className="text-sm text-destructive">Failed to load notifications.</p>
        ) : null}
        {!isLoading && !isError && notifications.length === 0 ? (
          <p className="text-sm text-muted-foreground">No notifications yet.</p>
        ) : null}

        <div className="space-y-2">
          {notifications.map((notification) => {
            const recipePath =
              notification.entityType === 'recipe' && notification.entity?.id
                ? buildRecipePath(notification.entity.id)
                : null;
            const content = (
              <div
                className={`flex items-start justify-between gap-3 rounded-xl border p-3 text-left ${
                  notification.isRead ? 'bg-card' : 'bg-secondary/10'
                }`}
              >
                <div className="min-w-0">
                  <p className="text-sm text-foreground">{getNotificationText(notification)}</p>
                  {notification.entity?.name ? (
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {notification.entity.name}
                    </p>
                  ) : null}
                </div>
                {!notification.isRead ? (
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-secondary" />
                ) : null}
              </div>
            );

            return recipePath ? (
              <NavLink
                key={notification.id}
                to={recipePath}
                onClick={() => handleNotificationClick(notification)}
                className="block"
              >
                {content}
              </NavLink>
            ) : (
              <button
                key={notification.id}
                type="button"
                className="block w-full"
                onClick={() => handleNotificationClick(notification)}
              >
                {content}
              </button>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default Notifications;
