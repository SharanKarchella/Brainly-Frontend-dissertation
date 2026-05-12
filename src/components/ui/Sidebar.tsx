import { Logo } from "../../icons/Logo";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SiderbarItem } from "./SidebarItem";
import { TwitterIcon } from "../../icons/TwitterIcon";

const TAG_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-yellow-100 text-yellow-700",
  "bg-pink-100 text-pink-700",
  "bg-indigo-100 text-indigo-700",
  "bg-orange-100 text-orange-700",
  "bg-teal-100 text-teal-700",
];

function tagColor(tag: string) {
  let h = 0;
  for (const c of tag) h = (h * 31 + c.charCodeAt(0)) & 0xffff;
  return TAG_COLORS[h % TAG_COLORS.length];
}

interface sidebarProps {
  selectedType: string | null;
  onTypeSelect: (type: string | null) => void;
  allTags?: string[];
  selectedTag?: string | null;
  onTagSelect?: (tag: string | null) => void;
}

export function Sidebar({ selectedType, onTypeSelect, allTags = [], selectedTag = null, onTagSelect }: sidebarProps) {
  const handleTypeClick = (type: string) => {
    if (selectedType === type) {
      onTypeSelect(null); // Clear filter if same type is clicked
    } else {
      onTypeSelect(type); // Set new filter
    }
  };
  return (
    <div className="h-screen bg-white border-2 w-72 fixed left-0 top-0 pl-6">
      <div className="flex text-2xl pt-8 items-center">
        <div className="pr-2 text-purple-600 cursor-pointer">
          <Logo />
        </div>
        Brainly
      </div>
      <div className="pt-8 pl-3 cursor-pointer">
        <div onClick={() => handleTypeClick("twitter")}>
          <SiderbarItem
            text="Twitter"
            icon={<TwitterIcon />}
            isSelected={selectedType === "twitter"}
          />
        </div>
        <div onClick={() => handleTypeClick("youtube")}>
          <SiderbarItem
            text="Youtube"
            icon={<YoutubeIcon />}
            isSelected={selectedType === "youtube"}
          />
        </div>
      </div>

      {allTags.length > 0 && (
        <div className="pt-6 pl-3 pr-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Topics
          </p>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagSelect?.(selectedTag === tag ? null : tag)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedTag === tag
                    ? "bg-purple-600 text-white"
                    : tagColor(tag)
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}