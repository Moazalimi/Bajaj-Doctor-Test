// filepath: c:\Users\Moaz Alimi\Documents\6th Sem\samp\src\types\Doctor.ts
export interface Doctor {
    id?: string;
    name: string;
    name_initials?: string;
    photo?: string;
    doctor_introduction?: string;
    specialties?: string[];
    specialities?: { name: string }[];
    experience: number;
    fees: number;
    languages?: string[];
    consultationMode: ('Video Consult' | 'In Clinic')[];
    education?: string;
    clinic?: {
        name: string;
        address?: {
            locality?: string;
            city?: string;
            address_line1?: string;
            location?: string;
            logo_url?: string;
        }
    };
    video_consult?: boolean;
    in_clinic?: boolean;
}
