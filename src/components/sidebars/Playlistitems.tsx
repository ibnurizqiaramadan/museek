import { SpotifyPlaylist } from "@/data/responseTypes";
import { Image } from "@heroui/react";

export default function PlaylistItems({ item }: { item: SpotifyPlaylist }) {
  return (
    <div className="flex flex-row items-center gap-2 rounded-lg hover:bg-zinc-800 transition-all duration-300 cursor-pointer">
      <Image
        className="rounded-lg w-[80px] h-[80px] p-2"
        src={item.images[0].url}
        alt={item.name}
        width={80}
        height={80}
      />
      <div className="flex flex-col">
        <h4 className="text-large font-bold">{item.name}</h4>
        <p className="text-small">{item.owner.display_name}</p>
      </div>
    </div>
  );
}
