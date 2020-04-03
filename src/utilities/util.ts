export function convertUrl(input: string, option: string): string {
	if (option == "offer")
		return input.substring(0, input.lastIndexOf("/")) + "/offer";
	else if (option == "book")
		return input.substring(0, input.lastIndexOf("/")) + "/book";
	else return input.substring(0, input.indexOf("/ride")) + "/display";
}

export function compareDate(d1: string, d2: string): Number {
	if (d1 === d2) return 0;
	else return -1;
}
export function arrayBufferToBase64(buffer) {
	var binary = "";
	var bytes = [].slice.call(new Uint8Array(buffer));
	bytes.forEach(b => (binary += String.fromCharCode(b)));
	return window.btoa(binary);
}
