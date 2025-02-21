import { appStore } from "@/stores/AppStores";
import { deleteFromQueue } from "@/data/model/queue.model";

export default function ContextMenu() {
  const { app, setQueue, setContextMenu } = appStore((state) => state);

  // Get window dimensions
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Calculate adjusted positions
  const adjustedX = Math.min(app.contextMenu.x, windowWidth - 200); // Assuming 200 is the width of the menu
  const adjustedY = Math.min(app.contextMenu.y, windowHeight - 100); // Assuming 100 is the height of the menu

  return (
    <>
      <div
        className={`absolute z-20 bg-zinc-950 rounded-lg py-1 shadow-lg ${
          app.contextMenu.visible ? "block" : "hidden"
        }`}
        style={{
          left: adjustedX,
          top: adjustedY,
        }}
      >
        <div className="flex flex-col gap-y-1 cursor-pointer p-1">
          <div
            className="flex flex-row hover:bg-zinc-800 rounded-lg px-2 py-1"
            onClick={async () => {
              await deleteFromQueue(app.contextMenu?.id as string);
              setQueue(
                app.queue?.filter((item) => item.id !== app.contextMenu.id) ||
                  null,
              );
              setContextMenu({
                id: null,
                visible: false,
                x: 0,
                y: 0,
              });
            }}
          >
            <p>Delete</p>
          </div>
          <div className="flex flex-row hover:bg-zinc-800 rounded-lg px-2 py-1">
            <p>Download</p>
          </div>
          <div className="flex flex-row hover:bg-zinc-800 rounded-lg px-2 py-1">
            <p>Open on YouTube</p>
          </div>
        </div>
      </div>
    </>
  );
}
