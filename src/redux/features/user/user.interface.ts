export interface IUserApp {
   username: string;
   role: ERoleUser | null;
}

export enum ERoleUser {
   Student = 1,
   Moderator = 2
}
