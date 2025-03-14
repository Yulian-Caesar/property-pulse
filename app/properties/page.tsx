import Pagination from "@/components/Pagination/Pagination";
import PropertyCard from "@/components/PropertyCard/PropertyCard"
//import { PropertyCardType } from "@/components/PropertyCard/PropertyCard.type";
import connectDB from "@/config/database"
import Property from "@/models/Property"


const PropertiesPage = async ({ searchParams }) => {
	const { page = '1', pageSize = '9' } = searchParams || {};
	await connectDB();

	const skip = (+page - 1) * +pageSize;
	const total = await Property.countDocuments({})
	const properties = await Property.find({}).skip(skip).limit(+pageSize);

	const showPagination = total > +pageSize;

	return (
		<section className="px-4 py-6">
			<div className="container-xl lg:container m-auto px-4 py-6">
				{properties.length === 0 ? (
					<p>No properties found</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{
							properties.map((property) => (
								<PropertyCard key={property._id} property={property} />
							))
						}
					</div>
				)}
				{showPagination && (
					<Pagination page={+page} pageSize={+pageSize} totalItems={total} />
				)}
			</div>
		</section>
	)
}

export default PropertiesPage