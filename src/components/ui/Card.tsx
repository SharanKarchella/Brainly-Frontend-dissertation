import { ShareIcon } from "../../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  tags?: string[];
}

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

export function Card({ title, link, type, tags }: CardProps) {
  return (
    <div className="p-2">
      <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border">

        <div className="flex justify-between">
          <div className="flex items-center text-md">
            <div className="text-gray-500 pr-2">
              <ShareIcon />
            </div>
            {title}
          </div>

          <div className="flex items-center">
            <div className=" pr-2 text-gray-500">
              <a href= {link} target="_blank">
                <ShareIcon />
              </a>
            </div>

            <div className="text-gray-500">
              <ShareIcon />
            </div>
          </div>
        </div>

        <div className="pt-4">
          
            {type === "youtube" && <iframe className="w-full" height="315" src={link.replace("watch", "embed")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> }

            {type === "twitter" && <blockquote className="twitter-tweet"><a href={link}>December 25, 2025</a></blockquote> 
            }
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${tagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}



