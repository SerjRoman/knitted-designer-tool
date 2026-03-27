import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ROOT, MODAL_ROOT, REACT_APP_WRAPPER } from "@/shared/config/dom";
import { setConfig, setProduct } from "@/shared/store";
import { App } from "./App";
import tailwindStyles from "./index.css?inline";
import { store } from "./store";

const container = document.getElementById(ROOT);

if (!container) {
	throw new Error(`Container with id '${ROOT}' not found`);
}
const shadowRoot = container.attachShadow({ mode: "open" });

const propertyRegex = /@property\s*--[\w-]+\s*{[^}]*}/g;
const propertiesCSS = tailwindStyles.match(propertyRegex)?.join("\n") || "";

if (propertiesCSS && !document.getElementById("tailwind-v4-properties")) {
	const headStyle = document.createElement("style");
	headStyle.id = "tailwind-v4-properties";
	headStyle.textContent = propertiesCSS;
	document.head.appendChild(headStyle);
}
const styleElement = document.createElement("style");
styleElement.textContent = tailwindStyles;
styleElement.textContent = tailwindStyles.replaceAll(":root", ":host");
shadowRoot.appendChild(styleElement);

const modalRootNode = document.createElement("div");
modalRootNode.id = MODAL_ROOT;
shadowRoot.appendChild(modalRootNode);

const reactRootNode = document.createElement("div");

reactRootNode.className = `${REACT_APP_WRAPPER} w-full h-full`;
shadowRoot.appendChild(reactRootNode);

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

createRoot(reactRootNode).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<App />
			</Provider>
		</QueryClientProvider>
	</StrictMode>,
);
