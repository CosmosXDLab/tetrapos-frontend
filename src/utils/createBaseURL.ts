const apiUrl = process.env.API_URL as string;

if (!apiUrl) {
	throw new Error("API_URL is not defined");
}

export const createBaseURL = (version = "v1"): string => `${apiUrl}/${version}`;
