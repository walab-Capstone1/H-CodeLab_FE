import type { SubmissionResultState } from "../../pages/AssignmentPage/ProblemSolvePage/types";
import { getAssistantAvailability } from "./getAssistantAvailability";

export function shouldShowTaAssistant(
	submissionResult: SubmissionResultState | null | undefined,
	isSubmitting: boolean,
): boolean {
	return getAssistantAvailability(submissionResult, isSubmitting).canOpen;
}
