import { search, stream } from 'play-dl';

export async function POST({ request }) {
	if (request.headers.get('Content-Type') !== 'application/json')
		return new Response(null, { status: 400 });

	const json = await request.json();
	const { term } = json;
	const searched = await search(term, { source: { youtube: 'video' } });

	const audios = await Promise.allSettled(
		searched.map(async (audio) => {
			const { url: videoUrl, title, durationRaw, views, channel } = audio;
			const source = (await stream(videoUrl)) as any;
			const { url } = source;

			return {
				url,
				title,
				duration: durationRaw,
				views,
				channel_name: channel?.name
			};
		})
	);

	return new Response(JSON.stringify({ data: audios }), {
		status: 200
	});
}
