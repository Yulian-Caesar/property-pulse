'use client';

import { useEffect, useState } from "react";
import { PropertyCardType } from "../PropertyCard/PropertyCard.type";
import { fromAddress, setDefaults } from "react-geocode";
import Map, { Marker } from "react-map-gl/mapbox";
import Image from "next/image";
import pin from "@/assets/images/pin.svg"
import Spinner from "../Spinner/Spinner";
import 'mapbox-gl/dist/mapbox-gl.css';

const PropertyMap = ({ property }: { property: PropertyCardType }) => {
	const [lat, setLat] = useState(0)
	const [lng, setLng] = useState(0)
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

	if (loading) return <Spinner />

	if (geocodeError) return <div className="text-xl">No location data found</div>

	return (
		!loading && (
			<Map
				mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
				initialViewState={{
					longitude: lng,
					latitude: lat,
					zoom: 15
				}}
				style={{ width: '100%', height: 500 }}
				mapStyle="mapbox://styles/mapbox/streets-v9"
			>
				<Marker latitude={lat} longitude={lng} anchor="bottom">
					<Image src={pin} alt="location" width={40} height={40} />
				</Marker>
			</Map>
		)
	)
}

export default PropertyMap