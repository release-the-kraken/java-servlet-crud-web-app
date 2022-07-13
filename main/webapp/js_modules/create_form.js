const id = id => document.getElementById(id);
const create = elementTag => document.createElement(elementTag);

function hideForm(){
	id("form-container").style.visibility = "hidden";
} 

const createAddForm = () =>{
		const labels = ["Title", "Author", "Genre", "Description"];
		const container = id("app");
		const docFrag = document.createDocumentFragment();
		const formContainer = create("div");
		formContainer.setAttribute("id", "form-container");
		const closeButton = create("span");		
		closeButton.setAttribute("id", "close-button");
		closeButton.setAttribute("class", "material-symbols-outlined");
		closeButton.innerText = "cancel";
		closeButton.addEventListener("click", hideForm)
		formContainer.appendChild(closeButton);
		const numberOfInputs = 4;
		const formMain = create("div");
		formMain.setAttribute("id", "form-main");
		const form = create("form");
		form.setAttribute("id", "book-add-form");
		form.setAttribute("action", "my-web-app");
		form.setAttribute("method", "post");
		formMain.appendChild(form);

		for(let i = 0; i < numberOfInputs; i++){
			const labelContainer = create("div");
			const currLabel = create("label");
			labelContainer.setAttribute("class", "left-form-tab");
			currLabel.setAttribute("id", `form-${labels[i].toLowerCase()}-label`);
			currLabel.setAttribute("for", labels[i].toLowerCase());
			currLabel.innerText = labels[i];
			labelContainer.appendChild(currLabel);
			form.appendChild(labelContainer);
			const inputContainer = create("div");
			inputContainer.setAttribute("class", "right-form-tab");
			let currInput;
			if(i < 3){
				currInput = create("input");				
				currInput.setAttribute("type", "text");
				currInput.setAttribute("class", "input-box");
				currLabel.setAttribute("id", `form-${labels[i].toLowerCase()}-input`);
			}else{
				currInput = create("textarea");
			}
			//id("form-title-input").setAttribute("required", "true");
			currInput.setAttribute("id", `{labels[i].toLowerCase()}-input`);
			currInput.setAttribute("name", labels[i].toLowerCase());
			inputContainer.appendChild(currInput);
			form.appendChild(inputContainer);
		}
		id("")
		const submitBtnContainer = create("div");
		submitBtnContainer.setAttribute("id", "submit-div"); 
		const submitButton = create("input");
		submitButton.setAttribute("type", "submit");
		submitButton.setAttribute("value", "Add Book");
		submitButton.setAttribute("id", "form-submit-button");
		submitButton.addEventListener("click", hideForm);
		submitBtnContainer.appendChild(submitButton);
		form.appendChild(submitBtnContainer);
		docFrag.appendChild(formMain);
		
		formContainer.appendChild(docFrag);
		container.appendChild(formContainer);
	}	
	export default createAddForm;