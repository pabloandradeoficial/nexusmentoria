export type Database = {
  public: {
    Tables: {
      videos: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          category: string;
          category_id: string | null;
          video_url: string;
          thumbnail_url: string | null;
          attachment_url: string | null;
          duration_minutes: number | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          category: string;
          category_id?: string | null;
          video_url: string;
          thumbnail_url?: string | null;
          attachment_url?: string | null;
          duration_minutes?: number | null;
          sort_order?: number;
          is_published?: boolean;
        };
        Update: Partial<Database['public']['Tables']['videos']['Insert']>;
        Relationships: [];
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['categories']['Insert']>;
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          is_active: boolean;
          subscription_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          is_active?: boolean;
          subscription_active?: boolean;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
        Relationships: [];
      };
      video_progress: {
        Row: {
          id: string;
          user_id: string;
          video_id: string;
          watched_seconds: number;
          completed: boolean;
          last_watched_at: string;
        };
        Insert: Omit<Database['public']['Tables']['video_progress']['Row'], 'id' | 'last_watched_at'>;
        Update: Partial<Database['public']['Tables']['video_progress']['Insert']>;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
  };
};

export type Video = Database['public']['Tables']['videos']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type VideoProgress = Database['public']['Tables']['video_progress']['Row'];
