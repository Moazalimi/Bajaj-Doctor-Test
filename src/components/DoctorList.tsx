import React from 'react';
import { Doctor } from '../types/Doctor';

interface DoctorListProps {
    doctors: Doctor[];
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors }) => {
    const getYearsText = (years: number) => {
        return years > 0 ? `${years}` : '';
    };

    return (
        <div className="doctor-list">
            <h2 className="doctors-found">{doctors.length} Doctors found</h2>
            {doctors.map((doctor, index) => (
                <div key={index} className="doctor-card">
                    <div className="doctor-card-header">
                        <div className="doctor-photo-container">
                            <img
                                src={doctor.photo || 'https://via.placeholder.com/80'}
                                alt={`${doctor.name}'s profile`}
                                className="doctor-photo"
                            />
                        </div>
                        <div className="doctor-info">
                            <h2 className="doctor-name">{doctor.name}</h2>
                            <p className="doctor-specialty">
                                {doctor.specialties?.[0] || 'No specialty available'}
                            </p>
                            <p className="doctor-education">{doctor.education}</p>
                            <p className="doctor-experience">{getYearsText(doctor.experience)}</p>
                            
                            <div className="doctor-clinic-info">
                                <p className="doctor-clinic">
                                    <span className="clinic-icon">🏥</span> {doctor.clinic?.name || 'No clinic info'}
                                </p>
                                <p className="doctor-location">
                                    <span className="location-icon">📍</span> {doctor.clinic?.address?.locality}, {doctor.clinic?.address?.city || 'No location info'}
                                </p>
                            </div>
                        </div>
                        <div className="doctor-actions">
                            <p className="doctor-fee">₹ {doctor.fees}</p>
                            
                            {doctor.video_consult && (
                                <div className="consultation-type">
                                    <span className="consultation-label">
                                        <span className="video-icon">📹</span> Video Consultation
                                    </span>
                                    <button className="book-appointment-button blue">Book Appointment</button>
                                </div>
                            )}
                            
                            {doctor.in_clinic && (
                                <div className="consultation-type">
                                    <span className="consultation-label">
                                        <span className="clinic-visit-icon">🏥</span> In-Clinic Consultation
                                    </span>
                                    <button className="book-appointment-button green">Book Appointment</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DoctorList;
