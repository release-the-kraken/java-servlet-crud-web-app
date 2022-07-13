import deleteElement from "/mywebapp/js_modules/http_delete.js";
import createAddForm from "/mywebapp/js_modules/create_form.js";

window.onload = function(){
	
	const id = id => document.getElementById(id);
	const classes = className => document.getElementById(className);
	const create = elementTag => document.createElement(elementTag);
	let isUpdateButtonPressed = false;
	const tabContainer = create("div");
	tabContainer.setAttribute("id", "tab-container");
	const infoContainer = create("div");
	infoContainer.setAttribute("id", "info-container");

	id("app").appendChild(tabContainer);
	id("app").appendChild(infoContainer);	
	
	function addPageElements(object){
		const displayCard = create("div");
		displayCard.setAttribute("class", "display-card");
		displayCard.setAttribute("data-id", object._id.$oid);
		//displayCard.innerHTML = object._id.$oid;
		const title = create("h3");
		title.innerText = object.title;
		const author = create("h5");
		author.innerText = object.author;
		const deleteButton = create("span");
		deleteButton.setAttribute("class", "delete-buttons material-symbols-outlined");
		deleteButton.innerText = "delete";
		tabContainer.appendChild(displayCard);
		displayCard.appendChild(title);
		displayCard.appendChild(author);
		displayCard.appendChild(deleteButton);
		deleteButton.addEventListener("click", deleteElement);
		displayCard.addEventListener("click", getSingleEntryFromDB);
		
	}
	function createAddButton(){
		const addButton = create("span");
		addButton.setAttribute("id", "add-button");
		addButton.setAttribute("class", "material-symbols-outlined");
		addButton.innerText = "add";
		addButton.addEventListener("click", createAddForm);
		id("tab-container").appendChild(addButton);
	}
	
	function createBookInfoDisplay(object){
		const textTypes = ["h1", "h2", "h3", "p"];
		const objectProperties = [object.title, object.author, object.genre, object.description];
		const infoContainer = id("info-container");
		if(infoContainer.firstChild){
			infoContainer.removeChild(infoContainer.firstChild);
		}
		const bookInfoDisplay = create("div");
		bookInfoDisplay.setAttribute("id", "book-info-display");
		const docFrag = document.createDocumentFragment();
		(function createTextElement(){
			for(let i = 0; i < textTypes.length; i++){
				const container = create("div");
				container.setAttribute("class", "book-info");
				const element = create(textTypes[i]);
				element.innerText = objectProperties[i];
				const updateButton = create("span");
				updateButton.setAttribute("class", "material-symbols-outlined");
				updateButton.innerText = "edit";
				updateButton.addEventListener("click", updateEntry);
				container.appendChild(element);
				container.appendChild(updateButton);
				docFrag.appendChild(container);
			}
		})();
		
		bookInfoDisplay.appendChild(docFrag);
		infoContainer.appendChild(bookInfoDisplay);
	}
	async function updateEntry(event){
		const parentElement = event.target.parentNode;
		const bookInfoText = parentElement.firstChild;
		bookInfoText.contentEditable = true;
		bookInfoText.focus();
	}
	async function getSingleEntryFromDB(event){
		let elementId = null;
		if(event.target.className != "display-card" && event.target.className != "delete-buttons"){
			elementId = Object.values(event.target.parentNode.dataset);
		}else{
			elementId = Object.values(event.target.dataset);
		}
		try{
	   		let response = await fetch(`http://localhost:3300/mywebapp/my-web-app?id=${elementId}`);
	   		let responseObject = await response.json();
	   		createBookInfoDisplay(responseObject);
	   	}catch(err){
		 	console.log(err);
	   	}
	}
	(async function getAllEntriesFromDB(){
		//subtitle.innerHTML = "Fetching from database.";
		try{
	   		let response = await fetch("http://localhost:3300/mywebapp/my-web-app");
	   		let responseObject = await response.json();	   		
	   		responseObject.map(obj => addPageElements(obj));
	   		createAddButton();
	   		//subtitle.innerHTML = "Data fetched successfully";
	   	}catch(err){
	   	  //subtitle.innerText = "No content";
	   	  console.log(err);
	   	}
	})();
/*	deleteElement
	}*/	
		
		
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