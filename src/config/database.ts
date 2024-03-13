import mongoose from 'mongoose';

async function connectToDatabase() {
  try {
    const mongodbUrl = process.env.MONGODB_URL ?? '';
    await mongoose.connect(mongodbUrl);
    console.log('Conexión exitosa a la base de datos MongoDB');
  } catch (error) {
    console.error('Error al conectar a la base de datos MongoDB:', error);
  }
}

export { connectToDatabase };
