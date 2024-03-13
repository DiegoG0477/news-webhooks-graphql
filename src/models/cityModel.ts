import { Schema, model, Document } from 'mongoose';

interface City extends Document {
  name: string;
  country: string;
}

const citySchema = new Schema<City>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  country: {
    type: String,
    required: true
  }
});

citySchema.virtual('id').get(function() {
  return this._id.toHexString();
});

citySchema.set('toJSON', {
  virtuals: true
});

const CityModel = model<City>('City', citySchema);

export { City, CityModel };