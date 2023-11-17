export async function searchByTerm(term: string | undefined) {
	if (!term) return;

	const res = await fetch('/api', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ term })
	});

	return await res.json();
}
