export type CardData = {
	file: File | null;
	label: string;
	card: string;
};

export type AudioControl = {
	el: HTMLAudioElement | null;
	time: number;
	volume: number;
	duration: number;
	paused: boolean;
};

export type SearchResults = {
	channel_name: string;
	duration: string;
	title: string;
	url: string;
	views: number;
};
