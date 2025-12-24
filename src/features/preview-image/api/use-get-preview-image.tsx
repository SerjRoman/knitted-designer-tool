import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ApiClient } from "@/shared/api";
import type { ApiImageBody } from "@/shared/lib";

interface UseGetPreviewImageParams {
	body: ApiImageBody;
}

interface UseGetPreviewImageResponse {
	data: string;
	isLoading: boolean;
	error: null | string;
	refetch: (params: UseGetPreviewImageParams) => void;
}

export function useGetPreviewImage({
	body,
}: UseGetPreviewImageParams): UseGetPreviewImageResponse {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<string>("");

	async function getPreviewImage({ body }: UseGetPreviewImageParams) {
		try {
			setIsLoading(true);
			const response = await ApiClient.Post<{ url: string }>("", body);
			if (response.status === 200) {
				setData(response.data.url);
			} else {
				setError("Unhandled error.");
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				switch (error.status) {
					case 404:
						setError("Not found");
						break;
					case 500:
						setError("Internal Server Error.");
						break;
					default:
						setError("Unhandled error.");
				}
			}
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		if (!body) return;
		getPreviewImage({ body });
	}, [body]);

	return {
		isLoading,
		error,
		data,
		refetch: getPreviewImage,
	};
}
