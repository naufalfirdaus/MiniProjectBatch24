import { Users } from "./Users";
import { UsersSkill } from "./UsersSkill";
export declare class UsersExperiences {
    usexId: number;
    usexEntityId: number;
    usexTitle: string | null;
    usexProfileHeadline: string | null;
    usexEmploymentType: string | null;
    usexCompanyName: string | null;
    usexIsCurrent: string | null;
    usexStartDate: Date | null;
    usexEndDate: Date | null;
    usexIndustry: string | null;
    usexDescription: string | null;
    usexExperienceType: string | null;
    usexCityId: number | null;
    usexEntity: Users;
    usersSkills: UsersSkill[];
}
