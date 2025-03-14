export type MessageType = {
	body: string;
	createdAt: string;
	email: string;
	name: string;
	phone: string;
	property: {
		_id: string;
		name: string;
	};
	read: boolean;
	recipient: string;
	sender: {
		_id: string;
		username: string;
	};
	updatedAt: string;
	//__v: 0;
	_id: string;
};
