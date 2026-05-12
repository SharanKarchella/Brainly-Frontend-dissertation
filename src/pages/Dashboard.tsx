import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CreateContentModal } from "../components/ui/CreateContentModal";
import { SmartSearch } from "../components/ui/SmartSearch";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/ui/Sidebar";
import { useContentTags } from "../hooks/useContentTags";

const BACKEND_URL = "http://localhost:3000";

interface Content {
  type: string;
  title: string;
  link: string;
}

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [contents, setContents] = useState<Content[]>([]);
  const [searchResults, setSearchResults] = useState<Content[] | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { tagMap, allTags } = useContentTags(contents);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: { Authorization: token },
      })
      .then((res) => setContents(res.data.content ?? []))
      .catch(console.error);
  }, [modalOpen]);

  // Smart search results take priority; otherwise apply sidebar type + tag filters
  const displayedContents =
    searchResults !== null
      ? searchResults
      : contents.filter((c) => {
          const typeMatch = !selectedType || c.type?.toLowerCase() === selectedType.toLowerCase();
          const tagMatch = !selectedTag || (tagMap[c.link] ?? []).includes(selectedTag);
          return typeMatch && tagMatch;
        });

  const handleShareBrain = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to share your brain.");
      return;
    }
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        { headers: { Authorization: token } }
      );
      const shareUrl = `${window.location.origin}/brain/${response.data.hash}`;
      await navigator.clipboard.writeText(shareUrl);
      alert("URL copied to clipboard!");
    } catch (error) {
      console.error("Failed to share brain", error);
      alert("Something went wrong while sharing. Please try again.");
    }
  };

  return (
    <div>
      <Sidebar
        selectedType={selectedType}
        onTypeSelect={setSelectedType}
        allTags={allTags}
        selectedTag={selectedTag}
        onTagSelect={setSelectedTag}
      />
      <div className="p-4 ml-72 min-h-screen bg-gray-300">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
        <div className="flex justify-end gap-4 mb-4">
          <Button
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
            onClick={handleShareBrain}
          />
          <Button
            onClick={() => setModalOpen(true)}
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
          />
        </div>

        <SmartSearch
          contents={contents}
          onResults={(results) => {
            setSearchResults(results);
            if (results !== null) setSelectedType(null);
          }}
        />

        <div className="flex gap-4 mt-2 flex-wrap">
          {displayedContents.length > 0 ? (
            displayedContents.map((content, index) => (
              <Card
                key={content.link || index}
                type={content.type as "twitter" | "youtube"}
                link={content.link}
                title={content.title}
                tags={tagMap[content.link]}
              />
            ))
          ) : (
            <div className="text-gray-500 w-full mt-10 text-center text-lg">
              {searchResults !== null ? "No results match your search." : "No content found."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;


