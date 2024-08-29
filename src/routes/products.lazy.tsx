import ProductsView from "@/components/views/products/ProductsComponent";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/products")({
	component: ProductsView,
});
