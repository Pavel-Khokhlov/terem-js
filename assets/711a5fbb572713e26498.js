function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var l=0;l<t.length;l++){var a=t[l];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,l){return t&&_defineProperties(e.prototype,t),l&&_defineProperties(e,l),Object.defineProperty(e,"prototype",{writable:!1}),e}import"./form.css";var myFormElem=document.querySelector(".my-form"),formOutput=document.querySelector(".form__json"),submitBtn=myFormElem.querySelector(".btn-success"),selectsList=".form__selects",inputsList=".form__inputs",myFormFields=[{tag:"select",name:"select-one",values:[{value:"",label:"Выбрать"},{value:"One",label:"One"},{value:"Two",label:"Two"},{value:"Three",label:"Three"}]},{tag:"select",name:"select-two",values:[{value:"",label:"Выбрать"},{value:"One",label:"One"},{value:"Two",label:"Two"},{value:"Three",label:"Three"},{value:"Four",label:"Four"},{value:"Five",label:"Five"}]},{tag:"select",name:"select-three",values:[{value:"",label:"Выбрать"},{value:"One",label:"One"},{value:"Two",label:"Two"},{value:"Three",label:"Three"},{value:"Four",label:"Four"}]},{tag:"select",name:"select-four",values:[{value:"",label:"Выбрать"},{value:"One",label:"One"},{value:"Two",label:"Two"},{value:"Three",label:"Three"},{value:"Four",label:"Four"},{value:"Five",label:"Five"}]},{tag:"select",name:"select-five",values:[{value:"",label:"Выбрать"},{value:"One",label:"One"},{value:"Two",label:"Two"},{value:"Three",label:"Three"},{value:"Four",label:"Four"},{value:"Five",label:"Five"}]},{tag:"input",type:"text",name:"name",placeholder:"Enter your name"},{tag:"input",type:"text",name:"lastname",placeholder:"Enter your lastname"}],Form=function(){function e(t,l){_classCallCheck(this,e),this._selector=t,this._selectsArea=this._selector.querySelector(selectsList),this._inputsArea=this._selector.querySelector(inputsList),this._handleInput=l}return _createClass(e,[{key:"renderFields",value:function(e){var t=this;e.forEach((function(e){return"select"===e.tag?t._generateSelect(e):"input"===e.tag?t._generateInput(e):void 0}))}},{key:"_setEventListener",value:function(e){e.addEventListener("input",this._handleInput)}},{key:"_generateSelect",value:function(e){var t=this;return this._selectEl=document.createElement("select"),this._selectEl.name=e.name,this._selectEl.value="Choose value",this._selectEl.className="form-select form__field",e.values.forEach((function(e){return t._option=document.createElement("option"),t._option.value=e.value,t._option.innerText=e.label,t._selectEl.append(t._option)})),this._setEventListener(this._selectEl),this._selectsArea.append(this._selectEl)}},{key:"_generateInput",value:function(e){return this._inputEl=document.createElement("input"),this._inputEl.type=e.type,this._inputEl.name=e.name,this._inputEl.placeholder=e.placeholder,this._inputEl.className="form-control form__field",this._setEventListener(this._inputEl),this._inputsArea.append(this._inputEl)}}]),e}(),MyForm=new Form(myFormElem,handleChange);function validateForm(e){Array.from(e.entries()).find((function(e){return""===e[1]}))?submitBtn.setAttribute("disabled",!0):submitBtn.removeAttribute("disabled")}function handleChange(e){e.preventDefault(),validateForm(getFormData(myFormElem))}function sendData(e){return sendRequest({method:"GET",headers:{"Content-Type":"multipart/form-data"},body:e})}function sendRequest(e){return e.method,e.headers,e.body}function getFormData(e){return serializeForm(e)}function serializeForm(e){return new FormData(e)}function createJson(e){var t=new Object;return e.forEach((function(e){t[e[0]]=e[1]})),JSON.stringify(t)}function handleSubmit(e){e.preventDefault();var t=getFormData(e.target);displayJson(sendData(createJson(Array.from(t.entries()))))}function displayJson(e){myFormElem.reset(),submitBtn.setAttribute("disabled",!0),formOutput.innerText=e}MyForm.renderFields(myFormFields),myFormElem.addEventListener("submit",handleSubmit);