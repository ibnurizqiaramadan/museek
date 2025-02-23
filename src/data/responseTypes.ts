export type CustomError = {
  statusCode: number;
  errors: {
    message: string;
    dbError?: string | null;
    error?: Error | string | null;
  };
} | null;

export type QueueItemTypes = {
  id: {
    videoId: string;
  };
  url: string;
  title: string;
  description: string;
  duration_raw: string;
  snippet: {
    url: string;
    duration: string;
    publishedAt: string;
    thumbnails: {
      id: string;
      url: string;
      default: string;
      high: string;
      height: number;
      width: number;
    };
    title: string;
  };
  views: number;
};

export type QueueItemDbTypes = {
  id?: string;
  videoId: string;
  title: string;
  duration_raw: string;
  snippet: {
    url: string;
    duration: string;
    publishedAt: string;
    thumbnails: {
      id: string;
      url: string;
      default: string;
      high: string;
      height: number;
      width: number;
    };
    title: string;
  };
  views: number;
};

export type YoutubeSearchResponse = {
  status: number;
  data: {
    length: number;
    items: QueueItemTypes[];
  };
};

type UserTypes = {
  avatar: string | null;
  email: string;
  first_name: string;
  last_name: string;
  id: string;
};

export type UserResponse = {
  users: UserTypes[];
};

export type CreateUserResponse = {
  insert_users_one: UserTypes;
};

export type CreateQueueResponse = {
  insert_queue_one: {
    id: string;
    user_id: string;
  };
};

export type CreateQueueItemResponse = {
  insert_queue_items_one: QueueItemDbTypes;
};

export type GetQueueByUserResponse = {
  queue: [
    {
      id: string;
      public: boolean;
      queue_items_aggregate: {
        aggregate: {
          count: number;
        };
        nodes: QueueItemDbTypes[];
      };
    },
  ];
};

export type GetVideoByIdResponse = {
  queue_items: [
    {
      video_id: string;
    },
  ];
};

export type DeleteQueueItemResponse = {
  delete_queue_items_by_pk: {
    id: string;
  };
};
