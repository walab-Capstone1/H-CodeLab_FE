import type React from "react";
import { useResetPasswordPage } from "./hooks/useResetPasswordPage";
import ResetPasswordPageView from "./components/ResetPasswordPageView";

const ResetPasswordPage: React.FC = () => {
	const d = useResetPasswordPage();
	return <ResetPasswordPageView {...d} />;
};

export default ResetPasswordPage;
