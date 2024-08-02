import { HomeSearchBtn } from "./HomeSearchBtn";

interface Props {
  tabmenu: string;
  setTabMenu: React.Dispatch<React.SetStateAction<string>>;
}

const HomeTabMenu = ({ tabmenu, setTabMenu }: Props) => {
  const tabs = [
    { key: "popularity", label: "Popularity" },
    { key: "mostLikes", label: "Most Likes" },
    { key: "mostComments", label: "Most Comments" },
    { key: "recent", label: "Recent" },
  ];

  return (
    <div className="flex justify-between">
      <div className="px-4 flex gap-4 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setTabMenu(tab.key)}
            className={`sm:px-4 sm:py-2 px-2 py-1 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] text-sm transition duration-200 ${
              tabmenu === tab.key ? "bg-black text-white" : "bg-white/[0.2]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <HomeSearchBtn/>
    </div>
  );
};

export default HomeTabMenu;
