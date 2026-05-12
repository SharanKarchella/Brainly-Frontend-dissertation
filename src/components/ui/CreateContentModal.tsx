import { useRef, useState } from "react";
import { Button } from "./Button";
const BACKEND_URL = "http://localhost:3000";
const contentTypes = {
  Youtube: "youtube",
  Twitter: "twitter",
} as const;
type ContentType = (typeof contentTypes)[keyof typeof contentTypes];

//controlled component
export function CreateContentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const linkRef = useRef<HTMLInputElement | null>(null);
  const [type, setType] = useState<ContentType>(contentTypes.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    await fetch(`${BACKEND_URL}/api/v1/content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token") || ""
      },
      body: JSON.stringify({
        link,
        title,
        type
      })
    });
    onClose();
  }

  return (
    <div>
      {open && (
        //main parent div
        <div>
          {/* outer div for displaying opacity screen */}
          <div className="w-screen h-screen bg-slate-800 fixed top-0 left-0 opacity-60 flex justify-center"></div> 
          {/* this the div for displaying that window of add content */}
          <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
            <div className="flex flex-col justify-center">
              <span className="bg-slate-700 fixed opacity-100 p-4 rounded-md shadow-md outline-slate-700 border-2 border-slate-700">
                <div className="flex justify-end">
                  <div onClick={onClose} className="cursor-pointer bg-slate-400 rounded-full">
                    x
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-200  text-center underline">
                    Add Content
                  </h2>
                </div>
                <div>
                  <input ref={titleRef} placeholder={"Title"} className="p-2 m-2 border border-slate-400 rounded-md w-full text-slate-100 bg-slate-800" />
                  <input ref={linkRef} placeholder={"Link"} className="p-2 m-2 border border-slate-400 rounded-md w-full text-slate-100 bg-slate-800" />
                </div>
                <h1 className="text-lg font-bold text-slate-200 text-center">
                  Type Of Content
                </h1>
                <div className="flex p-4">
                  <Button
                    text="Youtube"
                    variant={
                      type === contentTypes.Youtube ? "primary" : "secondary"
                    }
                    onClick={() => {
                      setType(contentTypes.Youtube);
                    }}
                  />
                  <Button
                    text="Twitter"
                    variant={
                      type === contentTypes.Twitter ? "primary" : "secondary"
                    }
                    onClick={() => {
                      setType(contentTypes.Twitter);
                    }}
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    onClick={addContent}
                    variant="primary"
                    text="Submit"
                  />
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}