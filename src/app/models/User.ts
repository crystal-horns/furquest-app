import {Guild} from './Guild';
import {UserContact} from './UserContact';

export interface User {
    id: number;
    user_type_id: number;
    social_name?: string;
    name?: string;
    species?: string;
    photo?: string;
    bio?: string;
    document?: string;
    document_type?: number;
    email: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    current?: boolean;

    guilds?: Guild[];
    user_contacts?: UserContact[];
}
