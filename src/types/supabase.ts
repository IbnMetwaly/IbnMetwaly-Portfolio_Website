export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "14.1"
    }
    public: {
        Tables: {
            awards: {
                Row: {
                    certificate_path: string | null
                    created_at: string | null
                    description: string | null
                    display_order: number | null
                    id: string
                    language: string
                    organization: string
                    title: string
                    year: string
                }
                Insert: {
                    certificate_path?: string | null
                    created_at?: string | null
                    description?: string | null
                    display_order?: number | null
                    id?: string
                    language?: string
                    organization: string
                    title: string
                    year: string
                }
                Update: {
                    certificate_path?: string | null
                    created_at?: string | null
                    description?: string | null
                    display_order?: number | null
                    id?: string
                    language?: string
                    organization?: string | null
                    title?: string
                    year?: string
                }
                Relationships: []
            }
            certifications: {
                Row: {
                    certificate_path: string | null
                    created_at: string | null
                    display_order: number | null
                    id: string
                    language: string
                    organization: string | null
                    title: string
                    type: string
                    year: string
                }
                Insert: {
                    certificate_path?: string | null
                    created_at?: string | null
                    display_order?: number | null
                    id?: string
                    language?: string
                    organization?: string | null
                    title: string
                    type: string
                    year: string
                }
                Update: {
                    certificate_path?: string | null
                    created_at?: string | null
                    display_order?: number | null
                    id?: string
                    language?: string
                    organization?: string | null
                    title?: string
                    type?: string
                    year?: string
                }
                Relationships: []
            }
            contact_submissions: {
                Row: {
                    created_at: string | null
                    email: string
                    id: string
                    message: string
                    name: string
                    status: string
                    subject: string
                }
                Insert: {
                    created_at?: string | null
                    email: string
                    id?: string
                    message: string
                    name: string
                    status?: string
                    subject: string
                }
                Update: {
                    created_at?: string | null
                    email?: string
                    id?: string
                    message?: string
                    name?: string
                    status?: string
                    subject?: string
                }
                Relationships: []
            }
            experience: {
                Row: {
                    achievements: Json | null
                    created_at: string | null
                    description: string | null
                    display_order: number | null
                    id: string
                    language: string
                    location: string
                    organization: string
                    period: string
                    title: string
                }
                Insert: {
                    achievements?: Json | null
                    created_at?: string | null
                    description?: string | null
                    display_order?: number | null
                    id?: string
                    language?: string
                    location: string
                    organization: string
                    period: string
                    title: string
                }
                Update: {
                    achievements?: Json | null
                    created_at?: string | null
                    description?: string | null
                    display_order?: number | null
                    id?: string
                    language?: string
                    location?: string
                    organization?: string
                    period?: string
                    title?: string
                }
                Relationships: []
            }
            site_content: {
                Row: {
                    created_at: string | null
                    id: string
                    key: string
                    section: string
                    value_ar: string | null
                    value_en: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    key: string
                    section: string
                    value_ar?: string | null
                    value_en?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    key?: string
                    section?: string
                    value_ar?: string | null
                    value_en?: string | null
                }
                Relationships: []
            }
            site_stats: {
                Row: {
                    created_at: string | null
                    display_order: number | null
                    id: string
                    key: string
                    label_ar: string | null
                    label_en: string | null
                    subtitle_ar: string | null
                    subtitle_en: string | null
                    suffix: string | null
                    value: number | null
                }
                Insert: {
                    created_at?: string | null
                    display_order?: number | null
                    id?: string
                    key: string
                    label_ar?: string | null
                    label_en?: string | null
                    subtitle_ar?: string | null
                    subtitle_en?: string | null
                    suffix?: string | null
                    value?: number | null
                }
                Update: {
                    created_at?: string | null
                    display_order?: number | null
                    id?: string
                    key?: string
                    label_ar?: string | null
                    label_en?: string | null
                    subtitle_ar?: string | null
                    subtitle_en?: string | null
                    suffix?: string | null
                    value?: number | null
                }
                Relationships: []
            }
            skills: {
                Row: {
                    category: string
                    created_at: string | null
                    display_order: number | null
                    id: string
                    language: string
                    name: string
                    proficiency: string | null
                }
                Insert: {
                    category: string
                    created_at?: string | null
                    display_order?: number | null
                    id?: string
                    language?: string
                    name: string
                    proficiency?: string | null
                }
                Update: {
                    category?: string
                    created_at?: string | null
                    display_order?: number | null
                    id?: string
                    language?: string
                    name?: string
                    proficiency?: string | null
                }
                Relationships: []
            }
            Table: {
                Row: {
                    created_at: string
                    id: number
                }
                Insert: {
                    created_at?: string
                    id?: number
                }
                Update: {
                    created_at?: string
                    id?: number
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
    DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
    public: {
        Enums: {},
    },
} as const
