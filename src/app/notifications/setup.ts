import notifee, { AuthorizationStatus } from '@notifee/react-native';

export async function setupNotifications() {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
    return false;
  }

  return true;
}
