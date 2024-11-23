const settingContentTailwindClass = `h-9 w-9 p-0.5 rounded-full cursor-pointer transition-all ease-in duration-300 flex justify-center items-center`;
const settingBgHoverTailwindClass = ` bg-primary-gradient hover:opacity-80`;

const Spotlights = [
  {
    className:
      "top-[5vh] left-[0vw] h-[70vh] w-[80vw] sm:top-[8vh] sm:left-[2vw] sm:h-[75vh] sm:w-[60vw] md:top-[5vh] md:left-[-5vw] md:h-[80vh] md:w-[50vw]",
    fill: "white"
  },
  {
    className:
      "top-[10vh] left-[8vw] h-[60vh] w-[75vw] sm:top-[12vh] sm:left-[4vw] sm:h-[65vh] sm:w-[55vw] md:top-[10vh] md:left-[5vw] md:h-[70vh] md:w-[50vw]",
    fill: "var(--secondary)"
  },
  {
    className:
      "top-[15vh] left-[16vw] h-[50vh] w-[70vw] sm:top-[18vh] sm:left-[10vw] sm:h-[60vh] sm:w-[60vw] md:top-[15vh] md:left-[15vw] md:h-[60vh] md:w-[50vw]",
    fill: "var(--primary)"
  }
];

export {
    settingContentTailwindClass,
    settingBgHoverTailwindClass,
    Spotlights
}