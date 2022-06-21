//documet.onload = function(){
	const id = (id) => document.getElementById(id);
	const classNames = (className) => document.getElementsByClassName(className);	
	
	const subtitle = id("subtitle");	
	
	function addPageElements(object){
		const dCContainer = id("display-cards-container");
		const displayCard = document.createElement("div");
		displayCard.setAttribute("class", "display-card");
	//	//displayCard.setAttribute("value", object._id.$oid);
//		////displayCard.innerHTML = object._id.$oid;
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
		
	}

	function getContent(){
		subtitle.innerHTML = "Fetching from database.";
		/*try{
      		let response = await fetch("http://localhost:3300/mywebapp/my-web-app");
      		let responseObject = await response.json();
      		responseObject.map(obj => addPageElements(obj));
      		subtitle.innerHTML = "Data fetched successfully";
    	}catch(err){
    	  subtitle.innerText = "No content";
      	  console.log(err);
    	}*/
    	fetch("http://localhost:3300/mywebapp/my-web-app",{method: "GET"})
    	.then(function(response){
			let respObj = response.json();
			respObj.map(obj => addPageElements(obj));
      		subtitle.innerHTML = "Data fetched successfully";
		}).catch(function(err){
			subtitle.innerText = "No content";
      	  	console.log(err);
		})
  	}
  	getContent();
//}