import { Schema, model, Document } from 'mongoose';

interface News extends Document {
    title: string;
    content: string;
    city:string;
    date: Date;
}

const newsSchema = new Schema<News>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    city: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

newsSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

newsSchema.set('toJSON', {
    virtuals: true
});

const NewsModel = model<News>('News', newsSchema);

export { News, NewsModel };