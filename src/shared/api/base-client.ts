export class ApiClient {
	private static setupBaseHeaders(h?: HeadersInit): Headers {
		const headers = new Headers(h);
		headers.set("Content-Type", "application/json");
		return headers;
	}
	static async Get<T>(
		url: string,
		headers?: HeadersInit,
	): Promise<{ response: Response; data: T }> {
		const finalHeaders = ApiClient.setupBaseHeaders(headers);
		const res = await fetch(url, { headers: finalHeaders });
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const data = (await res.json()) as T;
		return { response: res, data };
	}
	static async Post<T>(
		url: string,
		body: unknown,
		headers?: HeadersInit,
	): Promise<{ response: Response; data: T }> {
		const finalHeaders = ApiClient.setupBaseHeaders(headers);
		const res = await fetch(url, {
			method: "POST",
			body: JSON.stringify(body),
			headers: finalHeaders,
		});
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const data = (await res.json()) as T;
		return { response: res, data };
	}
}
