export type CreateEvent = {
  cooldown: number;
  lvl_max: number;
  lvl_min: number;
  max_chars: number;
  min_chars: number;
  name: string;
  user_id: string;
};

export type EditEvent = {
  cooldown: number;
  lvl_max: number;
  lvl_min: number;
  max_chars: number;
  min_chars: number;
  name: string;
  id: string;
};
