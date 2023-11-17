export const filePickerOptions: OpenFilePickerOptions = {
	types: [
		{
			description: 'Audio',
			accept: {
				'audio/*': ['.mp3', '.wav', '.ogg', '.webm']
			}
		}
	],
	excludeAcceptAllOption: true,
	multiple: false
};

export async function getFileURL(file: File) {
	return URL.createObjectURL(file);
}
