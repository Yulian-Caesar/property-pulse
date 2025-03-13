'use client';
import { FaBookmark } from "react-icons/fa"
import { PropertyCardType } from "../PropertyCard/PropertyCard.type"
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import { useEffect, useState } from "react";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";


const BookmarkButon = ({ property }: { property: PropertyCardType }) => {
	const { data: session } = useSession()
	const userId = session?.user?.id
	const [isBookmarked, setIsBookmarked] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!userId) {
			setLoading(false)
			return;
		}
		checkBookmarkStatus(property._id).then(res => {
			setIsBookmarked(res.isBookmarked)
			setLoading(false)
		})
	}, [property._id, userId, checkBookmarkStatus])

	const handleClick = async () => {
		if (!userId) {
			toast.error("You need to be signed in to bookmark a listing")
			return;
		}

		bookmarkProperty(property._id).then((res) => {
			//if (res?.error) return toast.error(res?.error)
			setIsBookmarked(res.isBookmarked)
			toast.success(res.message)
		})
	}

	if (loading) return <h2>Loadign...</h2>

	return (
		<button
			className={`${isBookmarked ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
			onClick={handleClick}
		>
			<FaBookmark className="mr-2" /> {isBookmarked ? 'Remove Bookmark' : 'Bookmark Property'}
		</button>
	)
}

export default BookmarkButon