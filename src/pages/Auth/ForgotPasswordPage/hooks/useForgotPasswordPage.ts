import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../../../services/APIService";

type Step = "input" | "sent";

export function useForgotPasswordPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [step, setStep] = useState<Step>("input");
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleEmailChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setEmail(e.target.value);
			setErrorMessage("");
		},
		[],
	);

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (!email.trim()) return;

			setIsLoading(true);
			setErrorMessage("");

			try {
				await apiService.requestPasswordReset(email.trim());
				setStep("sent");
			} catch (error: any) {
				setErrorMessage(
					error?.message || "이메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.",
				);
			} finally {
				setIsLoading(false);
			}
		},
		[email],
	);

	const handleBackToLogin = useCallback(() => {
		navigate("/login");
	}, [navigate]);

	const handleResend = useCallback(async () => {
		setIsLoading(true);
		setErrorMessage("");
		try {
			await apiService.requestPasswordReset(email.trim());
			// 재발송 성공 시 sent 상태 유지
		} catch (error: any) {
			setErrorMessage(
				error?.message || "이메일 재발송에 실패했습니다.",
			);
		} finally {
			setIsLoading(false);
		}
	}, [email]);

	return {
		email,
		step,
		isLoading,
		errorMessage,
		handleEmailChange,
		handleSubmit,
		handleBackToLogin,
		handleResend,
	};
}

export type ForgotPasswordPageHookReturn = ReturnType<typeof useForgotPasswordPage>;
