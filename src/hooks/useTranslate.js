import { useLocale } from "../contexts/LocaleContext";

const dict = {
  en: {
    "edit btn": "Edit",
    "del btn": "Delete",
  },
  ko: {
    "edit btn": "수정",
    "del btn": "삭제",
  },
};

function useTranslate() {
  const locale = useLocale();
  const translate = (key) => dict[locale][key] || "";
  return translate;
}

export default useTranslate;
