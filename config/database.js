import mongoose from "mongoose";

let connect = false;

const connectDB = async () => {
	mongoose.set('strictQuery', true)

	// If the databes is already connected, don't connect again
	if (connect) {
		return console.log('MongoDB is connected')
	}

	// Connect to MongoDB
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		connect = true;
	} catch (error) {
		console.log(error)
	}
}

export default connectDB;