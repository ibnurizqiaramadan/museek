export type CustomError = {
  statusCode: number;
  errors: {
    message: string;
    dbError?: string | null;
    error?: Error | string | null;
  };
} | null;

type SpotifyUrl = {
  spotify: string;
};

type Artist = {
  external_urls: SpotifyUrl;
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
};

type AlbumImage = {
  height: number;
  url: string;
  width: number;
};

type Album = {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: SpotifyUrl;
  href: string;
  id: string;
  images: AlbumImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: "album";
  uri: string;
};

type Track = {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: SpotifyUrl;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: "track";
  uri: string;
};

export type QueueResponse = {
  currently_playing: Track;
  queue: Track[];
};
