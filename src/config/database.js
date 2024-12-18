import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    let mongoURI;
    switch (process.env.NODE_ENV) {
      case 'production':
        mongoURI = process.env.MONGO_URI_PROD;
        break;
      case 'development':
        mongoURI = process.env.MONGO_URI_DEV;
        break;
      case 'test':
        mongoURI = process.env.MONGO_URI_TEST;
        break;
      default:
        throw new Error('NODE_ENV no está configurado correctamente');
    }
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to the ${process.env.NODE_ENV} database`);
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  }
};

export default connectDB;