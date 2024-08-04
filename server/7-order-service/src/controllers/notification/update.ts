import { IOrderNotification } from '@hauxun/jobber-shared';
import { markNotificationAsRead } from '@order/services/notification.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const markSingleNotificationAsRead = async (req: Request, res: Response): Promise<void> => {
  const { notificationId } = req.body;
  const notification: IOrderNotification = await markNotificationAsRead(notificationId);
  res.status(StatusCodes.OK).json({ message: 'Notification updated successfully.', notification });
};

export { markSingleNotificationAsRead };
