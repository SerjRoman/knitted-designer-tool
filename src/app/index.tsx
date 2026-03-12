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
	container.dataset.productImageId == "0" ||
	container.dataset.productImageId === ""
		? null
		: Number(container.dataset.productImageId);

const productTags = container.dataset.productTags
	? container.dataset.productTags.split("")
	: null;
store.dispatch(
	setConfig({
		createUrl: container.dataset.createUrl || null,
		attachUrl: container.dataset.attachUrl || null,
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
	}),
);
createRoot(document.getElementById(root)!).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>,
);
