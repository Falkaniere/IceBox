import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

import i18n from '@/app/i18n';

export async function scheduleExpiryNotifications(
  itemId: string,
  itemName: string,
  expiresAtISO: string,
) {
  const expiresAt = new Date(expiresAtISO);
  const now = Date.now();

  const notificationConfigs = [
    {
      id: `${itemId}-7days`,
      daysBefore: 7,
      titleKey: 'notification_week_title',
      bodyKey: 'notification_week_body',
    },
    {
      id: `${itemId}-2days`,
      daysBefore: 2,
      titleKey: 'notification_two_days_title',
      bodyKey: 'notification_two_days_body',
    },
    {
      id: `${itemId}-day`,
      daysBefore: 0,
      titleKey: 'notification_today_title',
      bodyKey: 'notification_today_body',
    },
  ];

  for (const config of notificationConfigs) {
    const triggerDate = new Date(expiresAt);

    if (config.daysBefore > 0) {
      triggerDate.setDate(triggerDate.getDate() - config.daysBefore);
    }

    if (triggerDate.getTime() <= now) continue;

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: triggerDate.getTime(),
    };

    const title = i18n.t(`fridge:${config.titleKey}`);
    const body = i18n.t(`fridge:${config.bodyKey}`, {
      item: itemName,
    });

    await notifee.createTriggerNotification(
      {
        id: config.id,
        title,
        body,
        android: {
          channelId: 'expiry',
        },
      },
      trigger,
    );
  }
}
