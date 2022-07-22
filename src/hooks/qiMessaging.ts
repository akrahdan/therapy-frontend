import { useEffect } from "react";

const useQiMessaging = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "libqi/libs/qimessaging/2/qimessaging.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

export default useQiMessaging;
