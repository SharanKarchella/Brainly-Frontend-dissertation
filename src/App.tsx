import "./App.css";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { CreateContentModal } from "./components/ui/CreateContentModal";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { useState } from "react";

const DEBUG_ENDPOINT = "http://127.0.0.1:7902/ingest/d0491d3c-709a-4f9d-9976-c0d986e766ef";
function debugLog(payload: Record<string, unknown>) {
  const body = JSON.stringify(payload);
  fetch(DEBUG_ENDPOINT, { mode: "no-cors", method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "7a7182" }, body }).catch(() => {});
  navigator.sendBeacon(DEBUG_ENDPOINT, new Blob([body], { type: "application/json" }));
}


function App() {
  const [open, setOpen] = useState(false);
  // #region agent log
  debugLog({sessionId:'7a7182',runId:'pre-fix',hypothesisId:'H6',location:'src/App.tsx:18',message:'App render modal state',data:{open},timestamp:Date.now()});
  // #endregion
  return <div className="p-2">
      <CreateContentModal open={open} onClose={() => {
        // #region agent log
        fetch('http://127.0.0.1:7902/ingest/d0491d3c-709a-4f9d-9976-c0d986e766ef',{mode:'no-cors',method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'7a7182'},body:JSON.stringify({sessionId:'7a7182',runId:'pre-fix',hypothesisId:'H2',location:'src/App.tsx:16',message:'Modal close requested',data:{openBefore:open},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        setOpen(false);
      }} />
      <div className="flex justify-end gap-4">
        <Button variant="primary" text="Add Content" startIcon={<PlusIcon />} onClick={() => {
          // #region agent log
          debugLog({sessionId:'7a7182',runId:'pre-fix',hypothesisId:'H1',location:'src/App.tsx:28',message:'Open modal requested',data:{openBefore:open},timestamp:Date.now()});
          // #endregion
          setOpen(true);
        }} />
        <Button variant="secondary" text="Share" startIcon={<ShareIcon />} />
        </div>

      <div className="flex gap-4">
        <Card title="Twitter" link={"https://twitter.com/ajeetunc/status/2004188656274493630?ref_src=twsrc%5Etfw"} type={'twitter'} />
        <Card title="Youtube" link={"https://www.youtube.com/watch?v=d3Vnu_tsYPA&list=RDd3Vnu_tsYPA&start_radio=1"} type={'youtube'} />
        <Card title="Twitter" link={"https://twitter.com/ajeetunc/status/2004188656274493630?ref_src=twsrc%5Etfw"} type={'twitter'} />
      </div>

    </div>
}

export default App;
