import deleteElement from "/mywebapp/js_modules/http_delete.js";
import createAddForm from "/mywebapp/js_modules/create_form.js";

window.onload = function(){
	
	const id = id => document.getElementById(id);
	const classes = className => document.getElementById(className);
	const create = elementTag => document.createElement(elementTag);
	let isUpdateButtonPressed = false;
	const subtitle = id("subtitle");	
	
	createAddForm();
	
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
		//subtitle.innerHTML = "Fetching from database.";
		try{
	   		let response = await fetch("http://localhost:3300/mywebapp/my-web-app");
	   		let responseObject = await response.json();
	   		responseObject.map(obj => addPageElements(obj));
	   		//subtitle.innerHTML = "Data fetched successfully";
	   	}catch(err){
	   	  //subtitle.innerText = "No content";
	   	  console.log(err);
	   	}
	})();
/*	deleteElement
	}*/
	function createUpdateForm(event){
		const docFragment = document.createDocumentFragment();
		const parentElement = event.target.parentNode;
		const updateForm = document.createElement("form");
		//updateForm.setAttribute("action", "my-web-app");
		//updateForm.setAttribute("method", "put");
		parentElement.appendChild(updateForm);
		const firstNameInputLabel = document.createElement("label");
		firstNameInputLabel.setAttribute("for", "firstName")
		firstNameInputLabel.innerText = "Update first name ";
		const firstNameInput = document.createElement("input");
		firstNameInput.setAttribute("type", "text");
		firstNameInput.setAttribute("name", "firstName");
		firstNameInput.setAttribute("id", "first-name");
		firstNameInput.setAttribute("class", "first-name");
		firstNameInput.setAttribute("placeholder", "first-name");
		const lastNameInputLabel = document.createElement("label");
		lastNameInputLabel.innerText = "Update last name ";
		const lastNameInput = document.createElement("input");
		lastNameInput.setAttribute("name", "lastName");
		lastNameInput.setAttribute("id", "last-name");
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
		submitButton.addEventListener("click", updateElement);
		isUpdateButtonPressed = true;	
			
	}
		
		
		
	async function updateElement(event){
		event.preventDefault();
		const parentElement = event.target.parentNode;
		const formData = new FormData(parentElement);
		const formProps = Object.fromEntries(formData);
		const formValues = Object.values(formProps);
		let firstName = formValues[0];
		let lastName = formValues[1];
		let elementId = Object.values(parentElement.parentNode.dataset);
		//subtitle.innerHTML = ;
		//parentElement.parentNode.removeChild(parentElement);
		try{			
			await fetch(`http://localhost:3300/mywebapp/my-web-app?id=${elementId}&firstName=${firstName}&lastName=${lastName}`,
					 {method: "PUT"});
		}catch(err){
			//subtitle.innerText = "Failed to update";
	   	  	console.log(err);
		}
	}
	
		
}