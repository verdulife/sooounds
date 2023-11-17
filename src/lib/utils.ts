import { get, set } from 'idb-keyval';

const filePickerOptions: OpenFilePickerOptions = {
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

export async function getAudioURL(fileRef: FileSystemFileHandle) {
	const file = await fileRef.getFile();
	return URL.createObjectURL(file);
}

export async function promptFile({ label, cardId }: { label: string; cardId: string }) {
	const [fileRef] = await showOpenFilePicker(filePickerOptions);

	const cardData = { fileRef, label, cardId };
	await set(label, cardData);

	return cardData;
}

/* export async function getFile(fileName: string | null = null) {
	if (fileName) {
		const fileHandle = await get(fileName);
		return fileHandle;
	}

	const [fileHandle] = await showOpenFilePicker(fileOptions);
	const fileObject = { fileHandle, order: 1 };
	await set(fileHandle.name, fileObject);

	return fileObject;
} */
