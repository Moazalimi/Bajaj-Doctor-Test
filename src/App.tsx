import React, { useEffect, useState } from 'react';
import { Doctor } from './types/Doctor';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import { useSearchParams } from 'react-router-dom';

const App: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
            if (!response.ok) throw new Error('Failed to fetch doctors');
            const data = await response.json();

            const validatedData = data.map((doctor: any) => ({
                ...doctor,
                specialties: doctor.specialities?.map((speciality: any) => speciality.name) || ['No specialties available'],
                experience: parseInt(doctor.experience?.replace(/\D+/g, '').trim()) || 0,
                fees: parseInt(doctor.fees?.replace('₹', '').trim()) || 0,
                education: doctor.education || doctor.doctor_introduction?.match(/BDS|MBBS|[^,]+College and Hospital[^,]*|[A-Za-z]+ University/g)?.join(', ') || 'MBBS: BDS',
                consultationMode: [
                    ...(doctor.video_consult ? ['Video Consult'] : []),
                    ...(doctor.in_clinic ? ['In Clinic'] : [])
                ] as ('Video Consult' | 'In Clinic')[]
            }));

            setDoctors(validatedData);
            setFilteredDoctors(validatedData);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            setError('Failed to load doctors. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        applyFilters();
    }, [searchParams, doctors]);

    const applyFilters = () => {
        if (doctors.length === 0) return;
        
        let filtered = [...doctors];

        const searchQuery = searchParams.get('search');
        const consultationType = searchParams.get('consultationType');
        const specialties = searchParams.getAll('specialty');
        const sortBy = searchParams.get('sortBy');

        if (searchQuery) {
            filtered = filtered.filter(doctor =>
                doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (consultationType) {
            filtered = filtered.filter(doctor =>
                doctor.consultationMode.includes(consultationType as 'Video Consult' | 'In Clinic')
            );
        }

        if (specialties.length > 0) {
            filtered = filtered.filter(doctor => {
                const doctorSpecialties = doctor.specialties || [];
                return specialties.some(specialty => doctorSpecialties.includes(specialty));
            });
        }

        if (sortBy) {
            filtered.sort((a, b) => {
                if (sortBy === 'fees') return a.fees - b.fees;
                if (sortBy === 'experience') return b.experience - a.experience;
                return 0;
            });
        }

        setFilteredDoctors(filtered);
    };

    const handleSearch = (query: string) => {
        searchParams.set('search', query);
        setSearchParams(searchParams);
    };

    const handleSpecialtyChange = (specialty: string) => {
        const specialties = searchParams.getAll('specialty');
        if (specialties.includes(specialty)) {
            searchParams.delete('specialty');
            specialties.filter(s => s !== specialty).forEach(s => searchParams.append('specialty', s));
        } else {
            searchParams.append('specialty', specialty);
        }
        setSearchParams(searchParams);
    };

    const handleConsultationTypeChange = (type: string) => {
        searchParams.set('consultationType', type);
        setSearchParams(searchParams);
    };

    const handleSortChange = (sort: string) => {
        searchParams.set('sortBy', sort);
        setSearchParams(searchParams);
    };

    return (
        <div className="app">
            <SearchBar doctors={doctors} onSearch={handleSearch} />
            
            <div className="main-content">
                <FilterPanel
                    selectedSpecialties={searchParams.getAll('specialty')}
                    consultationType={searchParams.get('consultationType') || ''}
                    sortBy={searchParams.get('sortBy') || ''}
                    onSpecialtyChange={handleSpecialtyChange}
                    onConsultationTypeChange={handleConsultationTypeChange}
                    onSortChange={handleSortChange}
                />
                
                <div className="content-area">
                    {error && <div className="error-message">{error}</div>}
                    {loading && <div className="loading">Loading doctors...</div>}
                    {!loading && !error && <DoctorList doctors={filteredDoctors} />}
                </div>
            </div>
        </div>
    );
};

export default App;
