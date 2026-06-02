export function stripHtml(html: string): string {
	if (!html) return "";
	const doc = new DOMParser().parseFromString(html, "text/html");
	return (doc.body.textContent ?? "")
		.replace(/\u00a0/g, " ")
		.replace(/\n{3,}/g, "\n\n")
		.trim();
}
