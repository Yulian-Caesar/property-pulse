import { ReactNode } from "react";

export type InfoBoxType = {
	heading: string;
	bgColor?: string;
	textColor?: string;
	buttonInfo: {
		text: string;
		link: string;
		bgColor: string;
	};
	children: ReactNode;
};
