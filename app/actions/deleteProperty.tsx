'use server'
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import cloudinary from "@/config/cloudinary"

async function deleteProperty(propertyId: string) {
	const sessionUser = await getSessionUser()

	if (!sessionUser || !sessionUser.userId) {
		throw new Error('User ID is required')
	}

	const { userId } = sessionUser;

	const property = await Property.findById(propertyId)

	if (!property) throw new Error('Property Not Found')

	if (property.owner.toString() !== userId) {
		throw new Error('Unauthorized')
	}

	// Extract public ID from image URLs
	const publicIds = property.images.map((imageUrl: string) => {
		const parts = imageUrl.split('/')
		const lastPart = parts.at(-1);

		// Check if lastPart is defined and not empty before calling split
		if (lastPart) {
			return lastPart.split('.').at(0);
		}

		throw new Error('Invalid image URL format');  // Handle case where URL format is incorrect
	})

	// Delete images from cloudinary
	if (publicIds.length > 0) {
		for (let publicId of publicIds) {
			await cloudinary.uploader.destroy(`propertypulse/${publicId}`)
		}
	}

	await property.deleteOne()
	revalidatePath('/', 'layout')
}

export default deleteProperty;
