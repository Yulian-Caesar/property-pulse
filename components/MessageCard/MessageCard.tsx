'use client'
import { useEffect, useState } from "react"
import { MessageType } from "./MessageCard.type"
import markMessageAsRead from "@/app/actions/markMessageAsRead"
import { toast } from "react-toastify"
import deleteMessage from "@/app/actions/deleteMessage"
import { useGlobalContext } from "@/context/GlobalContext"

const MessageCard = ({ message }: { message: MessageType }) => {
	const [isRead, setIsRead] = useState(message.read)
	const [isMounted, setIsMounted] = useState(false)
	const { setUnreadCount } = useGlobalContext()

	const handleReadClick = async () => {
		const read = await markMessageAsRead(message._id)
		setIsRead(read)
		setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1))
		toast.success(`Mark As ${read ? 'Read' : 'New'}`)
	}

	const handleDeleteClick = async () => {
		await deleteMessage(message._id)
		setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1));
		toast.success('Message deleted succesfully')
	}

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		return null
	}

	return (
		<div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
			{!isRead && (
				<div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">New</div>
			)}
			<h2 className="text-xl mb-4">
				<span className="font-bold">Property Inquiry:</span>{' '}
				{message.property.name}
			</h2>
			<p className="text-gray-700">{message.body}</p>
			<ul className="mt-4">
				<li>
					<strong>Name:</strong>{' '} {message.name}
				</li>
				<li>
					<strong>Reply Email:</strong>{' '}
					<a href={`mailto:${message.email}`} className="text-blue-500">
						{message.email}
					</a>
				</li>
				<li>
					<strong>Reply Phone:</strong>
					<a href={`tel:${message.phone}`} className="text-blue-500">
						{message.phone}
					</a>
				</li>
				<li>
					<strong>Received:</strong>{' '}
					{new Date(message.createdAt).toLocaleString()}
				</li>
			</ul>
			<button
				className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
				onClick={handleReadClick}
			>
				{isRead ? "Mark As New" : "Mark As Read"}
			</button>
			<button
				className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
				onClick={handleDeleteClick}
			>
				Delete
			</button>
		</div>
	)
}

export default MessageCard