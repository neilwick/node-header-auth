window.addEventListener('load', async (e) => {

	const user = "bob", pwd = "1234";

	const loginInfo = btoa(`${user}:${pwd}`);

	let reqHeaders = await fetch('/login', {
		method: "get",
		headers: {
			"Authorization": `Basic ${loginInfo}`,
			"Content-Type": `application/json`
		}
	});

	let data = await reqHeaders.json();

	console.log(data);
});
