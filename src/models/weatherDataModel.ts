import mongoose, { Schema, Document } from 'mongoose';

interface WeatherData extends Document {
    type: string;
    //Alerta: Indica una advertencia o alerta meteorológica.
    //Observación: Indica una observación meteorológica actual.
    //Pronóstico: Indica un pronóstico del tiempo.
    intensity: string;
    advice:string;
    event: string;
    city:string;
    date: Date;
}

const weatherDataSchema = new Schema({
    type: { type: String, required: true },
    intensity: { type: String, required: true },
    advice: { type: String, required: true },
    event: { type: String, required: true },
    city: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

weatherDataSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

weatherDataSchema.set('toJSON', {
    virtuals: true
});

const WeatherDataModel = mongoose.model<WeatherData>('WeatherData', weatherDataSchema);

export { WeatherData, WeatherDataModel };