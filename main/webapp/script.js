import deleteElement from "/mywebapp/httpFunctions.js";
window.onload = function(){

	const id = id => document.getElementById(id);
	const classes = className => document.getElementById(className);
	
	const subtitle = id("subtitle");
	//var deleteButtons = classes("delete-buttons");
	subtitle.innerHTML = "bingo";
	function addPageElements(object){
		const dCContainer = id("display-cards-container");
		const displayCard = document.createElement("div");
		displayCard.setAttribute("class", "display-card");
		displayCard.setAttribute("data-id", object._id.$oid);
		//displayCard.innerHTML = object._id.$oid;
		const firstName = document.createElement("h3");
		firstName.innerText = object.firstName;
		const lastName = document.createElement("h3");
		lastName.innerText = object.lastName;
		const deleteButton = document.createElement("button");
		deleteButton.innerText = "Delete";
		deleteButton.setAttribute("class", "delete-buttons");
		const updateButton = document.createElement("button");
		updateButton.innerText = "Update";
		dCContainer.appendChild(displayCard);
		displayCard.appendChild(firstName);
		displayCard.appendChild(lastName);
		displayCard.appendChild(updateButton);
		displayCard.appendChild(deleteButton);
		deleteButton.addEventListener("click", deleteElement);
	}
	
	(async function getContent(){
		subtitle.innerHTML = "Fetching from database.";
		try{
	   		let response = await fetch("http://localhost:3300/mywebapp/my-web-app");
	   		let responseObject = await response.json();
	   		responseObject.map(obj => addPageElements(obj));
	   		subtitle.innerHTML = "Data fetched successfully";
	   	}catch(err){
	   	  subtitle.innerText = "No content";
	   	  console.log(err);
	   	}
	})();
/*	deleteElement
	}*/
		
}