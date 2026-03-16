import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { setConfig, setProduct } from "@/shared/store";
import { App } from "./App";
import { store } from "./store";
import "./index.css";
const root = "editor-root";
const container = document.getElementById(root);
if (!container) {
	throw new Error(`Container with id '${root}' not found`);
}
const productId = container.dataset.productId || null;
const productName = container.dataset.productName || null;
const productDescription = container.dataset.productDescription || null;
const productImageId =
	container.dataset.choiceId == "0" || container.dataset.choiceId === ""
		? null
		: Number(container.dataset.choiceId);

const productTags = container.dataset.productTags
	? container.dataset.productTags.split(",")
	: null;
store.dispatch(
	setConfig({
		createUrl: container.dataset.createUrl || null,
		attachUrl: container.dataset.attachUrl || null,
		updateUrl: container.dataset.updateUrl || null,
		token: container.dataset.token || null,
	}),
);
store.dispatch(
	setProduct({
		id: productId ? Number(productId) : null,
		name: productName,
		description: productDescription,
		imageId: productImageId ? Number(productImageId) : null,
		tags: productTags,
		isPublic: container.dataset.isPublic === "1",
	}),
);
const queryClient = new QueryClient();

createRoot(document.getElementById(root)!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<App />
			</Provider>
		</QueryClientProvider>
	</StrictMode>,
);
