import { IOrderDocument, IOrderNotification } from '@hauxun/jobber-shared';
import { OrderNotificationModel } from '@order/models/notification.schema';
import { socketIOOrderObject } from '@order/server';
import { getOrderByOrderId } from '@order/services/order.service';

const createNotification = async (data: IOrderNotification): Promise<IOrderNotification> => {
  const notification: IOrderNotification = await OrderNotificationModel.create(data);
  return notification;
};

const getNotificationsById = async (userToId: string): Promise<IOrderNotification[]> => {
  const notifications: IOrderNotification[] = await OrderNotificationModel.aggregate([{ $match: { userTo: userToId }}]);
  return notifications;
};

const markNotificationAsRead = async (notificationId: string): Promise<IOrderNotification> => {
  const notification: IOrderNotification = await OrderNotificationModel.findOneAndUpdate(
    { _id: notificationId },
    {
      $set: {
        isRead: true
      }
    },
    { new: true }
  ) as IOrderNotification;
  const order: IOrderDocument = await getOrderByOrderId(notification.orderId);
  socketIOOrderObject.emit('order notification', order, notification);
  return notification;
};

const sendNotification = async (data: IOrderDocument, userToId: string, message: string): Promise<void> => {
  const notification: IOrderNotification = {
    userTo: userToId,
    senderUsername: data.sellerUsername,
    senderPicture: data.sellerImage,
    receiverUsername: data.buyerUsername,
    receiverPicture: data.buyerImage,
    message,
    orderId: data.orderId
  } as IOrderNotification;
  const orderNotification: IOrderNotification = await createNotification(notification);
  socketIOOrderObject.emit('order notification', data, orderNotification);
};

export {
  createNotification,
  getNotificationsById,
  markNotificationAsRead,
  sendNotification
};

