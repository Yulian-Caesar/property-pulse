'use server'

import { PropertyCardType } from "@/components/PropertyCard/PropertyCard.type";

async function addProperty(formData: FormData): Promise<PropertyCardType> {
	// Access all values from amenities and images
	const amenities = formData.getAll('amenities');
	const images = formData
		.getAll('images')
		.filter(image => (image as File).name !== '')
		.map(image => (image as File).name);

	const propertyData = {
		type: formData.get('type'),
		name: formData.get('name'),
		description: formData.get('description'),
		location: {
			street: formData.get('location.street'),
			city: formData.get('location.city'),
			state: formData.get('location.state'),
			zipcode: formData.get('location.zipcode'),
		},
		beds: formData.get('beds'),
		baths: formData.get('baths'),
		square_feet: formData.get('square_feet'),
		amenities,
		rates: {
			weekly: formData.get('rates.weekly'),
			monthly: formData.get('rates.monthly'),
			nightly: formData.get('rates.nightly'),
		},
		seller_info: {
			name: formData.get('seller_info.name'),
			email: formData.get('seller_info.email'),
			phone: formData.get('seller_info.phone'),
		},
		images,
	}
}

export default addProperty;