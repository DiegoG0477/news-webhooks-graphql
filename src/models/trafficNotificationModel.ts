import mongoose, { Schema, Document } from 'mongoose';

interface TrafficNotification extends Document {
    title: string;
    content: string;
    city:string;
    date: Date;
}

const trafficNotificationSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    city: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

trafficNotificationSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

trafficNotificationSchema.set('toJSON', {
    virtuals: true
});

const TrafficNotificationModel = mongoose.model<TrafficNotification>('TrafficNotification', trafficNotificationSchema);

export { TrafficNotification, TrafficNotificationModel };