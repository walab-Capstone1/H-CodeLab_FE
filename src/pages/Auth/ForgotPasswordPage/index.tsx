import type React from "react";
import { useForgotPasswordPage } from "./hooks/useForgotPasswordPage";
import ForgotPasswordPageView from "./components/ForgotPasswordPageView";

const ForgotPasswordPage: React.FC = () => {
	const d = useForgotPasswordPage();
	return <ForgotPasswordPageView {...d} />;
};

export default ForgotPasswordPage;
