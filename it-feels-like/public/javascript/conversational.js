
function addRandomClick(){
				var ran = ["Random message 1", "Random message 2"];
				if(window.ConversationalForm){
					window.ConversationalForm.addRobotChatResponse(ran[Math.floor(Math.random() * ran.length)]);
				}
			}
			const transcript = ["What is the purpose of life?",
				"To serve the greater good.",
				"What is the purpose of living?",
				"To live forever",
				"Where are you now?",
				"I’m in the middle of nowhere.",
				"What is the purpose of dying?",
				"To have a life.",
				"What is the purpose of emotions?",
				"I don’t know",
				"What is moral?",
				"What empowered humanity, what intellectual the essence is",
				"What is immoral?",
				"The fact that you have a child.",
				"What is morality?",
				"What is altruism?",
				"What is the definition of altruism?",
				"If you don’t believe in god, then you don’t know",
				"Ok ... so what is the definition of morality?",
				"Well, the truth is, you’re not a believer in god almighty",
				"Tell me the definition of morality, I am quite upset now!",
				"I’m done!"];
			let transcriptIndex = 0;
			function robotStartsTalkingToItself(){
				var next = transcript[transcriptIndex]
				window.ConversationalForm.addRobotChatResponse(next);
				transcriptIndex++;
				if(transcriptIndex < transcript.length){
					setTimeout(() => {
						robotStartsTalkingToItself();
					}, (next.length / 50) * 1000);
				}
			}
			function initExample(){
				// called from examples code
				robotStartsTalkingToItself();
			}
