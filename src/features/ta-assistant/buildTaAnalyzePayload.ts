import type { SubmissionResultState } from "../../pages/AssignmentPage/ProblemSolvePage/types";
import type {
	TaAnalyzeRequest,
	TaCompileResult,
	TaContext,
	TaLanguage,
} from "./types";
import { stripHtml } from "./utils/stripHtml";

const PASSED_TEST_RESULTS = new Set(["correct", "AC"]);

export function mapTaLanguage(language: string): TaLanguage {
	const normalized = language.toLowerCase();
	if (normalized === "c") return "cpp";
	if (
		normalized === "python" ||
		normalized === "java" ||
		normalized === "cpp" ||
		normalized === "javascript"
	) {
		return normalized;
	}
	return "cpp";
}

function buildCompileResult(
	submissionResult: SubmissionResultState,
): TaCompileResult {
	if (submissionResult.result === "CE" || submissionResult.output_compile) {
		return {
			status: "error",
			stderr: submissionResult.output_compile ?? "",
			stdout: "",
			test_results: [],
		};
	}

	if (submissionResult.outputList?.length) {
		const testResults = submissionResult.outputList.map((testcase, index) => ({
			case: testcase.testcase_rank ?? index + 1,
			passed: PASSED_TEST_RESULTS.has(testcase.result ?? ""),
			expected: testcase.expected_output ?? null,
			actual: testcase.output ?? testcase.output_error ?? null,
			message: testcase.output_diff ?? testcase.output_error ?? null,
		}));

		const hasTimeout = submissionResult.outputList.some(
			(testcase) =>
				testcase.result === "timelimit" || testcase.result === "TLE",
		);

		return {
			status: hasTimeout ? "timeout" : "success",
			stdout: "",
			stderr: "",
			test_results: testResults,
		};
	}

	const result = submissionResult.result ?? "unknown";
	const isTimeout = result === "TLE";

	return {
		status: isTimeout ? "timeout" : "success",
		stdout: "",
		stderr: "",
		test_results: [
			{
				case: 1,
				passed: result === "AC",
				message:
					submissionResult.resultInfo?.message ??
					String(submissionResult.result ?? "unknown"),
			},
		],
	};
}

function buildDefaultStudentPrompt(context: TaContext): string {
	const problemText = stripHtml(context.problemDescription);
	const resultLabel =
		context.submissionResult?.resultInfo?.message ??
		context.submissionResult?.result ??
		"unknown";

	return [
		`문제: ${context.problemTitle}`,
		"",
		problemText,
		"",
		`채점 결과: ${resultLabel}`,
		"",
		"위 코드와 채점 결과를 바탕으로 어디가 잘못되었는지 힌트만 주세요. 정답 코드는 주지 마세요.",
	].join("\n");
}

export function buildTaAnalyzePayload(
	context: TaContext,
	options?: {
		studentPrompt?: string;
		hintLevel?: 1 | 2 | 3;
		sessionId?: string | null;
	},
): TaAnalyzeRequest | null {
	if (!context.sourceCode.trim() || !context.submissionResult) return null;

	const studentPrompt =
		options?.studentPrompt?.trim() || buildDefaultStudentPrompt(context);

	return {
		source_code: context.sourceCode,
		compile_result: buildCompileResult(context.submissionResult),
		student_prompt: studentPrompt,
		language: mapTaLanguage(context.language),
		problem_id: context.problemId != null ? String(context.problemId) : null,
		hint_level: options?.hintLevel ?? 1,
		session_id: options?.sessionId ?? null,
	};
}
