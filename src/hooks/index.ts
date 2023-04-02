import { useEffect, useState } from "react";

export const useToogleTheme = () => {
  const [currentTheme, setCurrenttheme] = useState(
    JSON.parse(localStorage.getItem("currentTheme") as string) || "dim"
  );

  const dimTheme =
    "https://cdn.jsdelivr.net/npm/@forevolve/bootstrap-dark@1.0.0/dist/css/bootstrap-dark.min.css";
  const ligthTheme =
    "https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css";

  const setTheme = (currentTheme: string) => {
    const linkTheme = document.querySelector("#theme-link") as HTMLLinkElement;
    linkTheme.href = currentTheme === "dim" ? dimTheme : ligthTheme;
  };

  const toogleTheme = () => {
    const checkedTheme = currentTheme === "dim" ? "light" : "dim";

    //  На всякий случай
    localStorage.setItem("currentTheme", JSON.stringify(checkedTheme));

    setTheme(currentTheme);

    setCurrenttheme(checkedTheme);
  };

  useEffect(() => {
    setTheme(currentTheme);
  }, [currentTheme]);

  return { toogleTheme, currentTheme };
};
