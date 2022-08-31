import { FACEBOOK_APP_ID } from "@/constants";
import { FC, useEffect } from "react";
import { useMediaQuery, useScreen } from "usehooks-ts";

interface FacebookCommentProps {
  dataHref: string;
}

const FacebookComment: FC<FacebookCommentProps> = ({ dataHref }) => {
  const screen = useScreen();

  useEffect(() => {
    if (window.FB) {
      FB.XFBML.parse();
    }
    window.fbAsyncInit = function () {
      FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse social plugins on this page
        version: "v2.5", // use version 2.1
      });
    }.bind(this);

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js: any,
        fjs: any = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/vi_VN/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  return (
    <div className="w-full mt-20">
      <div id="fb-root"></div>
      <div
        className="fb-like"
        data-href={dataHref}
        data-width={(screen?.width || 380) - 20}
        data-layout="standard"
        data-action="like"
        data-size="large"
        data-share="true"
      ></div>
      <div
        className="fb-comments mt-5"
        data-href={dataHref}
        data-width="100%"
        data-numposts="5"
      ></div>
    </div>
  );
};
export default FacebookComment;
