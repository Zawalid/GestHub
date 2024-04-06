import { useTranslation } from "react-i18next";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function Hero() {
  const [parent] = useAutoAnimate({ duration: 300 });
  const { t } = useTranslation();

  return (
    <div
      ref={parent}
      className="relative grid grid-cols-1 min-h-[75vh] max-lg:text-center lg:grid-cols-2 pt-10 lg:px-12 2xl:px-24 bg-background-primary"
    >
      <div className="flex my-auto flex-col pb-10 mb-10">
        <div className="p-4 mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-text-primary mb-6 leading-[65px]">
            {t("hero.title1")}{" "}
            <span className=" font-extrabold text-secondary hover:text-secondary-hover">
              {" "}
              {t("hero.title2")}{" "}
            </span>{" "}
            {t("hero.title3")}
          </h1>
          <p className="text-text-secondary">{t("hero.paragraph")}</p>
        </div>
        <div className=" p-4"></div>
      </div>
      <div className="hidden lg:flex self-end justify-center items-center">
        <img src="SVG/hero.svg" className=" w-3/4" alt="" />
      </div>
  
    </div>
  );
}

export default Hero;
