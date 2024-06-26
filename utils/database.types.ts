export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _system_match_results: {
        Row: {
          description: string | null
          result: string
        }
        Insert: {
          description?: string | null
          result?: string
        }
        Update: {
          description?: string | null
          result?: string
        }
        Relationships: []
      }
      leagues: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          img: string | null
          name: string
          owner: string | null
          urlname: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          img?: string | null
          name: string
          owner?: string | null
          urlname?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          img?: string | null
          name?: string
          owner?: string | null
          urlname?: string
        }
        Relationships: [
          {
            foreignKeyName: "leagues_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          date: string
          id: number
          league: number
          local_goals: number | null
          local_scorers: number[] | null
          local_team: number
          match_day: number
          played: boolean
          result: string | null
          visitor_goals: number | null
          visitor_scorers: number[] | null
          visitor_team: number
        }
        Insert: {
          date?: string
          id?: number
          league: number
          local_goals?: number | null
          local_scorers?: number[] | null
          local_team: number
          match_day?: number
          played?: boolean
          result?: string | null
          visitor_goals?: number | null
          visitor_scorers?: number[] | null
          visitor_team: number
        }
        Update: {
          date?: string
          id?: number
          league?: number
          local_goals?: number | null
          local_scorers?: number[] | null
          local_team?: number
          match_day?: number
          played?: boolean
          result?: string | null
          visitor_goals?: number | null
          visitor_scorers?: number[] | null
          visitor_team?: number
        }
        Relationships: [
          {
            foreignKeyName: "matches_local_team_fkey"
            columns: ["local_team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_visitor_team_fkey"
            columns: ["visitor_team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      phases: {
        Row: {
          id: number
          name: string | null
          teams: number[]
          tipo: number | null
        }
        Insert: {
          id?: number
          name?: string | null
          teams: number[]
          tipo?: number | null
        }
        Update: {
          id?: number
          name?: string | null
          teams?: number[]
          tipo?: number | null
        }
        Relationships: []
      }
      players: {
        Row: {
          created_at: string | null
          id: number
          league: number
          name: string
          scored_goals: number
          scored_goals_away: number
          scored_goals_home: number
          team: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          league?: number
          name: string
          scored_goals?: number
          scored_goals_away?: number
          scored_goals_home?: number
          team?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          league?: number
          name?: string
          scored_goals?: number
          scored_goals_away?: number
          scored_goals_home?: number
          team?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "players_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          defeats: number
          draws: number
          goals_conceded: number
          goals_conceded_away: number
          goals_conceded_home: number
          goals_scored: number
          goals_scored_away: number
          goals_scored_home: number
          id: number
          img: string | null
          league: number
          name: string
          played_matches: number
          points: number
          urlname: string
          wins: number
        }
        Insert: {
          defeats?: number
          draws?: number
          goals_conceded?: number
          goals_conceded_away?: number
          goals_conceded_home?: number
          goals_scored?: number
          goals_scored_away?: number
          goals_scored_home?: number
          id?: number
          img?: string | null
          league: number
          name: string
          played_matches?: number
          points?: number
          urlname: string
          wins?: number
        }
        Update: {
          defeats?: number
          draws?: number
          goals_conceded?: number
          goals_conceded_away?: number
          goals_conceded_home?: number
          goals_scored?: number
          goals_scored_away?: number
          goals_scored_home?: number
          id?: number
          img?: string | null
          league?: number
          name?: string
          played_matches?: number
          points?: number
          urlname?: string
          wins?: number
        }
        Relationships: [
          {
            foreignKeyName: "teams_league_fkey"
            columns: ["league"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_match_result: {
        Args: {
          local_goals: number
          visitor_goals: number
        }
        Returns: string
      }
    }
    Enums: {
      phase_types: "single round-robin" | "double round-robin"
      score: "win3-tie1-losse0" | "win1-tie0.5-losse0" | "win1-not-tie-losse0"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
