import { useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import apiService from "../../../../services/APIService";

type Step = "input" | "success" | "invalid";

export function useResetPasswordPage() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token") ?? "";

	const [newPassword, setNewPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [step, setStep] = useState<Step>("input");
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	// 토큰 없으면 invalid 상태로
	useEffect(() => {
		if (!token) {
			setStep("invalid");
		}
	}, [token]);

	const passwordError = (() => {
		if (newPassword && newPassword.length < 8) return "비밀번호는 최소 8자 이상이어야 합니다.";
		if (passwordConfirm && newPassword !== passwordConfirm) return "비밀번호가 일치하지 않습니다.";
		return "";
	})();

	const isFormValid = newPassword.length >= 8 && newPassword === passwordConfirm;

	const handleNewPasswordChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setNewPassword(e.target.value);
			setErrorMessage("");
		},
		[],
	);

	const handlePasswordConfirmChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setPasswordConfirm(e.target.value);
			setErrorMessage("");
		},
		[],
	);

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (!isFormValid || !token) return;

			setIsLoading(true);
			setErrorMessage("");

			try {
				await apiService.resetPassword(token, newPassword);
				setStep("success");
			} catch (error: any) {
				setErrorMessage(
					error?.message || "비밀번호 재설정에 실패했습니다. 링크가 만료되었을 수 있습니다.",
				);
			} finally {
				setIsLoading(false);
			}
		},
		[token, newPassword, isFormValid],
	);

	const handleGoToLogin = useCallback(() => {
		navigate("/login");
	}, [navigate]);

	const handleGoToForgotPassword = useCallback(() => {
		navigate("/forgot-password");
	}, [navigate]);

	return {
		token,
		newPassword,
		passwordConfirm,
		showPassword,
		showConfirm,
		step,
		isLoading,
		errorMessage,
		passwordError,
		isFormValid,
		handleNewPasswordChange,
		handlePasswordConfirmChange,
		setShowPassword,
		setShowConfirm,
		handleSubmit,
		handleGoToLogin,
		handleGoToForgotPassword,
	};
}

export type ResetPasswordPageHookReturn = ReturnType<typeof useResetPasswordPage>;
