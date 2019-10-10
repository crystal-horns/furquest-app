import {User} from './User';

export interface Guild {
    id: number;
    name: string;
    flag?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    users?: User[];
}
