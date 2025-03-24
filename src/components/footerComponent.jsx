import logo from "../images/logo.svg";
import SubscribeField from "./subscribeComponent";
import facebookIcon from "../images/facebookIcon.svg";
import twitterIcon from "../images/twitter.svg";
import instagramIcon from "../images/instagram.svg";

const Footer = () => {
  const footerInfo = [
    {
      header: "About us",
      section: ["How to book", "Help center"],
    },
    {
      header: "Flight",
      section: ["Booking easily", "Promotions"],
    },
  ];
  const contactUs = {
    header: "Contact us",
    icons: [facebookIcon, twitterIcon, instagramIcon],
  };

  return (
    <footer className="flex items center gap-44">
      <div>
        <div className="flex gap-4 items-center mb-6">
          <img src={logo} alt="logo" />
          <a href="#" className="text-[20px] font-normal text-[#6C6CFFFF]">
            E-flight
          </a>
        </div>
        <SubscribeField />
      </div>
      <div className="grid grid-cols-3 gap-40">
        {footerInfo.map((item, index) => (
          <div key={index} className="space-y-4">
            <h2 className="font-bold text-neutral-900 text-xl">
              {item.header}
            </h2>
            <ul className="flex flex-col gap-3 font-normal text-base text-neutral-900">
              {item.section.map((tag, i) => (
                <a key={i} href="#">
                  <li>{tag}</li>
                </a>
              ))}
            </ul>
          </div>
        ))}
        <div className="space-y-4">
          <h2 className="font-bold text-neutral-900 text-xl">
            {contactUs.header}
          </h2>
          <div className="flex gap-4">
            {contactUs.icons.map((icon, index) => (
              <a key={index} href="#">
                <img src={icon} alt="social media icon" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
