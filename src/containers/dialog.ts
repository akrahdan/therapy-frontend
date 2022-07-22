const host = "131.212.124.47:80";
const list = ["cat", "dog", "hello"];

export const handleDialog = () => {
  window.QiSession(
    (session) => {
      session.service("ALTextToSpeech").then(
          (tts) => {
              tts.say("What is your I D? ")
          }
      )
      session.service("ALSpeechRecognition").then(
        async (asr) => {
          asr.setVocabulary(list, true);
          asr.subscribe("TESTER");

          const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
          await sleep(5000);
          asr.unsubscribe("TESTER");
          session.service("ALMemory").then(function (ALMemory) {
            ALMemory.getData("WordRecognized").then(function (event) {
              console.log("Event: ", event);
              session.service("ALTextToSpeech").then(
                  function(tts) {
                      tts.say("Did you say " + event[0])
                  }
              )
            });
          });
        },
        (err) => {
          console.log("An error occurred: ", err);
        }
      );

      
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
