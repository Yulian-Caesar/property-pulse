'use client';

import { useEffect, useState } from "react";
import { PropertyCardType } from "../PropertyCard/PropertyCard.type";
import { fromAddress, setDefaults } from "react-geocode";

const PropertyMap = ({ property }: { property: PropertyCardType }) => {
	const [lat, setLat] = useState<number | null>(null)
	const [lng, setLng] = useState<number | null>(null)
	const [viewport, setViewport] = useState({
		latitude: 0,
		longitude: 0,
		zoom: 12,
		width: '100%',
		height: '500px',
	})
	const [loading, setLoading] = useState(true);
	const [geocodeError, setGeocodeError] = useState(false);

	const geocodeConfig = {
		key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY as string, // Cast it as string since process.env variables are strings
		language: 'en',
		region: 'us',
	};

	// @ts-ignore: Ignore the next line for TypeScript checks
	setDefaults(geocodeConfig);

	useEffect(() => {
		const fetchCoords = async () => {
			try {
				const res = await fromAddress(`${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`)

				// Check geocode results
				if (res.results.length === 0) {
					setGeocodeError(true)
					return;
				}

				const { lat, lng } = res.results[0].geometry.location;
				setLat(lat)
				setLng(lng)
				setViewport({
					...viewport,
					latitude: lat,
					longitude: lng
				})
			} catch (error) {
				console.log(error)
				setGeocodeError(true)
			} finally {
				setLoading(false)
			}
		}
		fetchCoords()
	}, [property])

	if (loading) return <h3>Loading...</h3>

	if (geocodeError) return <div className="text-xl">No location data found</div>

	return (
		<div>PropertyMap</div>
	)
}

export default PropertyMap