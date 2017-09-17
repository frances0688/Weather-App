var dispatcher = new cf.EventDispatcher();
dispatcher.addEventListener(cf.FlowEvents.FLOW_UPDATE, function(event){
	// your code here
}, false);
var cf = new cf.ConversationalForm({
	formEl: document.getElementById("my-form"),
	eventDispatcher: dispatcher
});
