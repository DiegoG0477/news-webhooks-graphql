import { Schema, model } from "mongoose";

interface Webhook {
    url: string;
    eventId: string;
    dateSended: Date;
}

const webhookSchema = new Schema<Webhook>({
    url: {
        type: String,
        required: true,
    },
    eventId: {
        type: String,
        required: true,
    },
    dateSended: {
        type: Date,
        required: true,
    },
});

webhookSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

webhookSchema.set("toJSON", {
    virtuals: true,
});

const WebhookModel = model<Webhook>("Webhook", webhookSchema);

export { Webhook, WebhookModel };
