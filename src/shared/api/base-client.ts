import { AxiosHeaders, type AxiosResponse } from "axios";
import axios from "axios";

export class ApiClient {
	private static setupBaseHeaders(h?: AxiosHeaders) {
		const headers = new AxiosHeaders(h);
		headers.setContentType("application/json");
		return headers;
	}
	static Get<T>(
		url: string,
		headers?: AxiosHeaders
	): Promise<AxiosResponse<T>> {
		const finalHeaders = ApiClient.setupBaseHeaders(headers);
		return axios.get(url, {
			headers: finalHeaders,
		});
	}
	static Post<T>(
		url: string,
		body: unknown,
		headers?: AxiosHeaders
	): Promise<AxiosResponse<T>> {
		const finalHeaders = ApiClient.setupBaseHeaders(headers);
		return axios.post(url, body, { headers: finalHeaders });
	}
}
