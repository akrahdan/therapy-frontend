
const host = "131.212.124.47:80";
const topic_path ='abc'

export const ALDialog = async () => {
  const content = await fetch('/content.top')
  const result = await content.text()

  console.log("CR: ", result)


  window.QiSession(
    (session) => {
        
        console.log('Content: ', )
    session.service("ALDialog").then(
        (ALDialog)=> {
            ALDialog.setLanguage("English")
            const topic_name = ALDialog.loadTopicContent(result)
            
            ALDialog.activateTopic(topic_name)

            ALDialog.subscribe('my_example_dialog')

            try { 
            //  prompt('ghi')
              
            } finally{

              // ALDialog.unsubscribe('my_example_dialog')
              // ALDialog.deactivateTopic(topic_name)
              // ALDialog.unloadTopic(topic_name)





            }


            
            
        }

    )

       
      
    },
    () => {
      console.log("Disconnected");
    },
    host
  );
};

export const textToSpeech = () => {
  window.QiSession(
    (session) => {
      session.service("ALTextToSpeech").then(
        (tts) => {
          tts.say("What is  the resident ID");
        },
        (error) => {
          console.log("An error occurred:", error);
        }
      );
    },
    () => {
      console.log("disconnected");
    },
    host
  );
};
