import { Schema, model } from "mongoose";

interface Consumer {
    url: string;
    news: boolean;
    trafficNotifications: boolean;
    weather: boolean;
    socialEvents: boolean;
}

const consumerSchema = new Schema<Consumer>({
    url: {
        type: String,
        required: true,
    },
    news: {
        type: Boolean,
    },
    trafficNotifications: {
        type: Boolean,
    },
    weather: {
        type: Boolean,
    },
    socialEvents: {
        type: Boolean,
    },
});

consumerSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

consumerSchema.set("toJSON", {
    virtuals: true,
});

const ConsumerModel = model<Consumer>("Consumer", consumerSchema);

export { Consumer, ConsumerModel };
