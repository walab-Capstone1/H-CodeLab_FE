import type { SubmissionResultState } from "../../pages/AssignmentPage/ProblemSolvePage/types";

export type TaLanguage = "python" | "java" | "cpp" | "javascript";

export interface TaTestCaseResult {
	case: number | string;
	passed: boolean;
	expected?: string | null;
	actual?: string | null;
	message?: string | null;
}

export interface TaCompileResult {
	status: "success" | "error" | "timeout";
	exit_code?: number | null;
	stdout?: string;
	stderr?: string;
	test_results?: TaTestCaseResult[];
}

export interface TaAnalyzeRequest {
	source_code: string;
	compile_result: TaCompileResult;
	student_prompt: string;
	language: TaLanguage;
	problem_id?: string | null;
	hint_level?: 1 | 2 | 3;
	session_id?: string | null;
}

export interface TaErrorAnalysis {
	error_type: string;
	summary: string;
	failed_test_count?: number;
}

export interface TaAnalyzeResponse {
	answer: string;
	hint_level: number;
	error_analysis?: TaErrorAnalysis | null;
	suggested_questions?: string[];
	metadata: {
		model: string;
		latency_ms: number;
		tokens_used?: number | null;
	};
}

export interface TaMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
	suggestedQuestions?: string[];
}

export interface TaContext {
	sourceCode: string;
	language: string;
	problemId?: number | string;
	problemTitle: string;
	problemDescription: string;
	submissionResult: SubmissionResultState | null;
}
