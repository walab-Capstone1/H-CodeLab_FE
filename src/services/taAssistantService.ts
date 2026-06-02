import type {
	TaAnalyzeRequest,
	TaAnalyzeResponse,
} from "../features/ta-assistant/types";

const DEFAULT_TA_API_URL = "https://hj.walab.info/";

class TaAssistantService {
	private baseURL: string;

	constructor() {
		this.baseURL =
			process.env.REACT_APP_TA_API_URL?.replace(/\/$/, "") ??
			DEFAULT_TA_API_URL;
	}

	async analyze(request: TaAnalyzeRequest): Promise<TaAnalyzeResponse> {
		const response = await fetch(`${this.baseURL}/ta/analyze`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(request),
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			const detail =
				typeof errorData.detail === "string"
					? errorData.detail
					: `HTTP ${response.status}: ${response.statusText}`;
			throw new Error(detail);
		}

		return response.json();
	}
}

const taAssistantService = new TaAssistantService();
export default taAssistantService;
