import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Circ, Expo } from "gsap/all";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingref = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <span
        ref={growingSpan}
        className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"
      ></span>
      <div className="w-full relative min-h-screen font-['Helvetica_Now_Display']">
        {showCanvas &&
          data[0].map((canvasdets, index) => (
            <Canvas key={index} details={canvasdets} />
          ))}
        <div className="w-full relative z-[1] h-screen">
          <nav className="w-full p-4 md:p-8 flex flex-col md:flex-row justify-between z-50 items-center">
            <div className="brand text-xl md:text-2xl font-md mb-4 md:mb-0">thirtysixstudios</div>
            <div className="links flex gap-4 md:gap-10">
              {["Home", "About", "Projects", "Contact"].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm md:text-md hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="textcontainer w-full px-4 md:px-[10%] lg:px-[20%] mt-8 md:mt-0">
            <div className="text w-full md:w-[70%] lg:w-[50%]">
              <h3 className="text-2xl md:text-3xl lg:text-4xl leading-[1.2]">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-base md:text-lg w-full md:w-[90%] lg:w-[80%] mt-6 md:mt-10 font-normal">
                We are a team of designers, developers, and strategists who are
                passionate about creating digital experiences that are both
                beautiful and functional.
              </p>
              <p className="text-sm md:text-md mt-6 md:mt-10">scroll</p>
            </div>
          </div>
          <div className="w-full absolute -bottom-12 md:-bottom-24 left-0">
            <h1
              ref={headingref}
              className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[13.5rem] font-normal tracking-tight leading-none pl-2 md:pl-5"
            >
              Thirtysixstudios
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full relative min-h-screen mt-16 md:mt-32 px-4 md:px-10">
        {showCanvas &&
          data[1].map((canvasdets, index) => (
            <Canvas key={index} details={canvasdets} />
          ))}
        <h1 className="text-4xl md:text-6xl lg:text-8xl tracking-tighter">about the brand</h1>
        <p className="text-xl md:text-3xl lg:text-4xl leading-[1.8] w-full md:w-[90%] lg:w-[80%] mt-6 md:mt-10 font-light">
          we are a team of designers, developers, and strategists who are
          passionate about creating digital experiences that are both beautiful
          and functional, we are a team of designers, developers, and
          strategists who are passionate about creating digital experiences that
          are both beautiful and functional.
        </p>

        <img
          className="w-full md:w-[90%] lg:w-[80%] mt-6 md:mt-10"
          src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
          alt="Brand showcase"
        />
      </div>
    </>
  );
}

export default App;