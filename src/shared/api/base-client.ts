export class ApiClient {
	private static setupBaseHeaders(h?: HeadersInit): Headers {
		const headers = new Headers(h);
		headers.set("Content-Type", "application/json");
		return headers;
	}
	static async Get<T>(
		url: string,
		headers?: HeadersInit,
	): Promise<Response & { data: Promise<T> }> {
		const finalHeaders = ApiClient.setupBaseHeaders(headers);
		return fetch(url, { headers: finalHeaders }).then((res) => {
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}
			return { ...res, data: res.json() as Promise<T> };
		});
	}
	static async Post<T>(
		url: string,
		body: unknown,
		headers?: HeadersInit,
	): Promise<Response & { data: Promise<T> }> {
		const finalHeaders = ApiClient.setupBaseHeaders(headers);
		return fetch(url, {
			method: "POST",
			body: JSON.stringify(body),
			headers: finalHeaders,
		}).then((res) => {
			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}
			return { ...res, data: res.json() as Promise<T> };
		});
	}
}
