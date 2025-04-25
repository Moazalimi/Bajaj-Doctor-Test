import React from 'react';

interface FilterPanelProps {
    selectedSpecialties: string[];
    consultationType: string;
    sortBy: string;
    onSpecialtyChange: (specialty: string) => void;
    onConsultationTypeChange: (type: string) => void;
    onSortChange: (sort: string) => void;
}

const SPECIALTIES = [
    'General Physician', 'Dentist', 'Dermatologist', 'Paediatrician',
    'Gynaecologist', 'ENT', 'Diabetologist', 'Cardiologist',
    'Physiotherapist', 'Endocrinologist', 'Orthopaedic', 'Ophthalmologist',
    'Gastroenterologist', 'Pulmonologist', 'Psychiatrist', 'Urologist',
    'Dietitian-Nutritionist', 'Psychologist', 'Sexologist', 'Nephrologist',
    'Neurologist', 'Oncologist', 'Ayurveda', 'Homeopath'
];

const FilterPanel: React.FC<FilterPanelProps> = ({
    selectedSpecialties,
    consultationType,
    sortBy,
    onSpecialtyChange,
    onConsultationTypeChange,
    onSortChange
}) => {
    return (
        <div className="filter-panel">
            <h2>Filters</h2>
            
            <div className="filter-group">
                <h3>Consultation Mode</h3>
                <ul>
                    <li>
                        <label>
                            <input
                                type="radio"
                                data-testid="filter-video-consult"
                                checked={consultationType === 'Video Consult'}
                                onChange={() => onConsultationTypeChange('Video Consult')}
                            />
                            Video Consult
                        </label>
                    </li>
                    <li>
                        <label>
                            <input
                                type="radio"
                                data-testid="filter-in-clinic"
                                checked={consultationType === 'In Clinic'}
                                onChange={() => onConsultationTypeChange('In Clinic')}
                            />
                            In Clinic
                        </label>
                    </li>
                </ul>
            </div>

            <div className="filter-group">
                <h3>Specialities</h3>
                <ul className="specialty-list">
                    {SPECIALTIES.map(specialty => (
                        <li key={specialty}>
                            <label>
                                <input
                                    type="checkbox"
                                    data-testid={`filter-specialty-${specialty}`}
                                    checked={selectedSpecialties.includes(specialty)}
                                    onChange={() => onSpecialtyChange(specialty)}
                                />
                                {specialty}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="filter-group">
                <h3>Sort By</h3>
                <ul>
                    <li>
                        <label>
                            <input
                                type="radio"
                                data-testid="sort-fees"
                                checked={sortBy === 'fees'}
                                onChange={() => onSortChange('fees')}
                            />
                            Fees (Low to High)
                        </label>
                    </li>
                    <li>
                        <label>
                            <input
                                type="radio"
                                data-testid="sort-experience"
                                checked={sortBy === 'experience'}
                                onChange={() => onSortChange('experience')}
                            />
                            Experience
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default FilterPanel;
