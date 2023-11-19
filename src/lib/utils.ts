export function getFileURL(file: File) {
	return URL.createObjectURL(file);
}

export async function inputFileAsync(): Promise<File> {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = 'audio/*';
	input.click();

	return new Promise((resolve) => {
		input.addEventListener('change', () => {
			if (input.files) return resolve(input.files[0]);
		});
	});
}
