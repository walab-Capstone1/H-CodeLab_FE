import type { SubmissionResultState } from "../../pages/AssignmentPage/ProblemSolvePage/types";

const SUCCESS_RESULTS = new Set(["AC", "correct"]);

export interface AssistantAvailability {
	canOpen: boolean;
	message?: string;
}

export function getAssistantAvailability(
	submissionResult: SubmissionResultState | null | undefined,
	isSubmitting: boolean,
): AssistantAvailability {
	if (isSubmitting) {
		return {
			canOpen: false,
			message: "테스트/제출이 진행 중입니다. 완료 후 다시 시도해 주세요.",
		};
	}

	if (!submissionResult || submissionResult.status !== "completed") {
		return {
			canOpen: false,
			message: "먼저 「테스트하기」를 실행한 뒤 AI 튜터를 이용해 주세요.",
		};
	}

	if (
		submissionResult.result &&
		SUCCESS_RESULTS.has(submissionResult.result)
	) {
		return {
			canOpen: false,
			message: "정답입니다. AI 튜터는 오답·오류가 있을 때 이용할 수 있습니다.",
		};
	}

	if (submissionResult.type !== "output") {
		return {
			canOpen: false,
			message:
				"더 정확한 힌트를 위해 「테스트하기」를 실행한 뒤 AI 튜터를 이용해 주세요.",
		};
	}

	return { canOpen: true };
}
