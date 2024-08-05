import type { EndPoints } from "../api/config/endpoints";

export type EndPointsValues = (typeof EndPoints)[keyof typeof EndPoints][keyof typeof EndPoints.sales];
