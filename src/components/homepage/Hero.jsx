import { IoIosArrowDown } from "react-icons/io";
import { DropDown } from "../ui/DropDown";
import { SearchInput } from "../ui/SearchInput";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { setToUrl } from "../../hooks/useToUrl";
import Shade from "../ui/shade";

function Hero() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const [parent] = useAutoAnimate({ duration: 300 });
  const { t } = useTranslation();

  return (
    <div
      ref={parent}
      className="relative grid grid-cols-1 min-h-[75vh] max-lg:text-center lg:grid-cols-2 pt-10 lg:px-12 2xl:px-24"
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
        <div className="flex flex-col md:flex-row justify-center lg:justify-start items-center gap-4 p-4">
          <SearchInput
            onChange={(query) =>
              setToUrl("search", query, searchParams, setSearchParams)
            }
            query={query}
            placeholder={t("hero.placeholder")}
          />
          <DropDown
            toggler={
              <span
                className={
                  "flex items-center gap-2  border px-4 py-1 rounded-lg border-border bg-primary hover:bg-primary-hover "
                }
              >
                {t("hero.categories")} <IoIosArrowDown />{" "}
              </span>
            }
          >
            {["it", "Cyber securiy", "Secretariat"].map((e) => (
              <DropDown.Option
                key={e}
                onClick={() =>
                  setToUrl("category", e, searchParams, setSearchParams)
                }
              >
                {e}
              </DropDown.Option>
            ))}
          </DropDown>
        </div>
      </div>
      <div className="hidden lg:flex self-end justify-center items-center">
        <img src="SVG/hero.svg" className=" w-3/4" alt="" />
      </div>
      <Shade
        className={"absolute top-0 left-0 w-full overflow-hidden leading-[0]"}
      />
      <Shade
        className=" absolute rotate-180 md:top-[89.3%] top-[92%] left-0 w-full overflow-hidden leading-[0] "
        svg="h-14 md:h-16 w-full"
      />
    </div>
  );
}

export default Hero;
