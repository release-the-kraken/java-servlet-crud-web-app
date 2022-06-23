import deleteElement from "/mywebapp/httpFunctions.js";
window.onload = function(){

	const id = id => document.getElementById(id);
	const classes = className => document.getElementById(className);
	let isUpdateButtonPressed = false;
	const subtitle = id("subtitle");
	
	
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
		updateButton.setAttribute("class", "update-buttons");
		updateButton.innerText = "Update";
		dCContainer.appendChild(displayCard);
		displayCard.appendChild(firstName);
		displayCard.appendChild(lastName);
		displayCard.appendChild(updateButton);
		displayCard.appendChild(deleteButton);
		deleteButton.addEventListener("click", deleteElement);
		updateButton.addEventListener("click", createUpdateForm);
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
	function createUpdateForm(event){
		const docFragment = document.createDocumentFragment();
		const parentElement = event.target.parentNode;
		const updateForm = document.createElement("form");
		updateForm.setAttribute("action", "my-web-app");
		updateForm.setAttribute("method", "put");
		parentElement.appendChild(updateForm);
		const firstNameInputLabel = document.createElement("label");
		firstNameInputLabel.innerText = "Update first name ";
		const firstNameInput = document.createElement("input");
		const lastNameInputLabel = document.createElement("label");
		lastNameInputLabel.innerText = "Update last name ";
		const lastNameInput = document.createElement("input");
		const submitButton = document.createElement("input");
		submitButton.setAttribute("type", "submit");
		submitButton.setAttribute("value", "update");
		docFragment.appendChild(firstNameInputLabel);
		docFragment.appendChild(firstNameInput);
		docFragment.appendChild(lastNameInputLabel);
		docFragment.appendChild(lastNameInput);
		docFragment.appendChild(submitButton);
		updateForm.appendChild(docFragment);
		parentElement.style.width = "20%";
		isUpdateButtonPressed = true;	
			
	}
	
		
}