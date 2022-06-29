	async function deleteElement(event){
		const parentElement = event.target.parentNode;
		let elementId = Object.values(parentElement.dataset);
		parentElement.parentNode.removeChild(parentElement);
		try{
			await fetch(`http://localhost:3300/mywebapp/my-web-app?id=${elementId}`, {method: "DELETE"});
		}catch(err){
			subtitle.innerText = "Failed to delete";
	   	  	console.log(err);
		}
	}
	export default deleteElement;