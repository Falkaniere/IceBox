import notifee from '@notifee/react-native';

export async function cancelExpiryNotifications(itemId: string) {
  await notifee.cancelNotification(`${itemId}-7days`);
  await notifee.cancelNotification(`${itemId}-2days`);
  await notifee.cancelNotification(`${itemId}-day`);
}
