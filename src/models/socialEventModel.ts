import mongoose, { Schema, Document } from 'mongoose';

interface SocialEvent extends Document {
    type: string; //Concierto, Evento Deportivo, Festival, Obra de teatro, Exposición, Otro
    name: string;
    city:string;
    date: Date;
}

const socialEventSchema = new Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    date: { type: Date, required: true }
});

socialEventSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

socialEventSchema.set('toJSON', {
    virtuals: true
});

const SocialEventModel = mongoose.model<SocialEvent>('SocialEvent', socialEventSchema);

export { SocialEvent, SocialEventModel };